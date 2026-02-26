import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Instagram from "public/instagram.svg";

const MobileMenuStyles = styled(motion.div)`
  position: fixed;
  top: ${({ headerHeight }: { headerHeight: number }) => headerHeight + "px"};
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--color-off-black);
  z-index: 1000;

  .menu-wrapper {
    padding: 20px;

    ul {
      list-style: none;
      li {
        margin-bottom: 20px;
        a {
          font-size: 1.6rem;
          color: var(--color-pink);
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
        open: { x: 0, opacity: 1 },
        collapsed: { x: -300, opacity: 0 },
      }}
      transition={{
        duration: 0.5,
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
