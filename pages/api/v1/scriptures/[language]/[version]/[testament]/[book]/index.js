import controller from "infra/controller";
import { createRouter } from "next-connect";
import scripture from "models/scripture.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const url = request.url.split("?")[0];
  const path = url.replace("/api/v1/scriptures", "");
  const bookFound = await scripture.findBookByPath(`${path}/chapters`);

  return response.status(200).json(bookFound);
}
