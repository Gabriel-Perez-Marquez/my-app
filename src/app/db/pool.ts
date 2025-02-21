import { Pool } from "pg";

console.log("Connecting to database...");

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1",
  database: "TasksManager",
  port: 5432
});

//console.log(await pool.query("SELECT CURRENT_DATE;"));