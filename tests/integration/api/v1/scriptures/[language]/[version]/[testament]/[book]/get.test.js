import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/scriptures/[language]/[version]/[testament]/[book]", () => {
  describe("Anonymous user", () => {
    test("With nonexistent book", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/scriptures/pt-br/cnbb/new-testament/nonexistent-book",
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
      const response = await fetch(
        "http://localhost:3000/api/v1/scriptures/pt-br/cnbb/new-testament/1Jo",
      );
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
    });
  });
});
