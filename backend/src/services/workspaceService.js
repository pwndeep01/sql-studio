const pool = require("../config/postgres");

const createWorkspace = async (userId, assignment) => {
  const schema = `workspace_${userId}_${assignment._id}`;

  await pool.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
  await pool.query(`SET search_path TO ${schema}`);

  for (const table of assignment.sampleTables) {

    // Create table dynamically
    const columnsSQL = table.columns
      .map(col => `${col.columnName} ${col.dataType}`)
      .join(", ");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${schema}.${table.tableName} (
        ${columnsSQL}
      )
    `);

    // Insert rows
    for (const row of table.rows) {
      const keys = Object.keys(row);
      const values = Object.values(row);

      const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");

      await pool.query(
        `INSERT INTO ${schema}.${table.tableName} (${keys.join(",")})
         VALUES (${placeholders})`,
        values
      );
    }
  }

  return schema;
};

module.exports = { createWorkspace };