import { Client } from "pg";
import { ServiceError } from "./errors.js";
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  getDocs,
} from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    const serviceErrorObject = new ServiceError({
      message: "Connection error with the database or query failed.",
      cause: error,
    });
    throw serviceErrorObject;
  } finally {
    await client?.end();
  }
}

async function firestoreCollection(path) {
  try {
    const { db } = getNewFirebaseClient();
    const colRef = collection(db, path);
    const snap = await getDocs(colRef);

    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    throw new ServiceError({
      message: "Erro ao acessar a coleção no Firestore.",
      cause: error,
    });
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  await client.connect();

  return client;
}

function getNewFirebaseClient() {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  if (process.env.NODE_ENV === "development") {
    if (!db._emulatorConnected) {
      connectFirestoreEmulator(db, "127.0.0.1", 8080);
      connectAuthEmulator(auth, "http://127.0.0.1:9099");
      db._emulatorConnected = true;
      console.log("🛠️ Emulator working");
    }
  }

  return { db, auth };
}

const database = {
  query,
  getNewClient,
  firestoreCollection,
};

export default database;

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
