import Link from "next/link";
import styled from "styled-components";
import Instagram from "public/instagram.svg";
import { media } from "components/helpers";
import MobileMenu from "./MobileMenu";
import { useEffect, useRef, useState } from "react";
import Hamburger from "hamburger-react";

const HeaderStyles = styled.header`
  .full-header {
    padding: 25px 0;
  }
  .wrapper {
    max-width: 90vw;
    margin: 0 auto;
    text-align: center;
    display: flex;
    align-items: center;
    ${media.medium` text-align: left;`}
    .header-logo {
      flex: 1;

      a {
        display: inline-block;
        h1 {
          font-family: var(--font-yanone);
          text-transform: lowercase;
          font-size: 1.6rem;
          color: var(--color-off-black);
          ${media.medium`font-size: 2rem;`}
        }
      }
    }

    .header-links {
      flex: 1;
      text-align: center;
      display: none;
      ${media.medium`text-align: right;display: block;`}

      ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
        justify-content: center;
        align-items: center;
        ${media.medium`justify-content: flex-end;`}

        li {
          margin-right: 30px;

          &:last-child {
            margin-right: 0px;
          }

          a,
          button {
            color: var(--color-off-black);
            font-size: 1.2rem;
            text-transform: lowercase;
            padding: 0;
            background-color: transparent;
            border: none;
            font-family: var(--font-yanone);
            transition: 0.25s;
            &:hover {
              opacity: 0.7;
            }
          }

          svg {
            position: relative;
            top: 3px;
          }
        }
      }
    }

    .mobile-toggle {
      flex: 0 0 100px;
      ${media.medium`display: none;`}
      .hamburger-react {
        margin-left: auto;
      }
    }
  }
`;

const links = [
  {
    title: "Reels",
    href: "/reels",
  },
  {
    title: "Videos",
    href: "/videos",
  },
  {
    title: "Stills",
    href: "/stills",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Work With Me",
    href: "/work-with-me",
  },
];

const Header = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef?.current?.offsetHeight) return;

    const resizeObserver = new ResizeObserver(() => {
      setHeaderHeight(headerRef?.current?.offsetHeight as number);
    });

    window.dispatchEvent(
      new CustomEvent("RESET_HEADER_HEIGHT", {
        detail: {
          headerHeight,
        },
      })
    );

    resizeObserver.observe(headerRef.current);

    return () => resizeObserver.disconnect();
  }, []);
  return (
    <HeaderStyles>
      <div className="full-header" ref={headerRef}>
        <div className="wrapper">
          <div className="header-logo">
            <Link href="/">
              <h1>SingleMotherWorkEthic</h1>
            </Link>
          </div>
          <div className="header-links">
            <ul>
              {links.map((link, index) => {
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
          <div className="mobile-toggle">
            <Hamburger
              toggled={isMobileMenuOpen}
              toggle={setIsMobileMenuOpen}
              size={20}
            />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <MobileMenu links={links} headerHeight={headerHeight} />
      )}
    </HeaderStyles>
  );
};

export default Header;
