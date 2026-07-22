import React from "react";
import { Breadcrumbs, Stack, Heading, Text, Pagination } from "@primer/react";
import { SkeletonText } from "@primer/react/experimental";

import styles from "./styles.module.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@primer/octicons-react";

function sanitizeVerseHtml(rawText) {
  if (typeof rawText !== "string") {
    return "";
  }

  if (typeof window === "undefined") {
    return rawText;
  }

  const allowedTags = new Set(["I", "EM", "B", "STRONG", "U", "BR", "SUP", "SUB"]);
  const blockedTags = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "LINK", "META"]);

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawText, "text/html");

  const sanitizeNode = (node) => {
    const children = Array.from(node.childNodes);

    for (const child of children) {
      if (child.nodeType === 8) {
        child.remove();
        continue;
      }

      if (child.nodeType !== 1) {
        continue;
      }

      if (blockedTags.has(child.tagName)) {
        child.remove();
        continue;
      }

      if (!allowedTags.has(child.tagName)) {
        const fragment = doc.createDocumentFragment();

        while (child.firstChild) {
          fragment.appendChild(child.firstChild);
        }

        child.replaceWith(fragment);
        sanitizeNode(node);
        continue;
      }

      while (child.attributes.length > 0) {
        child.removeAttribute(child.attributes[0].name);
      }

      sanitizeNode(child);
    }
  };

  sanitizeNode(doc.body);
  return doc.body.innerHTML;
}

export default function ChapterContent({ chapter }) {
  const testamentName = chapter?.book.testament;
  const testamentSlug =
    testamentName === "Novo Testamento"
      ? "novo"
      : testamentName === "Antigo Testamento"
        ? "antigo"
        : testamentName === "Velho Testamento"
          ? "antigo"
          : undefined;
  const chapterNumber = chapter?.number;
  const bookId = chapter?.book.id;
  const bookShortName = chapter?.book.short_name;
  const pericopes = chapter?.pericopes.reduce((acc, { title, verses }) => {
    acc.push({ title, verses });
    return acc;
  }, []);

  const groupedVerses = pericopes.map(({ title, verses }) => ({
    title,
    verses: verses.reduce((acc, { paragraph, number, text }) => {
      if (!acc[paragraph]) {
        acc[paragraph] = [];
      }
      acc[paragraph].push({ number, text });
      return acc;
    }, {}),
  }));

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
          <Breadcrumbs.Item href={testamentSlug ? `/biblia/testamento/${testamentSlug}` : undefined}>
            {testamentName ?? <SkeletonText />}
          </Breadcrumbs.Item>
          <Breadcrumbs.Item href={`/biblia/livro/${bookId}`}>{bookShortName ?? <SkeletonText />}</Breadcrumbs.Item>
          <Breadcrumbs.Item selected>Capítulo {chapterNumber ?? <SkeletonText />}</Breadcrumbs.Item>
        </Breadcrumbs>
        <div className={"bible-reader-container"}>
          <Stack>
            {pericopes?.length ? (
              pericopes.map(({ title }, pericopeIndex) => (
                <React.Fragment key={`${pericopeIndex}-${title ?? "pericope"}`}>
                  <Heading className={styles.pericope}>{title}</Heading>
                  <div className={styles.verseContainer}>
                    {Object.entries(groupedVerses[pericopeIndex].verses).map(([paragraph, paragraphVerses]) => (
                      <p key={paragraph} className={styles.verseParagraph}>
                        {paragraphVerses.map(({ number, text }) => (
                          <React.Fragment key={number}>
                            <Text as="span" className={styles.verseNumber}>
                              {" "}
                              {number}
                            </Text>
                            <Text as="span" className={styles.verseText}>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: sanitizeVerseHtml(text),
                                }}
                              />
                            </Text>
                          </React.Fragment>
                        ))}
                      </p>
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
