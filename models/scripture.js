import database from "infra/database.js";
import { NotFoundError } from "infra/errors.js";

async function findBookByPath(path) {
  const [, language, version, testament, bookId] = path.split("/");
  const basePath = `${language}/${version}/${testament}`;

  const books = await database.firestoreCollection(basePath);
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    throw new NotFoundError({
      message: "Book not found.",
      action: "Verify if the book name is correct.",
    });
  }

  const bookPath = `${basePath}/${bookId}/chapters`;
  const chapters = await database.firestoreCollection(bookPath);

  book.chapters = chapters;

  return book;
}

const scripture = {
  findBookByPath,
};

export default scripture;
