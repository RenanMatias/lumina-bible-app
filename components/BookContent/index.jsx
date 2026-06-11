import React from "react";
import { Breadcrumbs, Stack, Heading, Text, Button } from "@primer/react";
import { SkeletonText } from "@primer/react/experimental";
import Link from "next/link";

import styles from "./styles.module.css";

export default function BookContent({ book }) {
  const testament = book?.testament === "Novo Testamento" ? "novo" : "antigo";

  return (
    <>
      <Stack gap="spacious">
        <Breadcrumbs>
          <Breadcrumbs.Item href="/biblia/">Bíblia</Breadcrumbs.Item>
          <Breadcrumbs.Item href={`/biblia/testamento/${testament}`}>
            {book?.testament ?? <SkeletonText />}
          </Breadcrumbs.Item>
          <Breadcrumbs.Item selected>{book?.book ?? <SkeletonText />}</Breadcrumbs.Item>
        </Breadcrumbs>
        <div className={"bible-reader-container"}>
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
              <Button
                as={Link}
                href={`/biblia/livro/${book.id}/${chapter.id}`}
                key={chapter.id}
                variant="invisible"
                className={styles.chaptersButton}
              >
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
