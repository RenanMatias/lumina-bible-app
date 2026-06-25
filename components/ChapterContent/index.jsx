import React from "react";
import { Breadcrumbs, Stack, Heading, Text, Pagination } from "@primer/react";
import { SkeletonText } from "@primer/react/experimental";

import styles from "./styles.module.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@primer/octicons-react";

export default function ChapterContent({ chapter }) {
  const testament = chapter?.book.testament === "Novo Testamento" ? "novo" : "antigo";
  const chapterNumber = chapter?.number;
  const bookId = chapter?.book.id;
  const bookShortName = chapter?.book.short_name;
  const pericopes = chapter?.pericopes.reduce((acc, { title, verses }) => {
    acc.push({ title, verses });
    return acc;
  }, []);

  const handlePageChange = (event, page) => {
    const selectedChapter = chapter?.book.chapters.find((c) => c.number === page);
    if (selectedChapter) {
      window.location.href = `/biblia/livro/${bookId}/${selectedChapter.id}`;
    }
  };

  return (
    <>
      <Stack gap="spacious">
        <Breadcrumbs>
          <Breadcrumbs.Item href="/biblia/">Bíblia</Breadcrumbs.Item>
          <Breadcrumbs.Item href={`/biblia/testamento/${testament}`}>
            {chapter?.book.testament ?? <SkeletonText />}
          </Breadcrumbs.Item>
          <Breadcrumbs.Item href={`/biblia/livro/${bookId}`}>{bookShortName ?? <SkeletonText />}</Breadcrumbs.Item>
          <Breadcrumbs.Item selected>Capítulo {chapterNumber ?? <SkeletonText />}</Breadcrumbs.Item>
        </Breadcrumbs>
        <div className={"bible-reader-container"}>
          <Stack>
            {pericopes?.length ? (
              pericopes.map(({ title, verses }, pericopeIndex) => (
                <React.Fragment key={`${pericopeIndex}-${title ?? "pericope"}`}>
                  <Heading className={styles.pericope}>{title}</Heading>
                  <div className={styles.verseContainer}>
                    {verses.map(({ number, text }) => (
                      <React.Fragment key={number}>
                        <Text as="span" className={styles.verseNumber}>
                          {number}
                        </Text>
                        <Text as="span" className={styles.verseText}>
                          {text}
                        </Text>
                      </React.Fragment>
                    ))}
                  </div>
                </React.Fragment>
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
        <Heading
          as="h1"
          style={{
            letterSpacing: "-0.02em",
            alignSelf: "center",
            color: "var(--data-blue-color-emphasis)",
          }}
        >
          Capítulos
        </Heading>
        <Pagination
          pageCount={chapter?.book.total_chapters}
          currentPage={chapter?.number}
          onPageChange={handlePageChange}
          renderPage={({ key, children, className, ...props }) => {
            const Component = props.href ? "a" : "span";

            if (key === "page-prev") {
              return (
                <Component key={key} className={className} {...props}>
                  <ChevronLeftIcon /> Anterior
                </Component>
              );
            }

            if (key === "page-next") {
              return (
                <Component key={key} className={className} {...props}>
                  Próximo <ChevronRightIcon />
                </Component>
              );
            }

            return (
              <Component key={key} className={className} {...props}>
                {children}
              </Component>
            );
          }}
        />
      </Stack>
    </>
  );
}
