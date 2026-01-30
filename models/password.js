import bcryptjs from "bcryptjs";

const pepper = process.env.PASSWORD_PEPPER;

async function hash(password) {
  const rounds = process.env.NODE_ENV === "production" ? 14 : 1;
  const saltedPassword = password + pepper;
  return await bcryptjs.hash(saltedPassword, rounds);
}

async function compare(providedPassword, storedPassword) {
  return await bcryptjs.compare(providedPassword + pepper, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
