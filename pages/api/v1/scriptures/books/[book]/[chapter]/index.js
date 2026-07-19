import controller from "infra/controller";
import { createRouter } from "next-connect";
import scripture from "models/scripture.js";
import { NotFoundError } from "infra/errors.js";

export default createRouter()
  .use(controller.injectAnonymousOrUser)
  .get(controller.canRequest("read:scripture"), getHandler)
  .handler(controller.errorHandlers);

async function getHandler(request, response) {
  const userTryingToGet = request.context.user;
  const bookId = request.query.book;
  const chapterId = request.query.chapter;

  let immersiveReading = false;
  if (userTryingToGet.features.includes("read:scripture:immersive_reading")) {
    immersiveReading = request.query.immersive_reading === "true";
  }

  const bookObject = await scripture.findOneBookById(bookId);
  const chaptersObject = await scripture.getAllChaptersFromBook(bookId);
  const chaptersData = chaptersObject.map(({ id, number }) => ({ id, number }));

  const chapterObject = await scripture.findOneChapterById(chapterId);

  if (String(chapterObject.book_id) !== String(bookObject.id)) {
    throw new NotFoundError({
      message: "O capítulo solicitado não pertence ao livro informado.",
      action: "Verifique se este capítulo pertence ao livro correto.",
    });
  }

  delete chapterObject.book_id;
  chapterObject.book = {
    id: bookObject.id,
    short_name: bookObject.book,
    name: bookObject.name,
    testament: bookObject.testament,
    version: bookObject.version,
    total_chapters: chaptersObject.length,
    chapters: chaptersData,
  };

  const pericopesFound = await scripture.findPericopesByChapterId(chapterId);

  for (const pericope of pericopesFound) {
    const versesFound = await scripture.findVersesByPericopeId(pericope.id);

    pericope.verses = versesFound.map(({ paragraph, number, verse }) => {
      verse = scripture.replaceVersePlaceholders(verse, userTryingToGet, immersiveReading);
      return { paragraph, number: parseInt(number), text: verse };
    });
  }

  chapterObject.pericopes = pericopesFound;

  return response.status(200).json(chapterObject);
}
