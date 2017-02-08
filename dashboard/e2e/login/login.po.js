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

  this.findLoginFormElements = () => {
    this.loginFormElement = $('[name="loginDeveloperForm"]');

    // login field
    this.loginFieldElement = helpers.getVisibleInputElement($('[che-name="login"]'));

    // password field
    this.passwordFieldElement = helpers.getVisibleInputElement($('[che-name="password"]'));

    // login button
    this.submitButtonElement = $('#submit');
  };

  this.clearCredentials = () => {
    this.loginFieldElement.clear();
    this.passwordFieldElement.clear();
  };

  this.fillInFakeCredentials =  () => {
    this.loginFieldElement.sendKeys(params.fakeLogin.user);
    this.passwordFieldElement.sendKeys(params.fakeLogin.password);
  };

  this.fillInCredentials = () => {
    this.loginFieldElement.sendKeys(params.login.user);
    this.passwordFieldElement.sendKeys(params.login.password);
  };

  this.doLogin = () => {
    return this.submitButtonElement.click();
  };

  this.findNavbarElements = () => {
    this.adminNavbarMenuElement = $('.navbar-account-section');
    this.logoutMenuItemElement = $('.navbar-dropdown-menu').element(by.cssContainingText('.navbar-click-area', 'Logout'));
  };

  this.doLogout = () => {
    this.adminNavbarMenuElement.click().then(() => {
      return this.logoutMenuItemElement.click();
    });
  };

};

module.exports = new LoginPage();
