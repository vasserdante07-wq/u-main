import Layout from "components/Layout";
import { NextSeo } from "next-seo";
import styled from "styled-components";
import { media } from "components/helpers";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const VISIBLE = 1;

const videos = [
  { videoId: "PgpWtLYQZ6Y" },
  { videoId: "LBh-zKqHmqU", thumbnailSize: "maxresdefault" },
  { videoId: "wyIvsgJmgs0" },
  { videoId: "SzmWli_S7RE" },
  { videoId: "aRjBfYtZuCs" },
  { videoId: "kV47e9ZnIcQ" },
];

const VideoPageStyles = styled.div`
  width: 100%;
  padding: 24px 0 40px;
  ${media.medium`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 120px);
    padding: 40px 0;
  `}

  .carousel-wrapper {
    position: relative;
    width: 90%;
    max-width: 1100px;
    margin: 0 auto;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .video-item {
    border-radius: 20px;
    overflow: hidden;
    width: 100%;
    aspect-ratio: 16 / 9;

    iframe {
      width: 100%;
      height: 100%;
      display: block;
      border: none;
    }
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &.left { left: -20px; }
    &.right { right: -20px; }

    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }

    &:disabled {
      opacity: 0.3;
      cursor: default;
    }
  }

  .video-grid-wrapper {
    width: 100%;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgb(0 0 0 / 80%);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;

    .close {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      border: none;
      cursor: pointer;
    }

    .player-wrapper {
      position: relative;
      z-index: 1;
      width: 90vw;
      max-width: 1200px;

      .react-player {
        padding-top: 56.25%;
        position: relative;
        width: 100%;
      }

      .react-player > div {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
`;

const VideoPage = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalPages = Math.ceil(videos.length / VISIBLE);
  const currentPage = Math.floor(startIndex / VISIBLE);

  const visibleVideos = videos.slice(startIndex, startIndex + VISIBLE);

  function prev() {
    setDirection(-1);
    setStartIndex((i) => Math.max(0, i - VISIBLE));
  }

  function next() {
    setDirection(1);
    setStartIndex((i) => Math.min(videos.length - VISIBLE, i + VISIBLE));
  }

  return (
    <Layout>
      <NextSeo title="videos" />
      <VideoPageStyles>
        <div className="carousel-wrapper">
          <button className="arrow left" onClick={prev} disabled={startIndex === 0}>&#8592;</button>
          <div className="video-grid-wrapper">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="grid"
                key={startIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {visibleVideos.map((v) => (
                  <div className="video-item" key={v.videoId}>
                    <iframe
                      src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&mute=1&loop=1&playlist=${v.videoId}&controls=0&modestbranding=1&playsinline=1`}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <button className="arrow right" onClick={next} disabled={startIndex + VISIBLE >= videos.length}>&#8594;</button>
        </div>

      </VideoPageStyles>
    </Layout>
  );
};

export default VideoPage;
