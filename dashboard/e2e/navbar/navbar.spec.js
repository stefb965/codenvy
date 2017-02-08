'use strict';

describe('Left navbar', () => {
  let loginPageObject, pageObject;

  beforeAll(() => {
    loginPageObject = require('../login/login.po');

    // login
    browser.get('/');
    browser.waitForAngular();
    loginPageObject.findLoginFormElements();
    loginPageObject.fillInCredentials();
    loginPageObject.doLogin();
    browser.waitForAngular();
  });

  afterAll(() => {
    // logout
    loginPageObject.findNavbarElements();
    loginPageObject.doLogout();
  });

  beforeEach(() => {
    pageObject = require('./navbar.po');
  });

  it('should be visible', () => {
    expect(pageObject.navbarElement.isDisplayed()).toBeTruthy();
  });

  it('should contain "Recent workspaces" section', () => {
    expect(pageObject.recentWorkspacesElement.isDisplayed()).toBeTruthy()
  });

  it('should contain "Teams" section', () => {
    expect(pageObject.teamsElement.isDisplayed()).toBeTruthy();
  });

});
