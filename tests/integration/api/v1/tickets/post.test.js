import orchestrator from "tests/orchestrator.js";
import webserver from "infra/webserver.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/tickets", () => {
  describe("Anonymous user", () => {
    test("Without type", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Subject of the ticket",
          message: "Message of the ticket",
          email: "contact@email.com",
        }),
      });

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        message: "O campo type é obrigatório. Os valores aceitos são: bug, feature_request ou other.",
        action: 'Verifique se o campo "type" foi enviado e está com um valor válido (bug, feature_request ou other)',
        name: "ValidationError",
        status_code: 400,
      });
    });

    test("Without subject", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "bug",
          message: "Message of the ticket",
          email: "contact@email.com",
        }),
      });

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        message: "O campo subject é obrigatório.",
        action: 'verifique se o campo "subject".',
        name: "ValidationError",
        status_code: 400,
      });
    });

    test("Without message", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "bug",
          subject: "Subject of the ticket",
          email: "contact@email.com",
        }),
      });

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        action: 'verifique se o campo "message".',
        message: "O campo message é obrigatório.",
        name: "ValidationError",
        status_code: 400,
      });
    });

    test("valid", async () => {
      const response = await fetch(`${webserver.origin}/api/v1/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "bug",
          subject: "Subject of the ticket",
          message: "Message of the ticket",
          email: "contact@email.com",
        }),
      });

      expect(response.status).toBe(201);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        number: responseBody.number,
        title: "Subject of the ticket",
        body: `**Email do remetente:** contact@email.com\n\n**Mensagem:**\nMessage of the ticket`,
        labels: ["bug"],
        state: responseBody.state,
        url: responseBody.url,
      });
    });
  });

  describe("Default user", () => {
    test("Without type", async () => {
      const createdUser = await orchestrator.createUser();
      const activatedUser = await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(activatedUser);

      const response = await fetch(`${webserver.origin}/api/v1/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
        body: JSON.stringify({
          subject: "Subject of the ticket",
          message: "Message of the ticket",
          email: activatedUser.email,
        }),
      });

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        message: "O campo type é obrigatório. Os valores aceitos são: bug, feature_request ou other.",
        action: 'Verifique se o campo "type" foi enviado e está com um valor válido (bug, feature_request ou other)',
        name: "ValidationError",
        status_code: 400,
      });
    });

    test("Without subject", async () => {
      const createdUser = await orchestrator.createUser();
      const activatedUser = await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(activatedUser);

      const response = await fetch(`${webserver.origin}/api/v1/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
        body: JSON.stringify({
          type: "bug",
          message: "Message of the ticket",
          email: activatedUser.email,
        }),
      });

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        message: "O campo subject é obrigatório.",
        action: 'verifique se o campo "subject".',
        name: "ValidationError",
        status_code: 400,
      });
    });

    test("Without message", async () => {
      const createdUser = await orchestrator.createUser();
      const activatedUser = await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(activatedUser);

      const response = await fetch(`${webserver.origin}/api/v1/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
        body: JSON.stringify({
          type: "bug",
          subject: "Subject of the ticket",
          email: activatedUser.email,
        }),
      });

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        action: 'verifique se o campo "message".',
        message: "O campo message é obrigatório.",
        name: "ValidationError",
        status_code: 400,
      });
    });

    test("valid", async () => {
      const createdUser = await orchestrator.createUser();
      const activatedUser = await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(activatedUser);

      const response = await fetch(`${webserver.origin}/api/v1/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `session_id=${sessionObject.token}`,
        },
        body: JSON.stringify({
          type: "bug",
          subject: "Subject of the ticket",
          message: "Message of the ticket",
          email: activatedUser.email,
        }),
      });

      expect(response.status).toBe(201);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        number: responseBody.number,
        title: "Subject of the ticket",
        body: `**Email do remetente:** ${activatedUser.email}\n\n**Mensagem:**\nMessage of the ticket`,
        labels: ["bug"],
        state: responseBody.state,
        url: responseBody.url,
      });
    });
  });
});
