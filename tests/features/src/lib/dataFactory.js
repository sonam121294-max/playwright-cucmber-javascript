const { fetchDataFromCache, sharedData } = require("./cacheData");
const { userSpecificData } = require("./utils/helper");
const {
  isFactoryModelDefined,
  getDataFromFactory,
} = require("../../../data/factory");
const Chance = require("chance");
const c = new Chance();

function generateDataDirectly(type, input) {
  // Get the list of all methods available in Chance instance
  const validTypes = Object.getOwnPropertyNames(Object.getPrototypeOf(c)).filter(prop => typeof c[prop] === 'function');

  // Check if the provided type is a valid method
  if (!validTypes.includes(type)) {
    return input;
  }

  // Call the Chance method dynamically
  return c[type]();
}


const checkInCache = (modelName) => {
  let hasNumericRegex = /_([\d]+)$/;
  return modelName.match(hasNumericRegex);
};

const checkForIdentifier = (input) => {
  const identifierRegex = /^\$(.+)/; // Regex to match input starting with "$"
  const match = input.match(identifierRegex);
  return match ? match[1] : null;
};

const getGeneratedData = async (modelName, key, input) => {
  console.log("modelName => ", modelName);
  console.log("key => ", key);
  console.log("input => ", input);
  console.log("userSpecificData => ", userSpecificData);
  if (userSpecificData[modelName] && userSpecificData[modelName][key]) {
    return userSpecificData[modelName][key];
  } else if (isFactoryModelDefined(modelName)) {
    return getDataFromFactory(modelName, key);
  } else {
    return generateDataDirectly(key, input)
  }
};

const handleIdentifier = async (input) => {
  let identifierParts = input.split(".");
  let modelName = identifierParts[identifierParts.length - 2];
  let key = identifierParts[identifierParts.length - 1];
  let namespace = "";
  if (identifierParts.length > 2) {
    namespace = identifierParts.slice(0, identifierParts.length - 2).join(".");
  }
  if (checkInCache(modelName)) {
    return fetchDataFromCache(modelName, key, namespace, input);
  }
  return getGeneratedData(modelName, key, input);
};

const extractData = async (input) => {
  let placeholder = checkForIdentifier(input);
  if (placeholder) {
    return handleIdentifier(placeholder);
  } else {
    return input;
  }
};

module.exports = { extractData };
