import Layout from "components/Layout";
import { NextSeo } from "next-seo";
import styled from "styled-components";
import Image from "next/image";
import logo from "public/logo.png";

const WorkWithMeStyles = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    text-align: center;
    padding: 20px 20px;
    max-width: 600px;

    .logo {
      width: 120px !important;
      height: auto !important;
      margin: 0 auto 16px;
      display: block;
    }

    h1 {
      font-size: 2rem;
      margin-bottom: 12px;
      text-transform: lowercase;
      letter-spacing: 0.05em;
    }

    p {
      font-size: 1rem;
      line-height: 1.8;
      margin-bottom: 32px;
      color: rgba(0, 0, 0, 0.65);
    }

    .contact-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;

      li {
        font-size: 1rem;

        a {
          color: inherit;
          text-decoration: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          padding-bottom: 2px;
          transition: border-color 0.2s;

          &:hover {
            border-color: rgba(0, 0, 0, 0.8);
          }
        }

        span {
          font-weight: 600;
          margin-right: 8px;
        }
      }
    }
  }
`;

const WorkWithMePage = () => {
  return (
    <Layout>
      <NextSeo title="work with me" />
      <WorkWithMeStyles>
        <div className="content">
          <Image src={logo} alt="logo" className="logo" width={120} height={120} />
          <h1>work with me</h1>
          <p>
            Available for editing, videography, and any other creative projects.
            Reach out through any of the channels below to get in touch or schedule.
          </p>
          <ul className="contact-list">
            <li>
              <span>phone</span>
              <a href="sms:8457979749?body=Let's%20chat!%20I'm%20seeking%20editing%20or%20videography%20services.%20Let's%20schedule%20a%20meeting.">(845) 797-9749</a>
            </li>
            <li>
              <span>email</span>
              <a href="mailto:vasserdante07@gmail.com">vasserdante07@gmail.com</a>
            </li>
            <li>
              <span>instagram</span>
              <a href="https://www.instagram.com/singlemotherworkethic" target="_blank" rel="noreferrer">@singlemotherworkethic</a>
            </li>
            <li>
              <span>youtube</span>
              <a href="https://www.youtube.com/@singlemotherworkethic/videos" target="_blank" rel="noreferrer">singlemotherworkethic</a>
            </li>
          </ul>
        </div>
      </WorkWithMeStyles>
    </Layout>
  );
};

export default WorkWithMePage;
