const { 
  BeforeAll, 
  AfterAll, 
  Before, 
  After, 
  setWorldConstructor, 
  setDefaultTimeout 
} = require('@cucumber/cucumber');
const {CustomWorld} = require('../world/customWorld');

setWorldConstructor(CustomWorld);
setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
  console.log('🚀 Starting Cucumber Test Suite...');
});

Before(async function () {
  console.log('🧩 Setting up scenario...');
  await this.init();
});

After(async function (scenario) {
  console.log(`🧹 Cleaning up after scenario: ${scenario.pickle.name}`);
  await this.close();
});

AfterAll(async function () {
  console.log('✅ All tests finished!');
});
