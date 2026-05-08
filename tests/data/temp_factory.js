const FactoryGirl = require("factory-girl");
const factory = FactoryGirl.factory;
const sequelize = require("../../dbConnection");
const User = require("./temp_user_model");
const Aadhar = require("./temp_aadhar_model");
const Address = require("./temp_address_model");

const adapter = new FactoryGirl.SequelizeAdapter(sequelize);

factory.setAdapter(adapter);

factory.define("User", User, {
  id: factory.chance("guid"),
  username: factory.chance("name"),
  email: factory.chance("email"),
});

factory.define("Aadhar", Aadhar, {
  id: factory.chance("guid"),
  aadharname: factory.chance("name"),
  userid: factory.assoc("User", "id"),
});

factory.define("Address", Address, {
  id: factory.chance("guid"),
  country: factory.chance("country"),
  state: factory.chance("state"),
  zipcode: factory.chance("zip"),
});

async function createUserAndAadhar() {
  const user = await factory.create("User");
  const aadhar = await factory.create("Aadhar", {
    aadharname: user.username,
    userid: user.id,
  });
  console.log("user = > ", user.toJSON());
  console.log("aadhar = > ", aadhar.toJSON());
}
createUserAndAadhar();

async function createUserAndAddress(count = 1) {
  const user = await factory.create("User");
  const addresses = await factory.createMany("Address", count, {
    userid: user.id,
  });
  console.log("user = > ", user.toJSON());
  console.log("address = > ", JSON.stringify(addresses, null, 2));
}

createUserAndAddress(3);
