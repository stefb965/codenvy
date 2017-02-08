'use strict';

let NavbarPageObject = function() {

  this.navbarElement = element(by.css('.left-sidebar-container'));

  this.recentWorkspacesElement = element(by.tagName('navbar-recent-workspaces'));

  this.teamsElement = element(by.tagName('navbar-teams'));

};

module.exports = new NavbarPageObject();
