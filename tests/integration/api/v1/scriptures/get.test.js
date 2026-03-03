import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/scriptures", () => {
  describe("Anonymous user", () => {
    test("Retrieving all scriptures", async () => {
      const response = await fetch("http://localhost:3000/api/v1/scriptures");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
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
    });
  });
});
