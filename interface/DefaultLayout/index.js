import Head from "next/head";
import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { PageLayout, Header, Text, Stack, Link, Button } from "@primer/react";
import styles from "./index.module.css";

const NavigationDialog = dynamic(() => import("components/NavigationDialog/index.jsx"), { ssr: false });

const contentWidthClasses = {
  small: styles.smallContent,
};

export default function DefaultLayout({ children, metadata = {}, contentWidth }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasOpenedDialog, setHasOpenedDialog] = useState(false);
  const buttonRef = useRef(null);
  const extraContentClassName = contentWidthClasses[contentWidth];
  const onDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {hasOpenedDialog ? (
        <NavigationDialog isOpen={isDialogOpen} onClose={onDialogClose} returnFocusRef={buttonRef} />
      ) : null}
      <Head>
        <title>{metadata.title ? `${metadata.title} · Lumina Escritura` : "Lumina Escritura"}</title>

        {metadata.description && <meta name="description" content={metadata.description} />}
      </Head>
      <Header>
        <Header.Item full>
          <Stack direction="horizontal" spacing={3}>
            <Header.Link href="/">Lumina Escritura</Header.Link>
            <Button
              ref={buttonRef}
              variant="primary"
              onClick={() => {
                setHasOpenedDialog(true);
                setIsDialogOpen(true);
              }}
            >
              Bíblia
            </Button>
          </Stack>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/login">Login</Header.Link>
        </Header.Item>
        <Header.Item>
          <Header.Link href="/cadastro">Cadastrar</Header.Link>
        </Header.Item>
      </Header>
      <PageLayout>
        <PageLayout.Content width={contentWidth} className={extraContentClassName}>
          {children}
        </PageLayout.Content>
        <PageLayout.Footer divider="line">
          <Stack direction="horizontal" justify="center" className={styles.nav}>
            <Text size="small">© {new Date().getFullYear()} Lumina Escritura</Text>
            <Link href="/status">Status</Link>
            <Link href="/contato">Contato</Link>
            <Link href="/termos-de-uso">Termos de Uso</Link>
          </Stack>
        </PageLayout.Footer>
      </PageLayout>
    </>
  );
}
