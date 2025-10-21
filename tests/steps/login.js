const { Given, When, Then, setDefaultTimeout, Before, After } = require("@cucumber/cucumber");
const { expect } = require('@playwright/test');
const {CustomWorld, setWorldConstructor, } = require('../world/customWorld');

setWorldConstructor(CustomWorld);
setDefaultTimeout(60000);

Before(async function () {
  await this.init(); // from CustomWorld
});

After(async function () {
  await this.close();
});

Given('providing valid url', async function () {
  setDefaultTimeout(10000);
  await this.loginPage.gotoUrl();
});

When('providing valid username as {string}, password as {string} and submit', async function (name, password) {
  await this.loginPage.login(name, password);
});

Then('checking is Login Successfully find', async function () {
  const title = await this.page.title();
  console.log("Page title:", title);
  await expect(this.page).toHaveTitle(/Dashboard/i, { timeout: 20000 }); // regex makes it case-insensitive
});

Then('select inventory dropdown and select Sales invoice option', async function () {
  await this.page.waitForLoadState('networkidle');
  const getDropdown = this.loginPage.inventoryMenuDropdown;
  await expect(getDropdown).toHaveText('Inventory');
  await expect(getDropdown).toBeVisible();
  await getDropdown.click();

  const getSubOption = this.loginPage.salesInvoiceOption;
  const attributes = await getSubOption.evaluate(el => {
    const attrs = {};
    for (const attr of el.attributes) {
      attrs[attr.name] = attr.value;
    }
    return attrs;
  });
  const hrefValue = await getSubOption.getAttribute('href');
  expect(hrefValue).toContain('/ng/inventory/sale/list');
  await getSubOption.click();
  await this.page.waitForLoadState('networkidle');
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('/ng/inventory/sale/list');
});

Then('enter sale no 57 and press enter seacrh button', async function () {
  const getSaleInput = this.loginPage.saleNoFilterInput;
  await this.loginPage.setText(getSaleInput, '57');
  await this.loginPage.setText(getSaleInput, '');
  await this.loginPage.setText(getSaleInput, '45');
  await this.loginPage.setText(getSaleInput, '');
  await this.loginPage.setText(getSaleInput, '10');
});

Then('click new button to create new sales invoice', async function () {
  const newSaleBtn = this.loginPage.newSaleBtn;
  await this.loginPage.click(newSaleBtn);
  const currentUrl = this.page.url();
  expect(currentUrl).toContain('/ng/inventory/sale');
});

Then('enter one item and press post button to save sales invoice', async function () {
  await this.loginPage.click(this.loginPage.getItemInputDropdown);
  await this.loginPage.click(this.loginPage.selectFirstOption);
});

Then('press list button to go sales invoice list page', async function () {
  await this.loginPage.click(this.loginPage.postSaleBtn);
  await this.loginPage.click(this.loginPage.listBtn);
});

Then('filter out that sale which you created just now and verify it exists in list page', async function () {
  await this.loginPage.setText(this.loginPage.saleNoFilterInput, '50');
});

Then('logout from application', async function () {
  await this.loginPage.click(this.loginPage.logoutDropdown);
  await this.loginPage.click(this.loginPage.logoutBtn);
});

Then('again login with same user', async function () {
  await this.loginPage.login('ahmad.support', '123');
  await this.page.title();
  await expect(this.page).toHaveTitle(/Dashboard/i, { timeout: 20000 }); // regex makes it case-insensitive
  await this.page.close();
  await this.browser.close();
});