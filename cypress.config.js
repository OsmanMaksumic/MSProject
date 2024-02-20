const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const { pa11y } = require("@cypress-audit/pa11y");


module.exports = {
  projectId: 'osmoTest',
  reporter: 'cypress-mochawesome-reporter',
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  pageLoadTimeout: 20000,
  defaultCommandTimeout: 10000,
  video: true,


  e2e: {
    baseUrl: "https://www.saucedemo.com",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });
      on("task", {
        lighthouse: lighthouse(),
        pa11y: pa11y(console.log.bind(console)),
      });

    },
  },


};


