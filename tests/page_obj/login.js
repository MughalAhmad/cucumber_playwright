// pages/base.page.js
class LoginPage {
    constructor(page) {
        this.page = page;
        this.inventoryMenuDropdown = page.locator("#col-left > div > div > ul > li:nth-child(4) > a > span");
        this.salesInvoiceOption = page.locator("#col-left > div > div > ul > li:nth-child(4) > ul > li:nth-child(7) > a");
        this.saleNoFilterInput = page.locator("input[placeholder='Sale #']");
        this.newSaleBtn = page.locator("a[href='/ng/inventory/sale']");
        this.getItemInputDropdown = page.locator("ng-select[placeholder='Select Product'] input[role='combobox']");
        this.selectFirstOption = page.locator("//span[@class='ng-option-label'][normalize-space()='-02 - hello']");
        this.postSaleBtn = page.locator("button.btn-success");
        this.listBtn = page.getByRole('link', { name: 'List' });
        this.logoutDropdown = page.locator("a[class='dropdown-toggle']");
        this.logoutBtn = page.getByRole('link', { name: 'Logout' });
    }

    async gotoUrl() {
        await this.page.goto("https://quicktijarat.com/ng/security/login", {
            waitUntil: 'networkidle',
            timeout: 60000
        });
        await this.page.waitForSelector("//input[@placeholder='User Name']", { timeout: 30000 });
    }

    // login using the page instance attached to this class
    async login(name, password) {
        await this.page.locator("//input[@placeholder='User Name']").fill(name);
        await this.page.locator("//input[@placeholder='Password']").fill(password);
        await this.page.locator("//button[@type='submit']").click();
        await this.page.locator("//button[contains(@class,'swal2-confirm')]").click();
        await this.page.waitForLoadState('networkidle');
    }

    async setText(target, text) {
        if (!target) return;
        if (typeof target.fill === 'function') {
            await target.fill(text);
            await target.press('Enter');
        } else {
            await this.page.fill(target, text);
            await this.page.press(target, 'Enter');
        }
        await this.page.waitForLoadState('networkidle');
    }

    async getText(target) {
        if (typeof target.textContent === 'function') return await target.textContent();
        return await this.page.textContent(target);
    }

    async click(target) {
        if (typeof target.click === 'function') {
            await target.click();
        } else {
            await this.page.click(target);
        }
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };
