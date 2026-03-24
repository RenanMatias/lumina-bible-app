import retry from "async-retry";
import { faker } from "@faker-js/faker";

import database from "infra/database.js";
import migrator from "models/migrator.js";
import user from "models/user.js";
import session from "models/session.js";
import activation from "models/activation.js";

const emailHttpUrl = `http://${process.env.EMAIL_HTTP_HOST}:${process.env.EMAIL_HTTP_PORT}`;

async function waitForAllServices() {
  await waitForWebServer();
  await waitForEmailServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (!response.ok) {
        throw new Error("Status page not available");
      }
    }
  }

  async function waitForEmailServer() {
    return retry(fetchEmailPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchEmailPage() {
      const response = await fetch(emailHttpUrl);
      if (!response.ok) {
        throw new Error("Email page not available");
      }
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations();
}

async function seedScriptureDb() {
  const books = await database.query(`
    INSERT INTO 
      scripture_books (language, version, testament, book, name, short_name, author)
    VALUES
      ('pt-br', 'cnbb', 'Novo Testamento', '1Jo', 'Primeira Carta de São João', '1 João', 'João'),
      ('pt-br', 'cnbb', 'Novo Testamento', 'Jo', 'Evangelho de São João', 'João', 'João')
    RETURNING
      *
    ;`);

  const chapters = await database.query({
    text: `
      INSERT INTO 
        scripture_chapters (book_id, number)
      VALUES
        ($1, 1), ($1, 2)
      RETURNING
        *
      ;`,
    values: [books.rows[0].id],
  });

  const pericopes = await database.query({
    text: `
      INSERT INTO 
        scripture_pericopes(chapter_id, title)
      VALUES
        ($1, 'Title Pericope')
      RETURNING
        *
      ;`,
    values: [chapters.rows[0].id],
  });

  await database.query({
    text: `
      INSERT INTO 
        scripture_verses (pericope_id, number, verse)
      VALUES
        ($1, 1, 'text {{name|Meus filhinhos}} text {{name|Meus filhinhos}} text'),
        ($1, 2, 'text {{ti|vós}} text'),
        ($1, 3, 'text {{estejas|estejais}} text'),
        ($1, 4, 'text {{te|vos}} text'),
        ($1, 5, 'text {{Amado|Amada|Amados}} text')
      ;`,
    values: [pericopes.rows[0].id],
  });
}

async function getFirstBook() {
  const results = await database.query(`
    SELECT
      *
    FROM
      scripture_books
    LIMIT
      1
  ;`);

  return results.rows[0];
}

async function getFirstChaptersOfBook(bookId) {
  const results = await database.query({
    text: `
      SELECT
        *
      FROM
        scripture_chapters
      WHERE
        book_id = $1
      LIMIT
        1
      ;`,
    values: [bookId],
  });

  return results.rows[0];
}

async function createUser(userObject) {
  return await user.create({
    username: userObject?.username || faker.internet.username().replace(/[_.-]/g, ""),
    email: userObject?.email || faker.internet.email(),
    password: userObject?.password || "validpassword",
    firstname: userObject?.firstname || faker.person.firstName(),
    lastname: userObject?.lastname || faker.person.lastName(),
    biological_sex: userObject?.biological_sex || null,
  });
}

async function activateUser(inactiveUser) {
  return await activation.activateUserByUserId(inactiveUser.id);
}

async function createSession(userObject) {
  return await session.create(userObject.id);
}

async function deleteAllEmails() {
  await fetch(`${emailHttpUrl}/messages`, {
    method: "DELETE",
  });
}

async function getLastEmail() {
  const emailListResponse = await fetch(`${emailHttpUrl}/messages`);
  const emailListBody = await emailListResponse.json();
  const lastEmailItem = emailListBody.pop();

  if (!lastEmailItem) {
    return null;
  }

  const emailTextResponse = await fetch(`${emailHttpUrl}/messages/${lastEmailItem.id}.plain`);
  const emailTextBody = await emailTextResponse.text();

  lastEmailItem.text = emailTextBody;
  return lastEmailItem;
}

async function extractUUID(text) {
  const match = text.match(/[0-9a-fA-F-]{36}/);
  return match ? match[0] : null;
}

async function addFeaturesToUser(userObject, features) {
  const updatedUser = await user.addFeatures(userObject.id, features);
  return updatedUser;
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  seedScriptureDb,
  getFirstBook,
  getFirstChaptersOfBook,
  createUser,
  activateUser,
  createSession,
  deleteAllEmails,
  getLastEmail,
  extractUUID,
  addFeaturesToUser,
};

export default orchestrator;
