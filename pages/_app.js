import "@primer/primitives/dist/css/functional/themes/light.css";
import "@primer/primitives/dist/css/functional/themes/dark.css";
import "@primer/primitives/dist/css/primitives.css";
import { ThemeProvider, BaseStyles } from "@primer/react";

import "../styles/globals.css";
import { literata, inter } from "../styles/fonts.js";
import { LightRays } from "components/ui/light-rays.jsx";

function MyApp({ Component, pageProps }) {
  return (
    <html lang="pt-br" className={`${literata.variable} ${inter.variable}`}>
      <body>
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
            <LightRays />
            <div className="app-content">
              <Component {...pageProps} />
            </div>
          </BaseStyles>
        </ThemeProvider>
      </body>
    </html>
  );
}
export default MyApp;
