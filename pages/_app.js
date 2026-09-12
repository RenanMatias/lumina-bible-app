import "@primer/primitives/dist/css/functional/themes/light.css";

import { ThemeProvider, BaseStyles } from "@primer/react";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <BaseStyles>
        <div data-astro-cid-j7pv25f6=""></div>
        <Component {...pageProps} />
      </BaseStyles>
    </ThemeProvider>
  );
}
