// sequelize.js

const { Sequelize } = require("sequelize");

// Initialize Sequelize with PostgreSQL database credentials
const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost", // or your database host
  port: 5432, // default PostgreSQL port
  username: "root", // your database username
  password: "root", // your database password (if any)
  database: "spine_automation_dev", // your database name
  logging: true,
  // fieldNamingStrategy: "preserveCase",
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
