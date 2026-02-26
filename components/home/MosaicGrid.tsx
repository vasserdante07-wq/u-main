import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

const MuxPlayer = dynamic(() => import("@mux/mux-player-react"), {
  ssr: false,
});

import Image from "next/image";

import { useState } from "react";
import { media } from "components/helpers";
import clsx from "clsx";
import { MediaProps } from "types";

const MosaicGridStyles = styled.div`
  .mosaic-grid {
    margin: 0 auto;

    .mosaic-grid-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin: 0 -20px;
    }

    .image-container,
    .video-container {
      flex: 0 0 50%;
      padding: 0 20px;
      margin-bottom: 40px;
      ${media.medium`flex: 0 0 20%;`}
      button {
        width: 100%;
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
      }

      img {
        width: 100%;
        aspect-ratio: 9 / 16;
        object-fit: cover;
        display: block;
        border-radius: 16px;
      }

      &.full-width {
        flex: 0 0 100%;
      }
    }
  }

  .carousel-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0;
    ${media.medium`padding: 0 50px;`}

    .carousel-arrow {
      position: absolute;
      z-index: 10;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
      border: none;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 18px;
      cursor: pointer;
      display: none;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      ${media.medium`display: flex;`}

      &:hover {
        background: rgba(0, 0, 0, 0.8);
      }

      &.left {
        left: 8px;
      }
      &.right {
        right: 8px;
      }
    }

    .carousel-track {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin: 0 -20px;

      .video-container {
        flex: 0 0 50%;
        padding: 0 20px;
        margin-bottom: 40px;
        ${media.medium`flex: 0 0 20%;`}

        button {
          width: 100%;
          padding: 0;
          border: none;
          background: none;
          cursor: pointer;
        }

        img {
          width: 100%;
          aspect-ratio: 9 / 16;
          object-fit: cover;
          display: block;
          border-radius: 16px;
        }
      }
    }
  }

  .mobile-arrows {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 8px;
    ${media.medium`display: none;`}

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
    background-color: rgb(0 0 0 / 70%);
    z-index: 1000;
    display: flex;
    align-items: center;
    .close {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      border: none;
    }

    .modal__content {
      flex: 1;

      img {
        max-height: 90vh;
        width: auto;
        margin: 0 auto;
      }

      .player-wrapper {
        width: auto;
        height: auto;
        max-width: 1000px;
        margin: 0 auto;
      }

      .react-player {
        padding-top: 56.25%;
        position: relative;
        width: 100%;
        height: 100%;
      }

      .react-player > div {
        position: absolute;
        top: 0;
        left: 0;
      }

      mux-player {
        display: block;
        aspect-ratio: 9 / 16;
        max-height: 80vh;
        width: auto;
        margin: 0 auto;
        border-radius: 16px;
        overflow: hidden;
      }
    }
  }
`;

const VISIBLE = 4;

const MosaicGrid = ({ items = [] }: { items: MediaProps[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModal, setIsVideoModal] = useState(false);
  const [isMuxModal, setIsMuxModal] = useState(false);
  const [currentPortfolioItem, setCurrentPortfolioItem] = useState<number>(0);
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const isCarousel = items.length > VISIBLE;

  function toggleModal(index: number, isVideo = false, isMux = false) {
    setCurrentPortfolioItem(index);
    setIsModalOpen(true);
    setIsVideoModal(isVideo);
    setIsMuxModal(isMux);
  }

  const totalPages = Math.ceil(items.length / VISIBLE);
  const currentPage = startIndex / VISIBLE;

  function prev() {
    setDirection(-1);
    setStartIndex((prev) => (prev - VISIBLE + items.length) % items.length);
  }

  function next() {
    setDirection(1);
    setStartIndex((prev) => (prev + VISIBLE) % items.length);
  }

  const visibleItems = isCarousel
    ? Array.from({ length: VISIBLE }, (_, i) => {
        const idx = (startIndex + i) % items.length;
        return { item: items[idx], realIndex: idx };
      })
    : items.map((item, i) => ({ item, realIndex: i }));

  function renderItem(item: MediaProps, realIndex: number, key: string) {
    if (item.image) {
      return (
        <div className={clsx("image-container", item?.className)} key={key}>
          <button onClick={() => toggleModal(realIndex)}>
            <Image src={item.image} alt="" />
          </button>
        </div>
      );
    } else if (item.muxId) {
      return (
        <div className="video-container" key={key}>
          <button onClick={() => toggleModal(realIndex, true, true)}>
            <img
              src={`https://image.mux.com/${item.muxId}/thumbnail.jpg?width=400&height=711&fit_mode=crop${item.thumbnailTime !== undefined ? `&time=${item.thumbnailTime}` : ""}`}
              alt=""
            />
          </button>
        </div>
      );
    } else if (item.videoId) {
      return (
        <div className="video-container" key={key}>
          <button onClick={() => toggleModal(realIndex, true, false)}>
            <img
              src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`}
              alt=""
            />
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <MosaicGridStyles>
      <div className="mosaic-grid wrapper">
        {isCarousel ? (
          <div className="carousel-wrapper">
            <button className="carousel-arrow left" onClick={prev}>&#8592;</button>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="carousel-track"
                key={startIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {visibleItems.map(({ item, realIndex }, i) =>
                  renderItem(item, realIndex, `carousel-${startIndex}-${i}`)
                )}
              </motion.div>
            </AnimatePresence>
            <button className="carousel-arrow right" onClick={next}>&#8594;</button>
          </div>
        ) : null}
        {isCarousel && (
          <div className="mobile-arrows">
            <button onClick={prev}>&#8592;</button>
            <button onClick={next}>&#8594;</button>
          </div>
        )}
        {!isCarousel && (
          <div className="mosaic-grid-row">
            {items.map((item, index) => renderItem(item, index, `item-${index}`))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <motion.div
          className="modal"
          key="modal-container"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1 },
            collapsed: { opacity: 0 },
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <button
            className="close"
            onClick={() => setIsModalOpen(false)}
          ></button>
          <div className="modal__content wrapper">
            <div className="modal__content-inner">
              {isVideoModal && isMuxModal ? (
                <MuxPlayer
                  playbackId={items[currentPortfolioItem]?.muxId}
                  muted
                  autoPlay
                  loop
                  playsInline
                  controls={false}
                />
              ) : isVideoModal ? (
                <div className="player-wrapper">
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${items[currentPortfolioItem]?.videoId}`}
                    muted={true}
                    controls={false}
                    playing={true}
                    loop={true}
                    className="react-player"
                    width={"auto"}
                    height={"auto"}
                    playsinline={true}
                    config={{
                      youtube: {
                        playerVars: {
                          modestbranding: 0,
                        },
                      },
                    }}
                  />
                </div>
              ) : (
                <>
                  {items[currentPortfolioItem].image && (
                    <Image
                      src={items?.[currentPortfolioItem]?.image || ""}
                      alt=""
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </MosaicGridStyles>
  );
};

export default MosaicGrid;
