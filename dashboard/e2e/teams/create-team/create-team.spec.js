'use strict';

describe('Create team', () => {
  let pageObject, loginPageObject;

  beforeAll(() => {
    loginPageObject = require('../../login/login.po');

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
    //loginPageObject.findNavbarElements();
    //loginPageObject.doLogout();
  });

  beforeEach(() => {
    pageObject = require('./create-team.po');
  });

  describe('link from left sidebar', () => {

    it('should be available', () => {
      expect(pageObject.navbarCreateTeamElement.isDisplayed()).toBeTruthy();
    });

    it('should redirect to "Create new team" flow', () => {
      pageObject.navbarCreateTeamElement.click();
      expect($('ng-form[name="createTeamForm"]').isDisplayed()).toBeTruthy();
    });

  });

  describe('flow', () => {
    let teamsToCreateNumber = 10;

    beforeAll(() => {
      browser.get('/');
    });

    for (let i=0; i<teamsToCreateNumber; i++) {
      let newTeamName = 'Team0' + i;

      it(`should allow to create team "${newTeamName}"`, () => {
        pageObject.createTeam(newTeamName);

        expect( pageObject.navbarTeamsListElement.element(by.cssContainingText('.navbar-item', newTeamName)).isDisplayed() ).toBeTruthy();
        expect(pageObject.navbarTeamsListItemElements.count()).toEqual(i + 1);
      });
    }

  });

});
