import "@primer/primitives/dist/css/functional/themes/light.css";
import "../styles/globals.css";

import { BaseStyles } from "@primer/react";

export default function App({ Component, pageProps }) {
  return (
    <BaseStyles>
      <Component {...pageProps} />
    </BaseStyles>
  );
}
