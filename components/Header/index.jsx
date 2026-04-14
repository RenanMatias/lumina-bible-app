import React from "react";
import { PageHeader, IconButton, Button } from "@primer/react";
import { ThreeBarsIcon } from "@primer/octicons-react";
import Image from "next/image";

import styles from "./styles.module.css";

export default function Header() {
  return (
    <PageHeader role="banner" aria-label="Title" className={styles.header}>
      <PageHeader.TitleArea>
        <PageHeader.LeadingVisual>
          <Image src="/brand/white.png" alt="Lumina Escritura Logo" width={42} height={32} />
        </PageHeader.LeadingVisual>
        <PageHeader.Title hidden={{ narrow: true, regular: false, wide: false }}>Lumina Escritura</PageHeader.Title>
      </PageHeader.TitleArea>
      <PageHeader.TrailingAction hidden={false}>
        <Button variant="primary">Bíblia</Button>
      </PageHeader.TrailingAction>
      <PageHeader.Actions>
        <IconButton icon={ThreeBarsIcon} />
      </PageHeader.Actions>
    </PageHeader>
  );
}
