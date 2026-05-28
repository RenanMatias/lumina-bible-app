import React from "react";
import { Stack, Heading, Banner } from "@primer/react";
import { Literata } from "next/font/google";

import BookList from "../BookList/index.jsx";
import styles from "./styles.module.css";

const literata = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-literata",
});

export default function BookContent({ content, error }) {
  const groupedBooks = content.reduce((acc, { testament, id, name }) => {
    if (!acc[testament]) acc[testament] = [];
    acc[testament].push({ id, name });
    return acc;
  }, {});

  return (
    <Stack gap="spacious">
      <div className={`${styles.page} ${literata.variable}`}>
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
