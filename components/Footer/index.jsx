import React from "react";
import { Stack, Link } from "@primer/react";
import Image from "next/image";

import styles from "./styles.module.css";

export default function Footer() {
  return (
    <Stack direction="vertical">
      <Stack direction="horizontal" align="center">
        <Link href="/" aria-label="Voltar para a página inicial">
          <Image src="/brand/white.png" alt="Lumina Escritura Logo" width={42} height={32} className={styles.img} />
        </Link>
        &copy; {new Date().getFullYear()} Lumina Escritura
      </Stack>
      <Stack>{/* Links */}</Stack>
    </Stack>
  );
}
