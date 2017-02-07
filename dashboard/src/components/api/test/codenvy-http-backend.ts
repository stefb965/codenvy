/*
 *  [2015] - [2017] Codenvy, S.A.
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Codenvy S.A. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Codenvy S.A.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Codenvy S.A..
 */
'use strict';

interface Iteam {
  id: string;
  name?: string;
  parent?: string;
}

interface IUser {
  id: string;
  name?: string;
  email?: string;
  aliases?: string;
}

/**
 * This class is providing helper methods for simulating a fake HTTP backend simulating
 * @author Florent Benoit
 * @author Oleksii Orel
 */
export class CodenvyHttpBackend {

  private httpBackend: ng.IHttpBackendService;
  private teamsMap: Map<string, Iteam>;
  private defaultUser: IUser;
  private defaultBranding: any;
  private userIdMap: Map<string, IUser>;
  private userEmailMap: Map<string, IUser>;
  private factoriesMap: Map<string, any>;
  private pageMaxItem: number;
  private pageSkipCount: number;

  /**
   * Constructor to use
   */
  constructor($httpBackend: ng.IHttpBackendService) {
    this.httpBackend = $httpBackend;

    this.defaultBranding = {};

    this.defaultUser = {id: 'testId'};
    this.userIdMap = new Map();
    this.userEmailMap = new Map();

    this.factoriesMap = new Map();
    this.pageMaxItem = 5;
    this.pageSkipCount = 0;

    this.teamsMap = new Map();

    this.httpBackend.when('OPTIONS', '/api/').respond({});

    // change password
    this.httpBackend.when('POST', '/api/user/password').respond(200, {});

    // create new user
    this.httpBackend.when('POST', '/api/user').respond(200, {});
    // license legality - true
    this.httpBackend.when('GET', '/api/license/system/legality').respond({isLegal: true});

    // admin role - false
    this.httpBackend.when('GET', '/api/user/inrole?role=admin&scope=system&scopeId=').respond(false);
    // user role - true
    this.httpBackend.when('GET', '/api/user/inrole?role=user&scope=system&scopeId=').respond(true);
    // branding
    this.httpBackend.when('GET', 'assets/branding/product.json').respond(this.defaultBranding);
  }


  /**
   * Setup Backend for factories
   */
  factoriesBackendSetup(): void {
    let allFactories = [];
    let pageFactories = [];

    let factoriesKeys = this.factoriesMap.keys();
    for (let key of factoriesKeys) {
      let factory = this.factoriesMap.get(key);
      this.httpBackend.when('GET', '/api/factory/' + factory.id).respond(factory);
      this.httpBackend.when('DELETE', '/api/factory/' + factory.id).respond(200, {});
      allFactories.push(factory);
    }

    if (this.defaultUser) {
      this.httpBackend.when('GET', '/api/user').respond(this.defaultUser);

      if (allFactories.length > this.pageSkipCount) {
        if (allFactories.length > this.pageSkipCount + this.pageMaxItem) {
          pageFactories = allFactories.slice(this.pageSkipCount, this.pageSkipCount + this.pageMaxItem);
        } else {
          pageFactories = allFactories.slice(this.pageSkipCount);
        }
      }
      this.httpBackend.when('GET', '/api/factory/find?creator.userId=' + this.defaultUser.id + '&maxItems=' + this.pageMaxItem + '&skipCount=' + this.pageSkipCount).respond(pageFactories);
    }
  }

  /**
   * Setup all users
   */
  usersBackendSetup(): void {
    this.httpBackend.when('GET', '/api/user').respond(this.defaultUser);

    let userIdKeys = this.userIdMap.keys();
    for (let key of userIdKeys) {
      this.httpBackend.when('GET', '/api/user/' + key).respond(this.userIdMap.get(key));
    }

    let userEmailKeys = this.userEmailMap.keys();
    for (let key of userEmailKeys) {
      this.httpBackend.when('GET', '/api/user/find?email=' + key).respond(this.userEmailMap.get(key));
    }
  }

  /**
   * Setup all teams
   */
  teamsBackendSetup(): void {
    let teamIdKeys = this.teamsMap.keys();
    let teams: Array<Iteam> = [];
    for (let key of teamIdKeys) {
      let team = this.teamsMap.get(key);
      if (team) {
        teams.push(team);
        if (team.id) {
          this.httpBackend.when('POST', '/api/organization/' + key, team).respond(200, {});
        }
        if (team.name) {
          this.httpBackend.when('GET', '/api/organization/find?name=' + team.name).respond(200, team);
        }
      }
      this.httpBackend.when('DELETE', '/api/organization/' + key).respond(200, {});
    }
    if (teams.length) {
      this.httpBackend.when('GET', '/api/organization').respond(teams);
      this.httpBackend.when('POST', '/api/organization').respond(200, {});
    }
  }

  /**
   * Add the given factory
   * @param factory {any}
   */
  addUserFactory(factory: any): void {
    this.factoriesMap.set(factory.id, factory);
  }

  /**
   * Sets max objects on response
   * @param pageMaxItem {number}
   */
  setPageMaxItem(pageMaxItem: number): void {
    this.pageMaxItem = pageMaxItem;
  }

  /**
   * Sets skip count of values
   * @param pageSkipCount {number}
   */
  setPageSkipCount(pageSkipCount: number): void {
    this.pageSkipCount = pageSkipCount;
  }

  /**
   * Add the given user
   * @param user {IUser}
   */
  setDefaultUser(user: IUser): void {
    this.defaultUser = user;
  }

  /**
   * Add the given user to userIdMap
   * @param user {IUser}
   */
  addUserById(user: IUser): void {
    this.userIdMap.set(user.id, user);
  }

  /**
   * Add the given user to userEmailMap
   * @param user {IUser}
   */
  addUserEmail(user: IUser): void {
    this.userEmailMap.set(user.email, user);
  }

  /**
   * Gets the internal http backend used
   * @returns {ng.IHttpBackendService}
   */
  getHttpBackend(): ng.IHttpBackendService {
    return this.httpBackend;
  }

  /**
   * Add the given team
   * @param team {Iteam}
   */
  setTeam(team: Iteam): void {
    this.teamsMap.set(team.id, team);
  }
}

