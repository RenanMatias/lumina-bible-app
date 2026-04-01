import "@primer/primitives/dist/css/functional/themes/light.css";
import "@primer/primitives/dist/css/functional/themes/dark.css";
import { ThemeProvider, BaseStyles, Stack } from "@primer/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider colorMode="night">
      <BaseStyles>
        <Stack
          style={{
            backgroundColor: "var(--bgColor-default)",
            color: "var(--fgColor-default)",
            minHeight: "100vh",
          }}
        >
          <Component {...pageProps} />
        </Stack>
      </BaseStyles>
    </ThemeProvider>
  );
}
export default MyApp;
