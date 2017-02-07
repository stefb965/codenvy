'use strict';

/**
 * todo
 * @constructor
 *
 * @author Oleksii Kurinnyi
 */
let LoginPage = function() {
  let helpers = require('../helpers');
  let params = browser.params;

  this.loginFormElement = element(by.css('[name="loginDeveloperForm"]'));

  // login field
  this.loginFieldElement = helpers.getVisibleInputElement(element(by.css('[che-name="login"]')));

  // password field
  this.passwordFieldElement = helpers.getVisibleInputElement(element(by.css('[che-name="password"]')));

  // login button
  this.submitButtonElement = element(by.css('#submit'));

  this.clearCredentials = () => {
    this.loginFieldElement.clear();
    this.passwordFieldElement.clear();
  };

  this.fillInFakeCredentials = function () {
    this.loginFieldElement.sendKeys(params.fakeLogin.user);
    this.passwordFieldElement.sendKeys(params.fakeLogin.password);
  };

  this.fillInCredentials = function () {
    this.loginFieldElement.sendKeys(params.login.user);
    this.passwordFieldElement.sendKeys(params.login.password);
  };

  this.doLogin = function () {
    return this.submitButtonElement.click();
  };
};

module.exports = new LoginPage();
