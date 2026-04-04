import React from "react";
import { Stack, Label } from "@primer/react";

import HeadingContent from "../Heading/index.jsx";
import MarqueeContent from "../Marquee/index.js";
import BodyContent from "../Body/index.jsx";
import FeatureContent from "../Feature/index.jsx";
import FooterContent from "../Footer/index.jsx";

export default function Content() {
  return (
    <>
      <Stack style={{ marginBlock: "var(--base-size-48)", gap: "var(--base-size-20)" }}>
        <Label variant="attention" style={{ alignSelf: "start", marginBottom: 20 }}>
          Em construção
        </Label>
        <HeadingContent />
        <MarqueeContent />
        <BodyContent />
        <FeatureContent />
        <FooterContent />
      </Stack>
    </>
  );
}
