import React from "react";
import { Stack, Link } from "@primer/react";
import Image from "next/image";

import styles from "./styles.module.css";

function FooterBrand({ className }) {
  return (
    <Stack direction="horizontal" align="center" gap="condensed" className={className}>
      <Link href="/" aria-label="Voltar para a página inicial">
        <Image src="/brand/white.png" alt="Lumina Escritura Logo" width={42} height={32} className={styles.img} />
      </Link>
      <span className={styles.copy}>&copy; {new Date().getFullYear()} Lumina Escritura</span>
    </Stack>
  );
}

export default function Footer() {
  return (
    <Stack
      direction={{ narrow: "vertical", regular: "horizontal", wide: "horizontal" }}
      align="center"
      gap="spacious"
      justify="center"
    >
      <FooterBrand className={styles.brand} />

      <Stack direction="horizontal" className={styles.nav}>
        <Link href="/status">Status</Link>
        <Link href="/use-term">Termo de Uso</Link>
      </Stack>
    </Stack>
  );
}
