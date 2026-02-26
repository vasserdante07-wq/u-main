import Layout from "components/Layout";
import { media } from "components/helpers";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

import cashApp from "public/cashapp.jpg";

const FundPageStyles = styled.div`
  padding: 40px 0;
  .title-container {
    text-align: center;
    margin-bottom: 40px;
  }
  .page-content {
    ${media.medium`max-width: 1080px; `}

    .image {
      margin-bottom: 20px;
      border-radius: 20px;
      overflow: hidden;

      ${media.medium`max-width: 450px; margin: 0 auto 40px; `}
    }

    p {
      font-size: 16px;
      line-height: 2;
      margin: 0 0 20px;
    }

    ul {
      padding-left: 20px;
      li {
        font-size: 14px;
        margin-bottom: 20px;
        a {
          color: blue;
        }
      }
    }
  }
`;

const FundPage = () => {
  return (
    <Layout>
      {" "}
      <FundPageStyles>
        <div className="title-container wrapper">
          <h1>The Singlemotherworkethic Mutual Aid Fund</h1>
        </div>

        <div className="wrapper page-content">
          <div className="image">
            <Image src={cashApp} alt="Cash App" />
          </div>
          <p>
            The Singlemotherworkethic Mutual Aid fund’s goal is to collect and
            redistribute funds to single mother households and families. Being
            raised by a single mother that worked 2-3 jobs all my life just to
            provide for her and I instilled a feral work ethic in me. No one
            should have to work that much to make end’s meet and we aim to make
            life easier for those that were raised in similar situations that I
            was raised in. Our goal is to raise $10,000 by December 1st. We’d
            like to help take the burden off of shopping for presents and
            providing for bills in the harsh winter months. Our goal is to raise
            and redistribute money first, than after seeing that we can meet our
            goals starting an organization of our own. There seems to be a lack
            of a resources extended to families with single mothers. “Single
            motherhood has grown so common in America that today 80 percent of
            single-parent families are headed by single mothers — a third live
            in poverty” - says singlemotherguide.com “Once largely limited to
            poor women and minorities, single motherhood is now becoming the new
            “norm”. This prevalence is due in part to the growing trend of
            children born outside marriage — a societal trend that was virtually
            unheard of decades ago.”
          </p>
          <p>
            <strong>Resources</strong>
          </p>
          <ul>
            <li>
              Statistics are listed and resources are provided through
              singmotherguide.com ---{" "}
              <a
                target="_blank"
                href="https://singlemotherguide.com/state/new-york/"
              >
                https://singlemotherguide.com/state/new-york
              </a>
            </li>
            <li>
              South BK mutual aid has a community market among other resources
              ---{" "}
              <a target="_blank" href="https://www.southbkmutualaid.com">
                https://www.southbkmutualaid.com
              </a>
            </li>
          </ul>
          <p>
            <strong>
              There are a number of grants you can apply for if you need
              assistance, they are listed below:
            </strong>
          </p>
          <ul>
            <li>New York Earned Income Tax Credit</li>
            <li>New York Family Assistance (TANF)</li>
            <li>New York Supplemental Nutrition Assistance Program (SNAP)</li>
            <li>New York Medicaid</li>
            <li>New York Child Health Plus (CHPlus)</li>
            <li>
              New York Special Program for Women, Infants, and Children (WIC)
            </li>
            <li>New York Child and Adult Care Food Program (CACFP)</li>
            <li>New York Subsidized Child Care</li>
            <li>New York pre-Kindergarten Program</li>
            <li>New York Section 8 Program</li>
            <li>New York Home Energy Assistance Program (HEAP)</li>
            <li>New York HEAP Cooling Assistance Program</li>
            <li>
              New York Low Income Household Water Assistance Program (LIHWAP)
            </li>
            <li>New York Unemployment Insurance</li>
            <li>New York State Paid Family Leave</li>
            <li>New York State Tuition Assistance Program (TAP)</li>
            <li>New York Aid for Part-time Study (APTS)</li>
          </ul>
        </div>
      </FundPageStyles>{" "}
    </Layout>
  );
};

export default FundPage;
