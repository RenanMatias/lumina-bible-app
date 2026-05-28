import React from "react";
import { ActionList } from "@primer/react";

import styles from "./styles.module.css";

export default function BookList({ books }) {
  return Object.entries(books).map(([testament, books]) => (
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
  ));
}
