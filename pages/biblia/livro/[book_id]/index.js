import React from "react";
import { Banner } from "@primer/react";

import { MainTemplate } from "templates/MainTemplate/index.jsx";
import BookContent from "components/BookContent/index.jsx";
import scripture from "models/scripture.js";

export default function BookPage({ bookFounded, error }) {
  if (error) {
    return (
      <MainTemplate>
        <Banner variant="critical" title="Livro não encontrado" description={error.message} />
      </MainTemplate>
    );
  }

  return (
    <MainTemplate>
      <BookContent book={bookFounded} />
    </MainTemplate>
  );
}

export async function getServerSideProps(context) {
  const { book_id } = context.params;

  try {
    const bookFounded = await scripture.findOneBookById(book_id);
    const chaptersFound = await scripture.getAllChaptersFromBook(bookFounded.id);

    bookFounded.chapters = chaptersFound;

    if (!bookFounded) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        bookFounded: JSON.parse(JSON.stringify(bookFounded)),
      },
    };
  } catch (error) {
    return {
      props: {
        error: JSON.parse(JSON.stringify(error)),
      },
    };
  }
}
