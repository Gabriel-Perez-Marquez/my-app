import { Client } from "pg";

console.log("Connecting to database...");

export function getClient() {
  const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "1",
    database: "TasksManager",
    port: 5432
  });
  return client;
}

/*
const testConnection = async () => {
  try {
    const res = await getClient().query("SELECT NOW()");
    console.log("DB Connected:", res.rows[0]);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
*/