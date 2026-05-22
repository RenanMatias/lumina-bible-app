import React from "react";
import { Heading } from "@primer/react";

import { MainTemplate } from "templates/MainTemplate/index.jsx";
import BookContent from "components/BookContent/index.jsx";
import scripture from "models/scripture.js";

export default function BookPage({ bookFounded, error }) {
  if (error) {
    return (
      <MainTemplate>
        <Heading>Ocorreu um erro ao carregar o livro</Heading>
        <p>{error.message}</p>
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
