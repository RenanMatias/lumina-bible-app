import controller from "infra/controller";
import { createRouter } from "next-connect";
import scripture from "models/scripture.js";

export default createRouter()
  .use(controller.injectAnonymousOrUser)
  .get(controller.canRequest("read:scripture"), getHandler)
  .handler(controller.errorHandlers);

async function getHandler(request, response) {
  const userTryingToGet = request.context.user;
  const chapter = request.query.chapter;

  let immersiveReading = false;
  if (userTryingToGet.features.includes("read:scripture:immersive_reading")) {
    immersiveReading = request.query.immersive_reading === "true";
  }

  const chaptersObject = await scripture.findOneChapterById(chapter);

  const pericopesFound = await scripture.findPericopesByChapterId(chapter);

  for (const pericope of pericopesFound) {
    const versesFound = await scripture.findVersesByPericopeId(pericope.id);

    pericope.verses = versesFound.map(({ number, verse }) => {
      verse = scripture.replaceVersePlaceholders(verse, userTryingToGet, immersiveReading);
      return { [parseInt(number)]: verse };
    });
  }

  chaptersObject.pericopes = pericopesFound;

  return response.status(200).json(chaptersObject);
}
