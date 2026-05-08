const R = require("ramda");
let locators = require("../../../../resources/locators.json");
const userData = require(`../../../../data/user-data/${
  process.env.USERNAME || "default"
}.json`);

console.log('process.env.USERNAME => ', process.env.USERNAME);
const data = require("../../../../data/user-data/default.json");
const getLocatorValueFromJS = (locatorName) => {
  let locatorValue = locatorName;
  const map = new Map(
    locators.map((obj) => {
      return [obj.key, obj.value];
    })
  );

  if (map.has(locatorName)) {
    console.log("locator is found: ", locatorName);

    locatorValue = map.get(locatorName);
    console.log("locator value: ", locatorValue);
  }
  return locatorValue;
};

function deepMerge(arg1, arg2) {
  if (Array.isArray(arg1) && Array.isArray(arg2)) {
    return R.uniq(R.concat(arg1, arg2));
  }
  if (
    typeof arg1 === "object" &&
    typeof arg2 === "object" &&
    !R.isNil(arg1) &&
    !R.isNil(arg2)
  ) {
    return R.mergeWith(deepMerge, arg1, arg2);
  }

  return arg2;
}
const userSpecificData = R.mergeWith(deepMerge, data, userData);

module.exports = {
  getLocatorValueFromJS,
  userSpecificData,
};
