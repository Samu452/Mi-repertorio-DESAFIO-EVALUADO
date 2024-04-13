import pg from "pg";
process.loadEnvFile();

const { Pool } = pg;

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

export const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
});


export default pool