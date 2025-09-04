declare module 'dotlottie-wc' {
  interface DotLottieElement extends HTMLElement {
    src: string;
    style: React.CSSProperties;
    speed: string;
    autoplay: boolean;
    loop: boolean;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': {
        src: string;
        style: React.CSSProperties;
        speed: string;
        autoplay: boolean;
        loop: boolean;
      };
    }
  }
}
