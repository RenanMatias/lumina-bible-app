import controller from "infra/controller";
import { createRouter } from "next-connect";
import scripture from "models/scripture.js";

const router = createRouter();

router.use(controller.injectAnonymousOrUser);
router.get(controller.canRequest("read:scripture"), getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const userTryingToGet = request.context.user;
  const url = request.url.split("?")[0];
  const path = url.replace("/api/v1/scriptures", "");
  const bookFound = await scripture.findBookByPath(`${path}/chapters`);

  let immersiveReading;
  if (userTryingToGet.features.includes("read:scripture:immersive_reading")) {
    immersiveReading = request.query.immersive_reading === "true";
  }
  const chaptersFormated = await scripture.formatChapter(bookFound.chapters, userTryingToGet, immersiveReading);
  bookFound.chapters = chaptersFormated;

  return response.status(200).json(bookFound);
}
