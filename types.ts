import { StaticImageData } from "next/image";

export type MediaProps = {
  image?: StaticImageData | string;
  className?: string;
  videoId?: string;
  muxId?: string;
  thumbnailTime?: number;
};
