const { Pool } = require("pg");

const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/* const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cipher_sql_studio",
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
}); */

pool.connect()
  .then(() => console.log("Connected to Postgres"))
  .catch((err) => console.error("Postgres connection error:", err));


module.exports = pool;