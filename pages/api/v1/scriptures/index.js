import controller from "infra/controller";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  response.status(200).json({
    new_testament: {
      name: "Novo Testamento",
      abreviation: "NT",
      books: [
        {
          id: 1,
          name: "",
          osis_id: "",
          category: "",
          num_chapters: 0,
          num_verses: 0,
          author: "",
          date_written: "",
          location_written: "",
          summary: "",
        },
      ],
    },
  });
}
