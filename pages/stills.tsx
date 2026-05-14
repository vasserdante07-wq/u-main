import Layout from "components/Layout";
import MosaicGrid from "components/home/MosaicGrid";
import { NextSeo } from "next-seo";

import scanTwo from "public/work/dantes_scans_2.jpg";
import scanSix from "public/work/dantes_scans_6.jpg";
import scanSeven from "public/work/dantes_scans_7.jpg";
import imgTwo from "public/work/IMG_2414.jpg";
import imgFive from "public/work/IMG_5551.jpg";
import vertOne from "public/work/vert-1-min.jpg";
import vertTwo from "public/work/vert-2-min.jpg";
import vertThree from "public/work/vert-3-min.jpg";
import vertFour from "public/work/vert-4-min.jpg";
import vertFive from "public/work/vert-5-min.jpg";
import vertSix from "public/work/vert-6-min.jpg";
import vertSeven from "public/work/vert-7-min.jpg";
import vertEight from "public/work/vert-8-min.jpg";
import vertNine from "public/work/vert-9-min.jpg";

import horizontalOne from "public/work/hor-1-min.png";
import horizontalTwo from "public/work/hor-2-min.png";
import horizontalThree from "public/work/hor-3-min.jpg";
import horizontalFour from "public/work/hor-4-min.jpg";
import horizontalFive from "public/work/hor-5-min.jpg";
import horizontalSix from "public/work/hor-6-min.jpg";
import horizontalEight from "public/work/hor-8-min.jpg";
import horizontalNine from "public/work/hor-9-min.jpg";

import styled from "styled-components";
import { media } from "components/helpers";
import { StaticImageData } from "next/image";

const StillPageStyles = styled.div`
  width: 100%;
  padding: 24px 0 40px;
  ${media.medium`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 120px);
    padding: 40px 0;
  `}
`;

type MediaProps = {
  image: StaticImageData;
  className?: string;
};

const items: MediaProps[] = [
  // Page 1
  { image: vertNine },
  { image: vertSix },
  { image: vertSeven },
  { image: imgTwo },
  // Page 2
  { image: horizontalThree },
  { image: horizontalFour },
  { image: horizontalFive },
  { image: imgFive },
  // Page 3 — vertTwo + scans
  { image: vertTwo },
  { image: scanTwo },
  { image: scanSix },
  { image: scanSeven },
  // Page 4
  { image: vertOne },
  { image: vertThree },
  { image: vertEight },
];

const StillsPage = () => {
  return (
    <Layout>
      <NextSeo title="stills" />
      <StillPageStyles>
        <MosaicGrid items={items} />
      </StillPageStyles>
    </Layout>
  );
};

export default StillsPage;
