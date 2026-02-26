import dynamic from "next/dynamic";
import styled from "styled-components";
import { media } from "components/helpers";
import { useRef, useEffect } from "react";

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
});

const VideoBlockStyles = styled.div`
  position: relative;
  padding: 24px 0 40px;
  ${media.medium`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 120px);
    padding: 40px 0;
  `}

  .player-wrapper {
    width: 100%;
    position: relative;
    ${media.medium`width: auto; max-width: 55%;`}

    mux-player {
      width: 100%;
      aspect-ratio: 16 / 9;
      display: block;
      --media-object-fit: cover;
    }
  }
`;

const RADIUS = 130;
const MAP_W = 256;
const MAP_H = 144;
const FILTER_ID = "vb-bulge-filter";
const FE_IMAGE_ID = "vb-bulge-fe-image";

const VideoBlock = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const mapCanvas = document.createElement("canvas");
    mapCanvas.width = MAP_W;
    mapCanvas.height = MAP_H;
    const mapCtx = mapCanvas.getContext("2d")!;

    const feImage = document.getElementById(FE_IMAGE_ID) as SVGFEImageElement | null;
    let player: HTMLElement | null = null;
    let cursor = { x: 0, y: 0, active: false };
    let rafId = 0;

    function buildMap(cx: number, cy: number, W: number, H: number) {
      const scaleX = MAP_W / W;
      const scaleY = MAP_H / H;
      const mcx = cx * scaleX;
      const mcy = cy * scaleY;
      const mr = RADIUS * scaleX;

      const imageData = mapCtx.createImageData(MAP_W, MAP_H);
      const data = imageData.data;

      for (let py = 0; py < MAP_H; py++) {
        for (let px = 0; px < MAP_W; px++) {
          const dx = px - mcx;
          const dy = py - mcy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let r = 128;
          let g = 128;

          if (dist < mr && dist > 0.001) {
            const t = dist / mr;
            const sampleDist = t * t * mr;
            const inv = 1 / dist;
            const sampleX = mcx + dx * inv * sampleDist;
            const sampleY = mcy + dy * inv * sampleDist;
            const dispX = (sampleX - px) / scaleX;
            const dispY = (sampleY - py) / scaleY;
            const edge = t < 0.82 ? 1 : Math.max(0, (1 - t) / 0.18);
            r = Math.max(0, Math.min(255, Math.round(((dispX * edge) / RADIUS + 0.5) * 255)));
            g = Math.max(0, Math.min(255, Math.round(((dispY * edge) / RADIUS + 0.5) * 255)));
          }

          const i = (py * MAP_W + px) * 4;
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = 0;
          data[i + 3] = 255;
        }
      }

      mapCtx.putImageData(imageData, 0, 0);
    }

    function update() {
      rafId = 0;
      if (!player) player = wrapper!.querySelector("mux-player") as HTMLElement;
      if (!player) return;

      if (!cursor.active) {
        player.style.filter = "";
        return;
      }

      const rect = player.getBoundingClientRect();
      const wRect = wrapper!.getBoundingClientRect();
      const pcx = cursor.x - (rect.left - wRect.left);
      const pcy = cursor.y - (rect.top - wRect.top);

      buildMap(pcx, pcy, rect.width, rect.height);

      if (feImage) {
        const dataURL = mapCanvas.toDataURL();
        feImage.setAttribute("href", dataURL);
        feImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", dataURL);
      }

      player.style.filter = `url(#${FILTER_ID})`;
    }

    function onMouseMove(e: MouseEvent) {
      const rect = wrapper!.getBoundingClientRect();
      cursor = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
      if (!rafId) rafId = requestAnimationFrame(update);
    }

    function onMouseLeave() {
      cursor.active = false;
      if (!rafId) rafId = requestAnimationFrame(update);
    }

    wrapper.addEventListener("mousemove", onMouseMove);
    wrapper.addEventListener("mouseleave", onMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", onMouseMove);
      wrapper.removeEventListener("mouseleave", onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <VideoBlockStyles>
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", overflow: "hidden" }}
      >
        <defs>
          <filter
            id={FILTER_ID}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              id={FE_IMAGE_ID}
              result="warp-map"
              preserveAspectRatio="none"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="warp-map"
              scale={RADIUS}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="player-wrapper wrapper" ref={wrapperRef}>
        <MuxPlayer
          playbackId="00znJldwdUxoxVkJhL9aDqaEIP9TH6ya53aOot400QvRU"
          muted
          autoPlay
          loop
          playsInline
          controls={false}
        />
      </div>
    </VideoBlockStyles>
  );
};

export default VideoBlock;
