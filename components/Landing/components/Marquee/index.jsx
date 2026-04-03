import { Marquee } from "@/components/ui/marquee.tsx";

import VerseCard from "../VerseCard/index.jsx";
import verses from "../../static/verses.json";
import { Stack } from "@primer/react";

const firstRow = verses.slice(0, verses.length / 2);
const secondRow = verses.slice(verses.length / 2);

export default function HeadingContent() {
  return (
    <>
      <Stack style={{ marginBlock: 50 }}>
        <div className="block sm:hidden">
          <Stack
            align="center"
            style={{
              width: "100%",
              overflow: "hidden",
              maskImage: "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)",
              height: "400px",
              maxWidth: "var(--breakpoint-small)",
            }}
          >
            <Marquee pauseOnHover className="[--duration:100s]" vertical={true}>
              {firstRow.map((verse) => (
                <VerseCard key={verse.username} {...verse} />
              ))}
            </Marquee>
          </Stack>
        </div>
        <div className="hidden sm:block">
          <Stack
            style={{
              width: "100%",
              maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            }}
          >
            <Marquee pauseOnHover className="[--duration:200s]">
              {firstRow.map((verse) => (
                <VerseCard key={verse.username} {...verse} />
              ))}
            </Marquee>
          </Stack>
        </div>
        <div className="hidden sm:block">
          <Stack
            style={{
              width: "100%",
              maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            }}
          >
            <Marquee reverse pauseOnHover className="[--duration:200s]">
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
