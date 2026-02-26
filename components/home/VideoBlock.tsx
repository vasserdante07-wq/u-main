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
      border-radius: inherit;
    }
  }
`;

const VideoBlock = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const animRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const RADIUS = 120;
    const STRENGTH = 0.45;

    function resize() {
      if (!canvas || !wrapper) return;
      canvas.width = wrapper.offsetWidth;
      canvas.height = wrapper.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e: MouseEvent) {
      const rect = wrapper!.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    }

    function onMouseLeave() {
      mouseRef.current.active = false;
    }

    wrapper.addEventListener("mousemove", onMouseMove);
    wrapper.addEventListener("mouseleave", onMouseLeave);

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x, y, active } = mouseRef.current;
      if (!active) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      // Draw a subtle spherical magnification lens overlay
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, RADIUS);
      gradient.addColorStop(0, "rgba(255,255,255,0.06)");
      gradient.addColorStop(0.6, "rgba(255,255,255,0.02)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Lens edge highlight
      const edgeGradient = ctx.createRadialGradient(x, y, RADIUS * 0.85, x, y, RADIUS);
      edgeGradient.addColorStop(0, "rgba(255,255,255,0)");
      edgeGradient.addColorStop(1, "rgba(255,255,255,0.12)");
      ctx.beginPath();
      ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = edgeGradient;
      ctx.fill();

      // Top-left glare spot
      const glare = ctx.createRadialGradient(
        x - RADIUS * 0.3,
        y - RADIUS * 0.3,
        0,
        x - RADIUS * 0.3,
        y - RADIUS * 0.3,
        RADIUS * 0.4
      );
      glare.addColorStop(0, "rgba(255,255,255,0.18)");
      glare.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = glare;
      ctx.fillRect(x - RADIUS, y - RADIUS, RADIUS * 2, RADIUS * 2);

      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      wrapper.removeEventListener("mousemove", onMouseMove);
      wrapper.removeEventListener("mouseleave", onMouseLeave);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <VideoBlockStyles>
      <div className="player-wrapper wrapper" ref={wrapperRef}>
        <MuxPlayer
          playbackId="00znJldwdUxoxVkJhL9aDqaEIP9TH6ya53aOot400QvRU"
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
