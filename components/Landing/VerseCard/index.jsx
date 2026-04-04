import React from "react";
import { Stack, Text } from "@primer/react";

import styles from "./styles.module.css";

export default function VerseCard({ verse, passage }) {
  const parts = verse.split("||");

  return (
    <Stack className={styles.cardCustom}>
      <Stack style={{ maxWidth: "var(--overlay-width-medium)", padding: "clamp(12px, 2vw, 16px)" }}>
        <Text as="p" size="medium" weight="light" style={{ color: "var(--fgColor-draft)" }}>
          {parts.map((part, index) =>
            index % 2 === 1 ? (
              <Text
                key={index}
                as="span"
                size="medium"
                weight="semibold"
                style={{ color: "var(--bgColor-accent-emphasis)" }}
              >
                {part}
              </Text>
            ) : (
              <React.Fragment key={index}>{part}</React.Fragment>
            ),
          )}
        </Text>

        <Text as="span" size="small" weight="medium" style={{ color: "#FF0080" }}>
          {passage}
        </Text>
      </Stack>
    </Stack>
  );
}
