'use strict';

describe('Login page', () => {
  let loginPageObject;
  let params = browser.params;

  beforeEach(() => {
    loginPageObject = require('./login.po');

    browser.get('/');
    browser.waitForAngular();
    loginPageObject.findLoginFormElements();
  });

  it('should be shown', () => {
    expect(loginPageObject.loginFormElement.isDisplayed()).toBeTruthy();
    expect(loginPageObject.loginFieldElement.isDisplayed()).toBeTruthy();
    expect(loginPageObject.passwordFieldElement.isDisplayed()).toBeTruthy();
    expect(loginPageObject.submitButtonElement.isDisplayed()).toBeTruthy();
  });

  it('should allow to fill in the form', () => {
    loginPageObject.fillInFakeCredentials();

    expect(loginPageObject.loginFieldElement.getAttribute('value')).toEqual(params.fakeLogin.user);
    expect(loginPageObject.passwordFieldElement.getAttribute('value')).toEqual(params.fakeLogin.password);
  });

  it('shouldn\'t login user with invalid credentials', () => {
    loginPageObject.clearCredentials();
    loginPageObject.fillInFakeCredentials();
    loginPageObject.doLogin();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toMatch(/login/);
  });

  // To pass this test it should be run as:
  // gulp protractor --params.login.user='valid-login' --params.login.password='valid-password'
  it('should login user with correct credentials', () => {
    loginPageObject.clearCredentials();
    loginPageObject.fillInCredentials();
    loginPageObject.doLogin();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).not.toMatch(/login/);
  });

  it('should logout user', () => {
    loginPageObject.findNavbarElements();
    loginPageObject.doLogout();

    browser.waitForAngular();

    expect(browser.getCurrentUrl()).toMatch(/login/);
  });

});
