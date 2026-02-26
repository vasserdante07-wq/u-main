import Layout from "components/Layout";
import MosaicGrid from "components/home/MosaicGrid";
import { NextSeo } from "next-seo";
import styled from "styled-components";

const ReelsPageStyles = styled.div`
  padding-bottom: 100px;
`;

const reels = [
  { muxId: "UmaM6v1G6Q02OsY5auc2IxLKqdyIxdYTA01xB01ysie1TI" },
  { muxId: "SmPVUfFn8hR00G2KKSvZQixOtu4y3EOydNIIMsBs7emg" },
  { muxId: "BbmtptSSFbTPu5gqKA02jYFLM2oZm2GeX9zBdMN4UB8M" },
  { muxId: "9OIOXpfA73PFnrhrRLQrYvWwJMdkeA4QEIAOXWD01Eqw" },
  { muxId: "MKkk4OkT43IdlJ00RCNMjKyQgid9hp2F5ZqbrnDPRlC4" },
];

const ReelsPage = () => (
  <Layout>
    <NextSeo title="reels" />
    <ReelsPageStyles>
      <MosaicGrid items={reels} />
    </ReelsPageStyles>
  </Layout>
);

export default ReelsPage;
