import { Html, Head, Main, NextScript } from "next/document";

import "../styles/globals.css";
import { literata, inter } from "../styles/fonts.js";

export default function Document() {
  return (
    <Html lang="pt-br" className={`${literata.variable} ${inter.variable}`}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
