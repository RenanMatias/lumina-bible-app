import React from "react";
import { Stack, Breadcrumbs, Banner } from "@primer/react";

import BookList from "../BookList/index.jsx";

export default function TestamentContent({ type, content, error }) {
  const groupedBooks = content.reduce((acc, { testament, id, name }) => {
    if (!acc[testament]) acc[testament] = [];
    acc[testament].push({ id, name });
    return acc;
  }, {});

  return (
    <>
      <Stack gap="spacious">
        <Breadcrumbs>
          <Breadcrumbs.Item href="/biblia/">Bíblia</Breadcrumbs.Item>
          <Breadcrumbs.Item selected>{type}</Breadcrumbs.Item>
        </Breadcrumbs>
        <div className={"bible-reader-container"}>
          <Stack>
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
    </>
  );
}
