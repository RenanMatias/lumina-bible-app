import { useState, useRef } from "react";
import { PageHeader, IconButton, Button } from "@primer/react";
import { ThreeBarsIcon } from "@primer/octicons-react";
import Image from "next/image";

import NavigationDialog from "../NavigationDialog/index.jsx";
import styles from "./styles.module.css";

export default function Header() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const buttonRef = useRef(null);

  const onDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <NavigationDialog isOpen={isDialogOpen} onClose={onDialogClose} returnFocusRef={buttonRef} />

      <PageHeader role="banner" aria-label="Title" className={styles.header}>
        <PageHeader.TitleArea>
          <PageHeader.LeadingVisual>
            <Image src="/brand/white.png" alt="Lumina Escritura Logo" width={42} height={32} />
          </PageHeader.LeadingVisual>
          <PageHeader.Title hidden={{ narrow: true, regular: false, wide: false }}>Lumina Escritura</PageHeader.Title>
        </PageHeader.TitleArea>
        <PageHeader.TrailingAction hidden={false}>
          <Button ref={buttonRef} variant="primary" onClick={() => setIsDialogOpen(true)}>
            Bíblia
          </Button>
        </PageHeader.TrailingAction>
        <PageHeader.Actions>
          <IconButton icon={ThreeBarsIcon} />
        </PageHeader.Actions>
      </PageHeader>
    </>
  );
}
