import "@primer/primitives/dist/css/functional/themes/light.css";
import { ThemeProvider, BaseStyles } from "@primer/react";

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <BaseStyles>
        <div className="stars" data-astro-cid-j7pv25f6=""></div>
        <Component {...pageProps} />
      </BaseStyles>
    </ThemeProvider>
  );
}
