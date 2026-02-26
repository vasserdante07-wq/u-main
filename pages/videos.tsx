import Layout from "components/Layout";
import { NextSeo } from "next-seo";
import styled from "styled-components";
import { media } from "components/helpers";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const VISIBLE = 6;

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
    max-width: 90vw;
    margin: 0 auto;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    ${media.small`grid-template-columns: repeat(2, 1fr); gap: 20px;`}
    ${media.medium`grid-template-columns: repeat(3, 1fr);`}
  }

  .video-item {
    cursor: pointer;
    border-radius: 12px;
    overflow: hidden;

    img {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      display: block;
      border-radius: 12px;
    }
  }

  .arrows {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;

    button {
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

      &:hover {
        background: rgba(0, 0, 0, 0.8);
      }

      &:disabled {
        opacity: 0.3;
        cursor: default;
      }
    }
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
  const [modalVideo, setModalVideo] = useState<string | null>(null);
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
                <div
                  className="video-item"
                  key={v.videoId}
                  onClick={() => setModalVideo(v.videoId)}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${v.videoId}/${v.thumbnailSize ?? "hqdefault"}.jpg`}
                    alt=""
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <div className="arrows">
              <button onClick={prev} disabled={startIndex === 0}>&#8592;</button>
              <button onClick={next} disabled={startIndex + VISIBLE >= videos.length}>&#8594;</button>
            </div>
          )}
        </div>

        {modalVideo && (
          <motion.div
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button className="close" onClick={() => setModalVideo(null)} />
            <div className="player-wrapper">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${modalVideo}`}
                playing
                controls
                width="100%"
                height="100%"
                className="react-player"
              />
            </div>
          </motion.div>
        )}
      </VideoPageStyles>
    </Layout>
  );
};

export default VideoPage;
