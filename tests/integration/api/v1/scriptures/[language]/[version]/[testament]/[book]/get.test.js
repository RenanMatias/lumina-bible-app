import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/v1/scriptures/[language]/[version]/[testament]/[book]", () => {
  describe("Anonymous user", () => {
    test("With nonexistent book", async () => {
      const response = await fetch("http://localhost:3000/api/v1/scriptures/pt-br/cnbb/new-testament/nonexistent-book");
      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "Book not found.",
        action: "Verify if the book name is correct.",
        status_code: 404,
      });
    });

    test("With existent book", async () => {
      const response = await fetch("http://localhost:3000/api/v1/scriptures/pt-br/cnbb/new-testament/1Jo");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toHaveProperty("id");
      expect(responseBody).toHaveProperty("author");
      expect(responseBody).toHaveProperty("division");
      expect(responseBody).toHaveProperty("date_written");
      expect(responseBody).toHaveProperty("location_written");
      expect(responseBody).toHaveProperty("name");
      expect(responseBody).toHaveProperty("shortName");
      expect(responseBody).toHaveProperty("summary");
      expect(Array.isArray(responseBody.chapters)).toBe(true);

      const chapters = responseBody.chapters;
      const pericopes1 = chapters[0].pericopes;

      const pericope1Title = pericopes1[0].title;
      const verses1 = pericopes1[0].verses;

      expect(pericope1Title).toBe("title 1");
      expect(verses1).toEqual([
        "text Meus filhinhos text Meus filhinhos text",
        "text vós text",
        "text estejais text",
        "text vos text",
      ]);

      const pericope2Title = pericopes1[1].title;
      const verses2 = pericopes1[1].verses;

      expect(pericope2Title).toBe("title 2");
      expect(verses2).toEqual(["text vos text filhinhos text vossos", "text vos textpais text"]);

      const pericopes2 = chapters[1].pericopes;
      const pericope3Title = pericopes2[0].title;
      const verses3 = pericopes2[0].verses;

      expect(pericope3Title).toBe("title");
      expect(verses3).toEqual(["First Name", "Default", "text"]);
    });
  });

  describe("Default user", () => {
    test("With nonexistent book", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(createdUser.id);

      const response = await fetch(
        "http://localhost:3000/api/v1/scriptures/pt-br/cnbb/new-testament/nonexistent-book",
        {
          headers: {
            Cookie: `session_id=${sessionObject.token}`,
          },
        },
      );

      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "Book not found.",
        action: "Verify if the book name is correct.",
        status_code: 404,
      });
    });

    test("With existent book", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(createdUser.id);

      const response = await fetch("http://localhost:3000/api/v1/scriptures/pt-br/cnbb/new-testament/1Jo", {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });

      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody).toHaveProperty("id");
      expect(responseBody).toHaveProperty("author");
      expect(responseBody).toHaveProperty("division");
      expect(responseBody).toHaveProperty("date_written");
      expect(responseBody).toHaveProperty("location_written");
      expect(responseBody).toHaveProperty("name");
      expect(responseBody).toHaveProperty("shortName");
      expect(responseBody).toHaveProperty("summary");
      expect(Array.isArray(responseBody.chapters)).toBe(true);

      const chapters = responseBody.chapters;
      const pericopes = chapters[0].pericopes;
      const verses = pericopes[0].verses;

      expect(verses).toEqual([
        "text Meus filhinhos text Meus filhinhos text",
        "text vós text",
        "text estejais text",
        "text vos text",
      ]);

      const pericope2Title = pericopes[1].title;
      const verses2 = pericopes[1].verses;

      expect(pericope2Title).toBe("title 2");
      expect(verses2).toEqual(["text vos text filhinhos text vossos", "text vos textpais text"]);
      const pericopes2 = chapters[1].pericopes;

      const pericope3Title = pericopes2[0].title;
      const verses3 = pericopes2[0].verses;

      expect(pericope3Title).toBe("title");
      expect(verses3).toEqual(["First Name", "Default", "text"]);
    });

    describe("With immersive reading activated", () => {
      test("A man", async () => {
        const createdUser = await orchestrator.createUser({
          biological_sex: "male",
        });
        await orchestrator.activateUser(createdUser);
        const sessionObject = await orchestrator.createSession(createdUser.id);

        const response = await fetch(
          "http://localhost:3000/api/v1/scriptures/pt-br/cnbb/new-testament/1Jo?immersive_reading=true",
          {
            headers: {
              Cookie: `session_id=${sessionObject.token}`,
            },
          },
        );

        expect(response.status).toBe(200);

        const responseBody = await response.json();
        const chapters = responseBody.chapters;
        const pericopes = chapters[0].pericopes;
        const verses = pericopes[0].verses;

        expect(verses).toEqual([
          `text ${createdUser.firstname} text ${createdUser.firstname} text`,
          "text ti text",
          "text estejas text",
          "text te text",
        ]);

        const pericope2Title = pericopes[1].title;
        const verses2 = pericopes[1].verses;

        expect(pericope2Title).toBe("title 2");
        expect(verses2).toEqual([`text te text ${createdUser.firstname} text teus`, "text te text text"]);

        const pericopes2 = chapters[1].pericopes;
        const pericope3Title = pericopes2[0].title;
        const verses3 = pericopes2[0].verses;

        expect(pericope3Title).toBe("title");
        expect(verses3).toEqual([createdUser.firstname, "Male", ""]);
      });

      test("A woman", async () => {
        const createdUser = await orchestrator.createUser({
          biological_sex: "female",
        });
        await orchestrator.activateUser(createdUser);
        const sessionObject = await orchestrator.createSession(createdUser.id);

        const response = await fetch(
          "http://localhost:3000/api/v1/scriptures/pt-br/cnbb/new-testament/1Jo?immersive_reading=true",
          {
            headers: {
              Cookie: `session_id=${sessionObject.token}`,
            },
          },
        );

        expect(response.status).toBe(200);

        const responseBody = await response.json();
        const chapters = responseBody.chapters;
        const pericopes = chapters[0].pericopes;
        const verses = pericopes[0].verses;

        expect(verses).toEqual([
          `text ${createdUser.firstname} text ${createdUser.firstname} text`,
          "text ti text",
          "text estejas text",
          "text te text",
        ]);

        const pericope2Title = pericopes[1].title;
        const verses2 = pericopes[1].verses;

        expect(pericope2Title).toBe("title 2");
        expect(verses2).toEqual([`text te text ${createdUser.firstname} text teus`, "text te text text"]);

        const pericopes2 = chapters[1].pericopes;
        const pericope3Title = pericopes2[0].title;
        const verses3 = pericopes2[0].verses;

        expect(pericope3Title).toBe("title");
        expect(verses3).toEqual([createdUser.firstname, "Female", ""]);
      });
    });
  });
});
