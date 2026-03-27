import controller from "infra/controller";
import { createRouter } from "next-connect";
import scripture from "models/scripture.js";

export default createRouter()
  .use(controller.injectAnonymousOrUser)
  .get(controller.canRequest("read:scripture"), getHandler)
  .handler(controller.errorHandlers);

async function getHandler(request, response) {
  const language = request.query.language;
  const version = request.query.version;

  const booksObject = await scripture.getAllBooks(language, version);

  return response.status(200).json(booksObject);
}
