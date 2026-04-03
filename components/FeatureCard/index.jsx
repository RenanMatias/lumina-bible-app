import React from "react";
import { Stack, Text } from "@primer/react";

import styles from "./styles.module.css";

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className={styles.cardCustom}>
      <Stack align="center" style={{ padding: "1.5rem" }} gap="condensed">
        <Icon size={"clamp(1.5rem, 3vw, 1.875rem)"} className="text-sky-500" />
        <Text weight="semibold" className="text-sky-500">
          {title}
        </Text>
        <Text>{description}</Text>
      </Stack>
    </div>
  );
}
