import Layout from "components/Layout";
import MosaicGrid from "components/home/MosaicGrid";
import { NextSeo } from "next-seo";
import styled from "styled-components";

const ReelsPageStyles = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
`;

const reels = [
  { muxId: "HuT1iFbTo1v32ZB4kmovHbBeKCvl1hhpKVirXDsDarc", thumbnailTime: 22.99 },
  { muxId: "UmaM6v1G6Q02OsY5auc2IxLKqdyIxdYTA01xB01ysie1TI", thumbnailTime: 6.74 },
  { muxId: "pALv4JQJcPlB7FqChnaZEL9q8an02SkGLZFh8qcGrHro", thumbnailTime: 10.1 },
  { muxId: "9OIOXpfA73PFnrhrRLQrYvWwJMdkeA4QEIAOXWD01Eqw", thumbnailTime: 16.95 },
  { muxId: "SmPVUfFn8hR00G2KKSvZQixOtu4y3EOydNIIMsBs7emg", thumbnailTime: 7.1 },
  { muxId: "mKg8yMjFms00JuX3RhAGeOPQ8tRZ62NSbG02019TJXAexY", thumbnailTime: 6.79 },
  { muxId: "E00uCd00yvcEfbbF61eaUktVoQd7ItjQpUzf2F22XQzm8", thumbnailTime: 5.56 },
  { muxId: "MKkk4OkT43IdlJ00RCNMjKyQgid9hp2F5ZqbrnDPRlC4", thumbnailTime: 15.86 },
];

const ReelsPage = () => {
  return (
    <Layout>
      <NextSeo title="reels" />
      <ReelsPageStyles>
        <MosaicGrid items={reels} />
      </ReelsPageStyles>
    </Layout>
  );
};

export default ReelsPage;
