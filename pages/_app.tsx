import "styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";

// const yanone = Yanone_Kaffeesatz({
//   weight: ["300", "400", "500", "600"],
//   variable: "--font-yanone",
//   subsets: ["latin"],
// });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <DefaultSeo titleTemplate="%s | singlemotherworkethic" />
      <Component {...pageProps} />
    </div>
  );
}
