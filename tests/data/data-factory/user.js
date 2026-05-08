const { factoryData } = require("../factory");
const { generateInsertSQL, runQuery } = require("../sqlOp");

async function createUser() {
  const userData = await factoryData("user");
  const sql = generateInsertSQL("users", userData);
  await runQuery(sql);
}

createUser();
