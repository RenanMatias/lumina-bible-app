import Head from "next/head";
import { PageLayout, Header, Text, Stack, Link } from "@primer/react";
import styles from "./index.module.css";

const contentWidthClasses = {
  small: styles.smallContent,
};

export default function DefaultLayout({ children, metadata = {}, contentWidth }) {
  const extraContentClassName = contentWidthClasses[contentWidth];

  return (
    <>
      <Head>
        <title>{metadata.title ? `${metadata.title} · Lumina Escritura` : "Lumina Escritura"}</title>

        {metadata.description && <meta name="description" content={metadata.description} />}
      </Head>
      <Header>
        <Header.Item full>
          <Header.Link href="/">Lumina Escritura</Header.Link>
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
