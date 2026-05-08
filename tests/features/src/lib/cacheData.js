const { entity } = require("../../../data/factory");
const { userSpecificData } = require("./utils/helper");

var sharedData = {};

const setSharedData = (key, data) => {
  sharedData[key] = data;
};

const getSharedData = (key) => {
  return sharedData[key];
};

const clearSharedData = () => {
  sharedData = {};
};
const getValueFromNestedPath = (path, obj) => {
  return path.split(".").reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj || self);
};

const assignValueToNestedPath = (obj, keys, value) => {
  const keyParts = keys.split(".");
  let currentObj = obj;
  for (let i = 0; i < keyParts.length - 1; i++) {
    const key = keyParts[i];
    if (!currentObj[key]) {
      currentObj[key] = {};
    }
    currentObj = currentObj[key];
  }
  currentObj[keyParts[keyParts.length - 1]] = value;
};
const getIdentifierData = async (identifier, property) => {
  const factoryName = identifier.split("_")[0];
  const identifierData = await entity(factoryName);
  if (
    userSpecificData[factoryName] &&
    userSpecificData[factoryName][property]
  ) {
    identifierData[property] = userSpecificData[factoryName][property];
  }
  return identifierData;
};

const fetchDataFromCache = async (identifier, property, namespace) => {
  if (namespace) {
    let data = getValueFromNestedPath(namespace, sharedData);
    if (data && data[identifier]) {
      return data[identifier][property];
    } else {
      const identifierData = await getIdentifierData(identifier, property);
      let nestedKeys = namespace + "." + identifier;
      assignValueToNestedPath(sharedData, nestedKeys, identifierData);
      return identifierData[property];
    }
  } else {
    console.log("shared Data => ", sharedData);
    if (sharedData[identifier]) {
      return sharedData[identifier][property];
    } else {
      const identifierData = await getIdentifierData(identifier, property);
      sharedData[identifier] = identifierData;
      return identifierData[property];
    }
  }
};

module.exports = {
  fetchDataFromCache,
  sharedData,
  setSharedData,
  getSharedData,
  clearSharedData,
};
