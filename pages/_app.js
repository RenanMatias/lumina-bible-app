import "@primer/primitives/dist/css/functional/themes/light.css";
import "@primer/primitives/dist/css/functional/themes/dark.css";
import "@primer/primitives/dist/css/primitives.css";
import { ThemeProvider, BaseStyles } from "@primer/react";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider colorMode="night">
      <BaseStyles
        style={{
          backgroundColor: "var(--bgColor-default)",
          color: "var(--fgColor-default)",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <div className="stars" data-astro-cid-j7pv25f6=""></div>
        <div className="app-content">
          <Component {...pageProps} />
        </div>
      </BaseStyles>
    </ThemeProvider>
  );
}
export default MyApp;
