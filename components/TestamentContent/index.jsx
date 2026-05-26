import React from "react";
import { ActionList, Stack, Breadcrumbs, Text } from "@primer/react";
import { Literata } from "next/font/google";

import styles from "./styles.module.css";

const literata = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-literata",
});

export default function TestamentContent({ type, content, error }) {
  console.log(content);
  return (
    <>
      <Breadcrumbs>
        <Breadcrumbs.Item href="/biblia/">Bíblia</Breadcrumbs.Item>
        <Breadcrumbs.Item selected>{type}</Breadcrumbs.Item>
      </Breadcrumbs>
      <Stack gap="spacious">
        <div className={`${styles.page} ${literata.variable}`}>
          <Stack>
            {error ? (
              <Text as="p">{error.message}</Text>
            ) : (
              Object.entries(content).map(([testament, books]) => (
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
    </>
  );
}
