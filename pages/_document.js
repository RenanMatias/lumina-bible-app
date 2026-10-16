import { Html, Head, Main, NextScript } from "next/document";

import { literata, inter } from "../styles/fonts.js";

export default function Document() {
  return (
    <Html
      lang="pt-br"
      data-color-mode="light"
      data-light-theme="light"
      className={`${literata.variable} ${inter.variable}`}
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
