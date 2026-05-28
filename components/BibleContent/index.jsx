import React from "react";
import { ActionList, Stack, Heading, Banner } from "@primer/react";
import { Literata } from "next/font/google";

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
            Object.entries(groupedBooks).map(([testament, books]) => (
              <div key={testament}>
                <ActionList>
                  <ActionList.GroupHeading as="h2" className={styles.h2}>
                    {testament}
                  </ActionList.GroupHeading>
                  {books.map(({ id, name }) => (
                    <ActionList.LinkItem href={`/biblia/livro/${id}`} key={id}>
                      {name}
                    </ActionList.LinkItem>
                  ))}
                </ActionList>
              </div>
            ))
          )}
        </Stack>
      </div>
    </Stack>
  );
}
