import React from "react";
import { Breadcrumbs, Stack, Heading, Text } from "@primer/react";
import { SkeletonText } from "@primer/react/experimental";

import styles from "./styles.module.css";

export default function ChapterContent({ chapter }) {
  const testament = chapter?.book.testament === "Novo Testamento" ? "Novo Testamento" : "Antigo Testamento";
  const chapterNumber = chapter?.number;
  const bookId = chapter?.book.id;
  const bookShortName = chapter?.book.short_name;
  const pericopes = chapter?.pericopes.reduce((acc, { title, verses }) => {
    acc.push({ title, verses });
    return acc;
  }, []);

  console.log(pericopes);

  return (
    <>
      <Stack gap="spacious">
        <Breadcrumbs>
          <Breadcrumbs.Item href="/biblia/">Bíblia</Breadcrumbs.Item>
          <Breadcrumbs.Item href={`/biblia/testamento/${testament}`}>{testament ?? <SkeletonText />}</Breadcrumbs.Item>
          <Breadcrumbs.Item href={`/biblia/livro/${bookId}`}>{bookShortName ?? <SkeletonText />}</Breadcrumbs.Item>
          <Breadcrumbs.Item selected>Capítulo {chapterNumber ?? <SkeletonText />}</Breadcrumbs.Item>
        </Breadcrumbs>
        <div className={"bible-reader-container"}>
          <Stack>
            {pericopes?.length ? (
              pericopes.map(({ title, verses }) => (
                <>
                  <Heading className={styles.pericope}>{title}</Heading>
                  <div className={styles.verseContainer}>
                    {verses.map(({ number, text }) => (
                      <>
                        <Text as="span" className={styles.verseNumber}>
                          {number}
                        </Text>
                        <Text as="span" className={styles.verseText}>
                          {text}
                        </Text>
                      </>
                    ))}
                  </div>
                </>
              ))
            ) : (
              <>
                <SkeletonText width="120px" />
                <SkeletonText lines={4} />
                <SkeletonText width="120px" />
                <SkeletonText lines={5} />
              </>
            )}
          </Stack>
        </div>
        <Text size="small" style={{ color: "var(--fgColor-disabled)", alignSelf: "end" }}>
          © {chapter?.book.version ?? <SkeletonText width="50%" />}. Todos os direitos reservados.
        </Text>
      </Stack>
    </>
  );
}
