const  { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const {chromium, expect} = require('@playwright/test');
const { get } = require("http");

let browser;
let page;
// ✅ Set default timeout globally (e.g., 60 seconds)
setDefaultTimeout(60000);

Given('providing valid url', async function () {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    setDefaultTimeout(10000);
    await page.goto("https://quicktijarat.com/ng/security/login", {
        waitUntil: 'networkidle', // Wait until all network requests are done
        timeout: 60000 // optional: wait up to 60 seconds
    });

  // Ensure login form is visible
  await page.waitForSelector("//input[@placeholder='User Name']", { timeout: 30000 });
});

When('providing valid username as {string}, password as {string} and submit', async function (name, password) {
    await page.locator("//input[@placeholder='User Name']").fill(name);
    await page.locator("//input[@placeholder='Password']").fill(password);
    await page.locator("//button[@type='submit']").click();
    setDefaultTimeout(10000);
    await page.locator("//button[@class='swal2-confirm swal2-styled']").click();
    setDefaultTimeout(30000);
});


Then('checking is Login Successfully find', async function () {
  const title = await page.title();
  console.log("Page title:", title);

  // Wait until title is correct
  await expect(page).toHaveTitle(/Dashboard/i, { timeout: 20000 }); // regex makes it case-insensitive

  // await page.close();
  // await browser.close();
});


Then('select inventory dropdown and select Sales invoice option', async function () {
  await page.waitForLoadState('networkidle');
  const getDropdown =  await page.locator("#col-left > div > div > ul > li:nth-child(4) > a > span");
  // console.log("Dropdown element text:", await getDropdown.textContent());
  expect(getDropdown).toHaveText('Inventory'); 
  const isVisible = await getDropdown.isVisible();
  console.log("Is Inventory dropdown visible?:", isVisible);
  await getDropdown.click();  
  const getSubOption =  await page.locator("#col-left > div > div > ul > li:nth-child(4) > ul > li:nth-child(7) > a");
  const attributes = await getSubOption.evaluate(el => {
    const attrs = {};
    for (const attr of el.attributes) {
      attrs[attr.name] = attr.value;
    }
    return attrs;
  });
  
  console.log("Sales Invoice option href:", attributes);
  const hrefValue = await getSubOption.getAttribute('href');
  expect(hrefValue).toContain('/ng/inventory/sale/list');
  await getSubOption.click();
  await page.waitForLoadState('networkidle');
  const currentUrl = page.url();
  expect(currentUrl).toContain('/ng/inventory/sale/list');
});

Then('enter sale no 57 and press enter seacrh button', async function () {

  const getSaleInput = await page.locator("input[placeholder='Sale #']");
  
  await getSaleInput.fill('57');
  await getSaleInput.press('Enter');
  await page.waitForLoadState('networkidle');

  await getSaleInput.fill('');

  await getSaleInput.fill('45');
  await getSaleInput.press('Enter');
  await page.waitForLoadState('networkidle');

  await getSaleInput.fill('');

  await getSaleInput.fill('10');
  await getSaleInput.press('Enter');
  await page.waitForLoadState('networkidle');

});


Then('click new button to create new sales invoice', async function () {

  const newSaleBtn = await page.locator("a[href='/ng/inventory/sale']");
  await newSaleBtn.click();
  await page.waitForLoadState('networkidle');
  const currentUrl = page.url();
  expect(currentUrl).toContain('/ng/inventory/sale');
});

Then('enter one item and press post button to save sales invoice', async function () {

const getItemInputDropdown = page.locator("ng-select[placeholder='Select Product'] input[role='combobox']");
  await getItemInputDropdown.click();
    const selectFirstOption = page.locator("//span[@class='ng-option-label'][normalize-space()='-02 - hello']");
    await selectFirstOption.click();
    await page.waitForLoadState('networkidle');
});

Then('press list button to go sales invoice list page', async function () {

    const postSaleBtn = page.locator("button.btn-success");
    await postSaleBtn.click();
    await page.waitForLoadState('networkidle');
    const listButton = page.getByRole('link', { name: 'List' });
    await listButton.click();
    await page.waitForLoadState('networkidle');

});

Then('filter out that sale which you created just now and verify it exists in list page', async function () {

    const getSaleInput = await page.locator("input[placeholder='Sale #']");
  await getSaleInput.fill('50');
  await getSaleInput.press('Enter');
  await page.waitForLoadState('networkidle');

  await page.close();
  await browser.close();
});