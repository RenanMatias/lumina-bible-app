import React from "react";
import { Breadcrumbs, Stack, Heading, Text, Button } from "@primer/react";
import { SkeletonText } from "@primer/react/experimental";
import { Literata } from "next/font/google";

import styles from "./styles.module.css";

const literata = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-literata",
});

export default function BookContent({ book }) {
  return (
    <>
      <Stack gap="spacious">
        <Breadcrumbs>
          <Breadcrumbs.Item href="/biblia/">Bíblia</Breadcrumbs.Item>
          <Breadcrumbs.Item href={`/biblia/testamento/${testament}`}>
            {book?.testament ?? <SkeletonText />}
          </Breadcrumbs.Item>
          <Breadcrumbs.Item selected>{book?.name ?? <SkeletonText />}</Breadcrumbs.Item>
        </Breadcrumbs>
        <div className={`${styles.page} ${literata.variable}`}>
          <Stack>
            <Heading className={styles.title}>{book?.name ?? <SkeletonText width="50%" />}</Heading>
            <Text as="p" className={styles.summary}>
              {book?.summary ?? <SkeletonText lines={5} />}
            </Text>
          </Stack>
        </div>
        <Text size="small" style={{ color: "var(--fgColor-disabled)", alignSelf: "end" }}>
          © {book?.version ?? <SkeletonText width="50%" />}. Todos os direitos reservados.
        </Text>
        <Heading
          as="h1"
          style={{
            letterSpacing: "-0.02em",
            alignSelf: "center",
            color: "var(--data-blue-color-emphasis)",
          }}
        >
          {book?.chapters ? "Capítulos" : <SkeletonText width="50%" />}
        </Heading>
        <Stack direction="horizontal" gap="condensed" wrap="wrap" align="center" justify="center">
          {book?.chapters?.length ? (
            book.chapters.map((chapter) => (
              <Button key={chapter.id} variant="invisible" className={styles.chaptersButton}>
                {chapter.number}
              </Button>
            ))
          ) : (
            <SkeletonText width="120px" />
          )}
        </Stack>
      </Stack>
    </>
  );
}
