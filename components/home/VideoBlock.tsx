import dynamic from "next/dynamic";
import styled from "styled-components";
import { media } from "components/helpers";
import { useRef, useEffect } from "react";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
});

const VideoBlockStyles = styled.div`
  position: relative;
  padding: 40px 0;

  .player-wrapper {
    flex: 1;
    width: 100%;
    position: relative;
    ${media.medium`width: auto; max-width: 55%;`}

    mux-player {
      width: 100%;
      aspect-ratio: 16 / 9;
      display: block;
      --media-object-fit: cover;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  }
`;

const RADIUS = 130;

const VS = `
  attribute vec2 aPos;
  void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FS = `
  precision mediump float;
  uniform sampler2D uTex;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  uniform float uRadius;

  void main() {
    vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
    vec2 delta = frag - uMouse;
    float dist = length(delta);

    if (dist >= uRadius) { discard; }

    float t = dist / uRadius;
    float tWarped = t * t;

    vec2 sample = dist < 0.001
      ? uMouse
      : uMouse + normalize(delta) * tWarped * uRadius;

    vec2 uv = vec2(sample.x / uRes.x, 1.0 - sample.y / uRes.y);
    vec4 col = texture2D(uTex, uv);

    float edge = smoothstep(1.0, 0.82, t);
    gl_FragColor = vec4(col.rgb, edge);
  }
`;

const VideoBlock = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    mouse: { x: 0, y: 0, active: false },
    gl: null as WebGLRenderingContext | null,
    program: null as WebGLProgram | null,
    texture: null as WebGLTexture | null,
    video: null as HTMLVideoElement | null,
    uniforms: {} as Record<string, WebGLUniformLocation | null>,
    raf: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const s = stateRef.current;

    function resize() {
      if (!canvas || !wrapper) return;
      canvas.width = wrapper.offsetWidth;
      canvas.height = wrapper.offsetHeight;
      s.gl?.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener("resize", resize);

    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, alpha: true });
    if (!gl) return;
    s.gl = gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    function makeShader(type: number, src: string) {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      return sh;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, makeShader(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, makeShader(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    s.program = prog;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    s.texture = tex;

    s.uniforms = {
      uTex: gl.getUniformLocation(prog, "uTex"),
      uMouse: gl.getUniformLocation(prog, "uMouse"),
      uRes: gl.getUniformLocation(prog, "uRes"),
      uRadius: gl.getUniformLocation(prog, "uRadius"),
    };

    function onMouseMove(e: MouseEvent) {
      const rect = wrapper!.getBoundingClientRect();
      const sx = canvas!.width / rect.width;
      const sy = canvas!.height / rect.height;
      s.mouse = {
        x: (e.clientX - rect.left) * sx,
        y: (e.clientY - rect.top) * sy,
        active: true,
      };
    }
    function onMouseLeave() {
      s.mouse.active = false;
    }
    wrapper.addEventListener("mousemove", onMouseMove);
    wrapper.addEventListener("mouseleave", onMouseLeave);

    function findVideo(): HTMLVideoElement | null {
      const mp = wrapper!.querySelector("mux-player");
      if (!mp) return null;
      return (
        mp.querySelector("video") ??
        (mp as any).shadowRoot?.querySelector("video") ??
        null
      );
    }

    function draw() {
      s.raf = requestAnimationFrame(draw);
      if (!s.gl || !s.program || !s.texture || !canvas) return;
      s.gl.clear(s.gl.COLOR_BUFFER_BIT);
      if (!s.mouse.active) return;
      if (!s.video) s.video = findVideo();
      const vid = s.video;
      if (!vid || vid.readyState < 2) return;
      s.gl.bindTexture(s.gl.TEXTURE_2D, s.texture);
      try {
        s.gl.texImage2D(s.gl.TEXTURE_2D, 0, s.gl.RGBA, s.gl.RGBA, s.gl.UNSIGNED_BYTE, vid);
      } catch {
        return;
      }
      s.gl.uniform1i(s.uniforms.uTex, 0);
      s.gl.uniform2f(s.uniforms.uMouse, s.mouse.x, s.mouse.y);
      s.gl.uniform2f(s.uniforms.uRes, canvas.width, canvas.height);
      s.gl.uniform1f(s.uniforms.uRadius, RADIUS);
      s.gl.drawArrays(s.gl.TRIANGLE_STRIP, 0, 4);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      wrapper.removeEventListener("mousemove", onMouseMove);
      wrapper.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(s.raf);
    };
  }, []);

  return (
    <VideoBlockStyles>
      <div className="player-wrapper wrapper" ref={wrapperRef}>
        <MuxPlayer
          playbackId="00znJldwdUxoxVkJhL9aDqaEIP9TH6ya53aOot400QvRU"
          crossOrigin="anonymous"
          muted
          autoPlay
          loop
          playsInline
          controls={false}
        />
        <canvas ref={canvasRef} />
      </div>
    </VideoBlockStyles>
  );
};

export default VideoBlock;
