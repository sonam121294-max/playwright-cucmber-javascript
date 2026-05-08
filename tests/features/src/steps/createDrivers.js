const { Given } = require("@cucumber/cucumber");
const { createPlaywrightDriver, createAppiumDriver } = require('../../../features/src/lib/utils/drivers');
const delay = ms => new Promise(res => setTimeout(res, ms));


Given('user is on mobile app', { timeout: 40 * 1000 }, async () => {
  const driver = await createAppiumDriver();
  driver.drivertype = 'app';
  setDriver(driver);
  await delay(5000)
})

Given('user is on web app', async () => {
  const pages = new Map();
  if(!global.driver)
  {
  const driver = await createPlaywrightDriver();
  driver.drivertype = 'web';
  pages.set("opening page", driver);
  setDriver(driver, pages);
  }
})

function setDriver(driver, pages) {
  global.driver = driver;
  global.pages = pages;
}