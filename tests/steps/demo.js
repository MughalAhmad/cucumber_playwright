const  { Given, When, Then } = require("@cucumber/cucumber");

Given('checking demo', function () {
    console.log("Given")
});

When('print same message', function () {
    console.log("When")
});


Then('result values', function () {
    console.log("Then")
});