import Layout from "components/Layout";
import VideoBlock from "components/home/VideoBlock";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <Layout>
        <NextSeo title="singlemotherworkethic" />
        <VideoBlock />
      </Layout>
    </>
  );
}
