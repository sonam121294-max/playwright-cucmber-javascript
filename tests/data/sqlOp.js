const sequelize = require("../../dbConnection");

// create  table for development purpose
async function createTables() {
  try {
    // Example raw query to create a table
    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS  aadhar (
          id UUID PRIMARY KEY,
          aadharName VARCHAR(50) NOT NULL,
          userId UUID NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

createTables();

function generateInsertSQL(tableName, obj) {
  const columns = Object.keys(obj)
    .map((key) => key)
    .join(", ");
  const values = Object.values(obj)
    .map((value) => {
      if (typeof value === "string") {
        return `'${value}'`;
      } else if (typeof value === "boolean") {
        return value ? "TRUE" : "FALSE";
      } else {
        return `'${value}'`;
      }
    })
    .join(", ");

  const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
  return sql;
}

async function runQuery(sqlQuery) {
  try {
    await sequelize.query(sqlQuery);
    // console.log("DATA added successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

async function closeConnection() {
  await sequelize.close();
  console.log("Connection closed.");
}

module.exports = {
  generateInsertSQL,
  runQuery,
  closeConnection,
};
