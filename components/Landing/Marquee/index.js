import { Stack } from "@primer/react";

import { Marquee } from "components/ui/marquee.jsx";
import VerseCard from "../VerseCard/index.jsx";
import verses from "../static/verses.json";
import styles from "./styles.module.css";

const firstRow = verses.slice(0, verses.length / 2);
const secondRow = verses.slice(verses.length / 2);

export default function HeadingContent() {
  return (
    <>
      <Stack style={{ marginBlock: "var(--base-size-48)" }}>
        {/* Mobile */}
        <div className={styles.showOnlyMobile}>
          <Stack
            align="center"
            style={{
              width: "100%",
              overflow: "hidden",
              maskImage: "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)",
              height: "400px",
              maxWidth: "640px",
            }}
          >
            <Marquee pauseOnHover style={{ "--duration": "100s" }} vertical={true}>
              {firstRow.map((verse) => (
                <VerseCard key={verse.username} {...verse} />
              ))}
            </Marquee>
          </Stack>
        </div>

        {/* Desktop */}
        <div className={`${styles.showOnlyDesktop}`}>
          <Stack
            style={{
              width: "100%",
              maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            }}
          >
            <Marquee pauseOnHover style={{ "--duration": "200s" }}>
              {firstRow.map((verse) => (
                <VerseCard key={verse.username} {...verse} />
              ))}
            </Marquee>
          </Stack>

          <Stack
            style={{
              width: "100%",
              maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            }}
          >
            <Marquee reverse pauseOnHover style={{ "--duration": "200s" }}>
              {secondRow.map((verse) => (
                <VerseCard key={verse.username} {...verse} />
              ))}
            </Marquee>
          </Stack>
        </div>
      </Stack>
    </>
  );
}
