const timeouts = new Map([
    ["cucumber_timeout", 100000],
    ["expect_timeout", 30000],
    ["playwright_timeout", 30000]
  ]);

  module.exports.timeouts = timeouts;