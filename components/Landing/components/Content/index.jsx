import React from "react";
import { Stack } from "@primer/react";

import HeadingContent from "../Heading/index.jsx";
import MarqueeContent from "../Marquee/index.jsx";
import BodyContent from "../Body/index.jsx";
import FeatureContent from "../Feature/index.jsx";
import FooterContent from "../Footer/index.jsx";

export default function Content() {
  return (
    <>
      <Stack style={{ marginBlock: 50 }}>
        <HeadingContent />
        <MarqueeContent />
        <BodyContent />
        <FeatureContent />
        <FooterContent />
      </Stack>
    </>
  );
}
