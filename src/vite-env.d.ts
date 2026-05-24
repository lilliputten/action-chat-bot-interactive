/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />

// LQIP
declare module '*?lqip' {
  const lqip: LQIP;
  export default lqip;
}
// React mode
declare module '*?lqip&react' {
  import type { FC, ImgHTMLAttributes } from 'react';
  const component: FC<ImgHTMLAttributes<HTMLImageElement>>;
  export default component;
}

declare module '*.json' {
  const data: any; // Or a more specific interface if you know the structure
  export default data;
}

declare module '*.yaml' {
  const data: any;
  export default data;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.scss';

declare module '*.png' {
  const data: string;
  export default data;
}

declare module '*.jpg' {
  const data: string;
  export default data;
}
