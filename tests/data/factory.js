const { factory } = require("factory-girl");

const definedModels = ["user", "requirement", "challan"]; // add defined model here

const loadFactory = async () => {
  factory.define("user", Object, {
    full_name: factory.chance("name"),
    email: factory.chance("email"),
    phone_number: factory.chance("phone"),
    gender: factory.chance("pickone", ["Male", "Female"]),
    qa_tool: factory.chance("pickone", [
      "Cypress",
      "Selenium",
      "Protractor",
      "Appium",
    ]),
    other_details: factory.chance("sentence"),

    // years_of_experience: factory.chance('pickone', ['1_year_of_experience', '2_years_of_experience', '5_years_of_experience']),
    // skills: factory.chance('pickone', ['Functional testing', 'Automation testing', 'Manual testing']),
  });

  factory.define("requirement", Object, {
    description: factory.chance("sentence"),
  });
  factory.define("challan", Object, {
    number: factory.chance("string"),
  });
};

loadFactory();
const entity = async (name, replace) =>
  new Promise(async (resolve, reject) => {
    let data = await factory.build(name);
    if (replace) {
      data = replace(data);
    }
    resolve(data);
  });

const isFactoryModelDefined = (factoryModelName) => {
  return definedModels.includes(factoryModelName);
};

const getDataFromFactory = async (factoryName, key) => {
  const model = await entity(factoryName);
  return model[key];
};
const factoryData = async (factoryName) => await entity(factoryName);

module.exports.isFactoryModelDefined = isFactoryModelDefined;
module.exports.entity = entity;
module.exports.getDataFromFactory = getDataFromFactory;
module.exports.factoryData = factoryData;
