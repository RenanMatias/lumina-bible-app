import { Stack } from "@primer/react";

import { Marquee } from "components/ui/marquee.jsx";
import VerseCard from "../VerseCard/index.jsx";
import verses from "../static/verses.json";
import styles from "./styles.module.css";

const firstRow = verses.slice(0, verses.length / 2);
const secondRow = verses.slice(verses.length / 2);

const VERTICAL_MASK = "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)";
const HORIZONTAL_MASK = "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)";

const sectionStyle = { marginBlock: "var(--base-size-48)" };
const mobileRowStyle = {
  width: "100%",
  overflow: "hidden",
  maskImage: VERTICAL_MASK,
  WebkitMaskImage: VERTICAL_MASK,
  height: "400px",
  maxWidth: "640px",
};
const desktopRowStyle = { width: "100%", maskImage: HORIZONTAL_MASK, WebkitMaskImage: HORIZONTAL_MASK };
const mobileMarqueeStyle = { "--duration": "100s" };
const desktopMarqueeStyle = { "--duration": "200s" };

export default function HeadingContent() {
  return (
    <>
      <Stack style={sectionStyle}>
        {/* Mobile */}
        <div className={styles.showOnlyMobile}>
          <Stack align="center" style={mobileRowStyle}>
            <Marquee pauseOnHover style={mobileMarqueeStyle} vertical={true}>
              {firstRow.map((verse) => (
                <VerseCard key={verse.passage} {...verse} />
              ))}
            </Marquee>
          </Stack>
        </div>

        {/* Desktop */}
        <div className={`${styles.showOnlyDesktop}`}>
          <Stack style={desktopRowStyle}>
            <Marquee pauseOnHover style={desktopMarqueeStyle}>
              {firstRow.map((verse) => (
                <VerseCard key={verse.passage} {...verse} />
              ))}
            </Marquee>
          </Stack>

          <Stack style={desktopRowStyle}>
            <Marquee reverse pauseOnHover style={desktopMarqueeStyle}>
              {secondRow.map((verse) => (
                <VerseCard key={verse.passage} {...verse} />
              ))}
            </Marquee>
          </Stack>
        </div>
      </Stack>
    </>
  );
}
