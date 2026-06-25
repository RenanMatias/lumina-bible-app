import React from "react";
import { Stack, Heading, Banner } from "@primer/react";

import BookList from "../BookList/index.jsx";
import styles from "./styles.module.css";

export default function BibleContent({ content, error }) {
  const groupedBooks = content.reduce((acc, { testament, id, name }) => {
    if (!acc[testament]) acc[testament] = [];
    acc[testament].push({ id, name });
    return acc;
  }, {});

  return (
    <Stack gap="spacious">
      <div className={"bible-reader-container"}>
        <Stack>
          <Heading as="h1" className={styles.title}>
            Índice
          </Heading>
          {error ? (
            <Banner aria-label="Critical" variant="critical" title="Error">
              {error.message}
            </Banner>
          ) : (
            <BookList books={groupedBooks} />
          )}
        </Stack>
      </div>
    </Stack>
  );
}
