const { chromium } = require('playwright');
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

module.exports = { CustomWorld };