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
  findBookByPath,
  formatChapter,
};

export default scripture;
