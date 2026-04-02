import "@primer/primitives/dist/css/functional/themes/light.css";
import "@primer/primitives/dist/css/functional/themes/dark.css";
import "../styles/globals.css";
import { ThemeProvider, BaseStyles } from "@primer/react";
import { LightRays } from "@/components/ui/light-rays";

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
        <Component {...pageProps} />
        <LightRays />
      </BaseStyles>
    </ThemeProvider>
  );
}
export default MyApp;
