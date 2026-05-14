import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Instagram from "public/instagram.svg";

const MobileMenuStyles = styled(motion.div)`
  position: fixed;
  top: ${({ headerHeight }: { headerHeight: number }) => headerHeight + "px"};
  left: 0;
  height: calc(100vh - ${({ headerHeight }: { headerHeight: number }) => headerHeight + "px"});
  width: 100%;
  background-color: var(--color-off-black);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  .menu-wrapper {
    padding: 20px;
    width: 100%;

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;

      li {
        a {
          font-size: 2.8rem;
          color: var(--color-pink);
          font-family: var(--font-yanone);
          text-transform: lowercase;
          letter-spacing: 0.03em;
          transition: opacity 0.2s;

          &:active {
            opacity: 0.6;
          }
        }

        svg {
          fill: var(--color-pink);
          width: 24px;
          height: 24px;
        }
      }
    }
  }
`;

type MobileMenuType = {
  headerHeight: number;
  links: {
    title: string;
    href: string;
  }[];
};

const MobileMenu = ({ links, headerHeight }: MobileMenuType) => {
  return (
    <MobileMenuStyles
      key="mobile-menu-container"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: { opacity: 1, y: 0 },
        collapsed: { opacity: 0, y: -16 },
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      headerHeight={headerHeight}
    >
      <div className="menu-wrapper">
        <ul>
          {links?.map((link, index) => {
            return (
              <li key={`link-${index}`}>
                <Link href={link.href}>{link.title}</Link>
              </li>
            );
          })}
          <li>
            <a
              href="https://www.instagram.com/singlemotherworkethic/"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram />
            </a>
          </li>
        </ul>
      </div>
    </MobileMenuStyles>
  );
};

export default MobileMenu;
