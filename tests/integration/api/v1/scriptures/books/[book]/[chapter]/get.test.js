import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
  await orchestrator.seedScriptureDb();
});

describe("GET /api/v1/scriptures/books/[book]/[chapter]", () => {
  describe("Anonymous user", () => {
    test("With nonexistent chapter", async () => {
      const book = await orchestrator.getFirstBook();
      const nonexistentChapterId = "a7d4f1c2-9b3e-4e68-8c5a-2f9d7b6e1a0c";

      const response = await fetch(`http://localhost:3000/api/v1/scriptures/books/${book.id}/${nonexistentChapterId}`);
      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O capítulo informado não foi encontrado no sistema.",
        action: "Verifique se o capítulo existe e se o id do capítulo está correto.",
        status_code: 404,
      });
    });

    test("With existent chapter", async () => {
      const book = await orchestrator.getFirstBook();
      const chapter = await orchestrator.getFirstChaptersOfBook(book.id);

      const response = await fetch(`http://localhost:3000/api/v1/scriptures/books/${book.id}/${chapter.id}`);
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: chapter.id,
        book_id: book.id,
        number: 1,
        created_at: chapter.created_at.toISOString(),
        updated_at: chapter.updated_at.toISOString(),
        pericopes: [
          {
            id: responseBody.pericopes[0].id,
            chapter_id: chapter.id,
            title: "Title Pericope",
            verses: [
              { 1: "text Meus filhinhos text Meus filhinhos text" },
              { 2: "text vós text" },
              { 3: "text estejais text" },
              { 4: "text vos text" },
              { 5: "text Amados text" },
            ],
            created_at: responseBody.pericopes[0].created_at,
            updated_at: responseBody.pericopes[0].updated_at,
          },
        ],
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
    });
  });

  describe("Default user", () => {
    test("With nonexistent book", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(createdUser.id);

      const book = await orchestrator.getFirstBook();
      const nonexistentChapterId = "a7d4f1c2-9b3e-4e68-8c5a-2f9d7b6e1a0c";

      const response = await fetch(`http://localhost:3000/api/v1/scriptures/books/${book.id}/${nonexistentChapterId}`, {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });

      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O capítulo informado não foi encontrado no sistema.",
        action: "Verifique se o capítulo existe e se o id do capítulo está correto.",
        status_code: 404,
      });
    });

    test("With existent book", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(createdUser.id);

      const book = await orchestrator.getFirstBook();
      const chapter = await orchestrator.getFirstChaptersOfBook(book.id);

      const response = await fetch(`http://localhost:3000/api/v1/scriptures/books/${book.id}/${chapter.id}`, {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: chapter.id,
        book_id: book.id,
        number: 1,
        created_at: chapter.created_at.toISOString(),
        updated_at: chapter.updated_at.toISOString(),
        pericopes: [
          {
            id: responseBody.pericopes[0].id,
            chapter_id: chapter.id,
            title: "Title Pericope",
            verses: [
              { 1: "text Meus filhinhos text Meus filhinhos text" },
              { 2: "text vós text" },
              { 3: "text estejais text" },
              { 4: "text vos text" },
              { 5: "text Amados text" },
            ],
            created_at: responseBody.pericopes[0].created_at,
            updated_at: responseBody.pericopes[0].updated_at,
          },
        ],
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
    });

    describe("With immersive reading activated", () => {
      test("A man", async () => {
        const createdUser = await orchestrator.createUser({
          biological_sex: "male",
        });
        await orchestrator.activateUser(createdUser);
        const sessionObject = await orchestrator.createSession(createdUser.id);

        const book = await orchestrator.getFirstBook();
        const chapter = await orchestrator.getFirstChaptersOfBook(book.id);

        const response = await fetch(
          `http://localhost:3000/api/v1/scriptures/books/${book.id}/${chapter.id}?immersive_reading=true`,
          {
            headers: {
              Cookie: `session_id=${sessionObject.token}`,
            },
          },
        );

        expect(response.status).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toEqual({
          id: chapter.id,
          book_id: book.id,
          number: 1,
          created_at: chapter.created_at.toISOString(),
          updated_at: chapter.updated_at.toISOString(),
          pericopes: [
            {
              id: responseBody.pericopes[0].id,
              chapter_id: chapter.id,
              title: "Title Pericope",
              verses: [
                { 1: `text ${createdUser.firstname} text ${createdUser.firstname} text` },
                { 2: "text ti text" },
                { 3: "text estejas text" },
                { 4: "text te text" },
                { 5: "text Amado text" },
              ],
              created_at: responseBody.pericopes[0].created_at,
              updated_at: responseBody.pericopes[0].updated_at,
            },
          ],
        });

        expect(uuidVersion(responseBody.id)).toBe(4);
        expect(Date.parse(responseBody.created_at)).not.toBeNaN();
        expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      });

      test("A woman", async () => {
        const createdUser = await orchestrator.createUser({
          biological_sex: "female",
        });
        await orchestrator.activateUser(createdUser);
        const sessionObject = await orchestrator.createSession(createdUser.id);

        const book = await orchestrator.getFirstBook();
        const chapter = await orchestrator.getFirstChaptersOfBook(book.id);

        const response = await fetch(
          `http://localhost:3000/api/v1/scriptures/books/${book.id}/${chapter.id}?immersive_reading=true`,
          {
            headers: {
              Cookie: `session_id=${sessionObject.token}`,
            },
          },
        );

        expect(response.status).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toEqual({
          id: chapter.id,
          book_id: book.id,
          number: 1,
          created_at: chapter.created_at.toISOString(),
          updated_at: chapter.updated_at.toISOString(),
          pericopes: [
            {
              id: responseBody.pericopes[0].id,
              chapter_id: chapter.id,
              title: "Title Pericope",
              verses: [
                { 1: `text ${createdUser.firstname} text ${createdUser.firstname} text` },
                { 2: "text ti text" },
                { 3: "text estejas text" },
                { 4: "text te text" },
                { 5: "text Amada text" },
              ],
              created_at: responseBody.pericopes[0].created_at,
              updated_at: responseBody.pericopes[0].updated_at,
            },
          ],
        });

        expect(uuidVersion(responseBody.id)).toBe(4);
        expect(Date.parse(responseBody.created_at)).not.toBeNaN();
        expect(Date.parse(responseBody.updated_at)).not.toBeNaN();
      });
    });
  });
});
