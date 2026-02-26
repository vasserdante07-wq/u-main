declare module '*.JPG' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '@mux/mux-player-react' {
  import * as React from 'react';
  interface MuxPlayerProps {
    playbackId?: string;
    muted?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
    playsInline?: boolean;
    controls?: boolean;
    [key: string]: any;
  }
  const MuxPlayer: React.FC<MuxPlayerProps>;
  export default MuxPlayer;
}
