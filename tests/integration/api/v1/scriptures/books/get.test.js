import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";
import webserver from "infra/webserver.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
  await orchestrator.seedScriptureDb();
});

describe("GET /api/v1/scriptures/books", () => {
  describe("Anonymous user", () => {
    test("Without query strings", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/scriptures/books`);
      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "Os parâmetros de idioma e versão da Bíblia são obrigatórios para acessar este recurso.",
        action: "Verifique se os parâmetros de idioma e versão da Bíblia estão presentes na requisição.",
        status_code: 400,
      });
    });

    test("Without version query string", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/scriptures/books?language=pt-br`);
      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "Os parâmetros de idioma e versão da Bíblia são obrigatórios para acessar este recurso.",
        action: "Verifique se os parâmetros de idioma e versão da Bíblia estão presentes na requisição.",
        status_code: 400,
      });
    });

    test("Without language query string", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/scriptures/books?version=cnbb`);
      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "Os parâmetros de idioma e versão da Bíblia são obrigatórios para acessar este recurso.",
        action: "Verifique se os parâmetros de idioma e versão da Bíblia estão presentes na requisição.",
        status_code: 400,
      });
    });

    test("With nonexistent language", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/scriptures/books?language=nonexistent&version=cnbb`);
      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O livro ou a versão da Bíblia informados não foram encontrados no sistema.",
        action: "Verifique se os parâmetros de idioma e versão da Bíblia estão digitados corretamente.",
        status_code: 404,
      });
    });

    test("With nonexistent version", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/scriptures/books?language=pt-br&version=nonexistent`);
      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O livro ou a versão da Bíblia informados não foram encontrados no sistema.",
        action: "Verifique se os parâmetros de idioma e versão da Bíblia estão digitados corretamente.",
        status_code: 404,
      });
    });

    test("With existent language and version", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/scriptures/books?language=pt-br&version=cnbb`);
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual([
        {
          id: responseBody[0].id,
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
          created_at: responseBody[0].created_at,
          updated_at: responseBody[0].updated_at,
        },
        {
          id: responseBody[1].id,
          language: "pt-br",
          version: "cnbb",
          testament: "Novo Testamento",
          book: "Jo",
          name: "Evangelho de São João",
          short_name: "João",
          author: "João",
          date_written: null,
          division: null,
          original_language: null,
          summary: null,
          created_at: responseBody[1].created_at,
          updated_at: responseBody[1].updated_at,
        },
      ]);

      expect(uuidVersion(responseBody[0].id)).toBe(4);
      expect(Date.parse(responseBody[0].created_at)).not.toBeNaN();
      expect(Date.parse(responseBody[0].updated_at)).not.toBeNaN();

      expect(uuidVersion(responseBody[1].id)).toBe(4);
      expect(Date.parse(responseBody[1].created_at)).not.toBeNaN();
      expect(Date.parse(responseBody[1].updated_at)).not.toBeNaN();
    });
  });
});
