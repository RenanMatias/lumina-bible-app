import controller from "infra/controller";
import { createRouter } from "next-connect";
import scripture from "models/scripture.js";

const router = createRouter();

router.use(controller.injectAnonymousOrUser);
router.get(controller.canRequest("read:scripture"), getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const book = request.query.book;

  const bookObject = await scripture.findOneById(book);
  const chaptersFound = await scripture.getAllChaptersFromBook(bookObject.id);
  bookObject.chapters = chaptersFound;

  return response.status(200).json(bookObject);
}
