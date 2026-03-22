import database from "infra/database.js";
import { NotFoundError, ValidationError } from "infra/errors.js";

async function getAllBooks(language, version) {
  if (!language || !version) {
    throw new ValidationError({
      message: "Os parâmetros de idioma e versão da Bíblia são obrigatórios para acessar este recurso.",
      action: "Verifique se os parâmetros de idioma e versão da Bíblia estão presentes na requisição.",
    });
  }

  const booksFound = await runSelectQuery(language, version);

  return booksFound;

  async function runSelectQuery(language, version) {
    const results = await database.query({
      text: `
      SELECT
        *
      FROM
        scripture_books
      WHERE
        LOWER(language) = LOWER($1)
        AND LOWER(version) = LOWER($2)
      ;`,
      values: [language, version],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O livro ou a versão da Bíblia informados não foram encontrados no sistema.",
        action: "Verifique se os parâmetros de idioma e versão da Bíblia estão digitados corretamente.",
      });
    }

    return results.rows;
  }
}

async function findOneById(id) {
  const bookFound = await runSelectQuery(id);

  return bookFound;

  async function runSelectQuery(id) {
    const results = await database.query({
      text: `
      SELECT
        *
      FROM
        scripture_books
      WHERE
        id = $1
      LIMIT
        1
      ;`,
      values: [id],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O livro informado não foi encontrado no sistema.",
        action: "Verifique se o livro existe e se o id do livro está correto.",
      });
    }

    return results.rows[0];
  }
}

async function findBook(language, version, book) {
  const bookFound = await runSelectQuery(language, version, book);

  return bookFound;

  async function runSelectQuery(language, version, book) {
    const results = await database.query({
      text: `
      SELECT
        *
      FROM
        scripture_books
      WHERE
        LOWER(language) = LOWER($1)
        AND LOWER(version) = LOWER($2)
        AND LOWER(book) = LOWER($3)
      LIMIT
        1
      ;`,
      values: [language, version, book],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O livro informado não foi encontrado no sistema.",
        action: "Verifique se o livro está digitado corretamente.",
      });
    }

    return results.rows[0];
  }
}

async function getAllChaptersFromBook(bookId) {
  const chaptersFound = await runSelectQuery(bookId);

  return chaptersFound;

  async function runSelectQuery(bookId) {
    const results = await database.query({
      text: `
      SELECT
        id, number, created_at, updated_at
      FROM
        scripture_chapters
      WHERE
        book_id = $1
      ORDER BY
        number ASC
      ;`,
      values: [bookId],
    });

    return results.rows;
  }
}

async function formatChapter(chapters, userObject, immersiveReading) {
  for (const chapter of chapters) {
    for (const pericope of chapter.pericopes) {
      pericope.verses = pericope.verses.map((verse) => replaceVersePlaceholders(verse, userObject, immersiveReading));
    }
  }

  return chapters;
}

function replaceVersePlaceholders(verse, userObject, immersiveReading) {
  const keysToReplace = { name: userObject.firstname, hide: "" };
  const placeholderRegex = /\{\{(.*?)\}\}/g;
  const textsToFormat = verse.match(placeholderRegex);

  if (!textsToFormat) {
    return verse;
  }

  for (const text of textsToFormat) {
    const placeholderContent = text.replace("{{", "").replace("}}", "").trim().split("|");

    let immersiveText;
    if (placeholderContent.length === 3 && userObject.biological_sex === "female") {
      immersiveText = placeholderContent[1].trim();
    } else {
      immersiveText = placeholderContent[0].trim();
    }
    const defaultText = placeholderContent.at(-1).trim();

    if (immersiveReading) {
      const imersiveTextIsKey = Object.hasOwn(keysToReplace, immersiveText);
      if (imersiveTextIsKey) {
        const replacementValue = keysToReplace[immersiveText];
        verse = verse.replace(text, replacementValue);
      } else {
        verse = verse.replace(text, immersiveText);
      }
    } else {
      verse = verse.replace(text, defaultText);
    }
  }

  return verse;
}

const scripture = {
  getAllBooks,
  findOneById,
  findBook,
  getAllChaptersFromBook,
  formatChapter,
};

export default scripture;
