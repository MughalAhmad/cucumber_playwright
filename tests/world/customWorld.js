const { chromium } = require('playwright');
const { setWorldConstructor } = require('@cucumber/cucumber');
const { LoginPage } = require("../page_obj/login");

class CustomWorld {
  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
    this.loginPage = new LoginPage(this.page);
  }

  async close() {
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);

module.exports = { CustomWorld, setWorldConstructor };