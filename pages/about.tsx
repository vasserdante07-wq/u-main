import Layout from "components/Layout";
import { media } from "components/helpers";
import { NextSeo } from "next-seo";
import styled from "styled-components";

const AboutPageStyles = styled.div`
  padding-top: 40px;
  padding-bottom: 80px;
  ${media.medium`padding-top: 100px;`}
  .wrapper {
    align-items: center;
    ${media.medium`max-width: 1080px; display: flex;`}

    .image {
      flex: 0 0 60%;
      padding-bottom: 20px;
      ${media.medium`display: flex; padding-right: 60px; padding-bottom: 0px;`}

      img {
        width: 100%;
        max-height: 70vh;
        object-fit: cover;
        border-radius: 20px;
        display: block;
      }
    }
    .text {
      flex: 0 0 35%;
      h1 {
        margin-bottom: 10px;
        font-size: 1.2rem;
        ${media.medium`font-size: 1.4rem;`}
      }
      p {
        line-height: 1.4;
        font-size: 0.95rem;
        margin: 0;
        ${media.medium`font-size: 1rem;`}
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
            <img src="/about.jpg" alt="singlemotherworkethic" />
          </div>

          <div className="text">
            <h1>SINGLEMOTHERWORKETHIC</h1>
            <p>
              SINGLEMOTHERWORKETHIC is the multidisciplinary visual world of Danté Vasser, exploring identity, fashion, memory, and city mythology through film and still imagery. Using both analog and digital formats, the work transforms everyday moments into cinematic artifacts that are textured, emotional, and larger than life. Currently collaborating with brands including Pelle Pelle, Danté develops visual campaigns, editorial work, and branded content that merge street legacy with contemporary image-making.
            </p>
          </div>
        </div>
      </AboutPageStyles>
    </Layout>
  );
};

export default AboutPage;
