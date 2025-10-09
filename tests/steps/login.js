const  { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const {chromium, expect} = require('@playwright/test');

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

When('providing valid username, password and submit', async function () {
    await page.locator("//input[@name='userName']").fill('mercury');
    await page.locator("//input[@name='password']").fill('mercury');
    await page.locator("//input[@name='submit']").click();
    setDefaultTimeout(10000);
});

Then('checking is Login Successfully find', async function () {
  const title = await page.title();
  console.log("Page title:", title);

  // Wait until title is correct
  await expect(page).toHaveTitle(/Dashboard/i, { timeout: 20000 }); // regex makes it case-insensitive

  // Wait for logo
  const logo = page.locator("//span[@class='normal-logo logo-white']");
  await logo.waitFor({ state: 'visible', timeout: 20000 });
  await expect(logo).toContainText('Mughal Ahmad');

  await page.close();
  await browser.close();
});


