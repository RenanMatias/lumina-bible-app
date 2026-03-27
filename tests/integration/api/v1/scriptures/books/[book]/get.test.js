import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";
import webserver from "infra/webserver.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
  await orchestrator.seedScriptureDb();
});

describe("GET /api/v1/scriptures/books/[book]", () => {
  describe("Anonymous user", () => {
    test("With nonexistent book", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/scriptures/books/3f9c2b8e-6a1d-4c7f-9b52-8d4e0a7c1f3b`);
      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O livro informado não foi encontrado no sistema.",
        action: "Verifique se o livro existe e se o id do livro está correto.",
        status_code: 404,
      });
    });

    test("With existent book", async () => {
      const book = await orchestrator.getFirstBook();

      const response = await fetch(`http://localhost:3000/api/v1/scriptures/books/${book.id}`);
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        language: "pt-br",
        version: "cnbb",
        testament: "Novo Testamento",
        book: "1Jo",
        name: "Primeira Carta de São João",
        short_name: "1 João",
        author: "João",
        date_written: null,
        division: null,
        original_language: null,
        summary: null,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
        chapters: [
          {
            id: responseBody.chapters[0].id,
            number: 1,
            created_at: responseBody.chapters[0].created_at,
            updated_at: responseBody.chapters[0].updated_at,
          },
          {
            id: responseBody.chapters[1].id,
            number: 2,
            created_at: responseBody.chapters[1].created_at,
            updated_at: responseBody.chapters[1].updated_at,
          },
        ],
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
    });
  });
});
