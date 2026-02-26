import Layout from "components/Layout";
import { media } from "components/helpers";
import { NextSeo } from "next-seo";
import Image from "next/image";
import styled from "styled-components";

import aboutImg from "public/about.jpg";

const AboutPageStyles = styled.div`
  padding-top: 40px;
  padding-bottom: 80px;
  ${media.medium`padding-top: 100px;`}
  .wrapper {
    align-items: center;
    ${media.medium`max-width: 1080px; display: flex;`}

    .image {
      flex: 1;
      padding-bottom: 20px;
      ${media.medium`max-width: 1080px; display: flex;padding-right: 100px; padding-bottom: 0px;`}
    }
    .text {
      flex: 1;
      h1 {
        margin-bottom: 10px;
        font-size: 1.5rem;
        ${media.medium`font-size: 2rem;`}
      }
      p {
        line-height: 1.4;
        font-size: 1.4rem;
        ${media.medium`font-size: 1.6rem;`}
      }
    }
  }
`;

const AboutPage = () => {
  return (
    <Layout>
      <NextSeo title="about" />
      <AboutPageStyles>
        <div className="wrapper">
          <div className="image">
            <Image src={aboutImg} alt="singlemotherworkethic" />
          </div>

          <div className="text">
            <h1>SINGLEMOTHERWORKETHIC</h1>
            <p>
              Danté Vasser’s creative project uses film and still media to
              imprint stars that shimmer beyond their space on the sidewalk.
              Through analog and digital media they capture scenes in a way that
              can only be described as melodramatic astro-urbanism.
            </p>
          </div>
        </div>
      </AboutPageStyles>
    </Layout>
  );
};

export default AboutPage;
