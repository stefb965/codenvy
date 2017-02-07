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
import {CodenvyAPIBuilder} from './builder/codenvy-api-builder.factory';
import {CodenvyHttpBackend} from './test/codenvy-http-backend';
import {CodenvyTeam} from './codenvy-team.factory';
import {CodenvyUser} from './codenvy-user.factory';

/**
 * Test of the Codenvy Team API
 */
describe('CodenvyTeam', () => {

  /**
   * User Factory for the test
   */
  let factory: CodenvyTeam;

  /**
   * API builder.
   */
  let apiBuilder: CodenvyAPIBuilder;

  /**
   * Backend for handling http operations
   */
  let httpBackend: ng.IHttpBackendService;

  /**
   * Codenvy backend
   */
  let codenvyBackend: CodenvyHttpBackend;

  /**
   * Codenvy backend
   */
  let namespaces: Array<any>;

  /**
   *  setup module
   */
  beforeEach(angular.mock.module('codenvyDashboard'));

  /**
   * Inject factory and http backend
   */
  beforeEach(inject((codenvyTeam: CodenvyTeam, codenvyUser: CodenvyUser, codenvyAPIBuilder: CodenvyAPIBuilder, codenvyHttpBackend: CodenvyHttpBackend, cheNamespaceRegistry: any) => {
    factory = codenvyTeam;
    apiBuilder = codenvyAPIBuilder;
    codenvyBackend = codenvyHttpBackend;

    httpBackend = codenvyHttpBackend.getHttpBackend();
    namespaces = cheNamespaceRegistry.getNamespaces();
  }));

  /**
   * Check assertion after the test
   */
  afterEach(() => {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });


  /**
   * Check that we're able to fetch team
   */
  it('Fetch team', () => {
      // setup tests objects
      let name = 'testName';
      let userId = 'testUserId';
      let teamId = 'testTeamId';
      let teamParent = 'testParent';
      let testUser = apiBuilder.getUserBuilder().withId(userId).withName(name).build();
      let team = apiBuilder.getTeamBuilder().withId(teamId).withName(name).withParent(teamParent).build();

      // providing request
      codenvyBackend.setTeam(team);
      codenvyBackend.setDefaultUser(testUser);
      codenvyBackend.usersBackendSetup();
      codenvyBackend.teamsBackendSetup();

      // setup backend for users
      codenvyBackend.teamsBackendSetup();

      // check before
      expect(namespaces.length).toEqual(0);
      expect(factory.getTeams().length).toEqual(0);
      expect(factory.getPersonalAccount()).toEqual({});

      // fetch teams
      factory.fetchTeams();

      // expecting GETs
      httpBackend.expectGET('/api/organization');

      // flush command
      httpBackend.flush();

      let teams = factory.getTeams();
      let personalAccount = factory.getPersonalAccount();

      // check after
      expect(personalAccount.id).toEqual(teamId);
      expect(personalAccount.name).toEqual(name);
      expect(teams.length).toEqual(1);
      expect(teams[0].id).toEqual(team.id);
      expect(namespaces.length).toEqual(2);
      expect(namespaces[0]).toEqual({id: name, label: 'personal', location: '/billing'});
      expect(namespaces[1]).toEqual({id: name, label: name, location: '/team/' + name});
    }
  );


  /**
   * Check that we're able to fetch team by it's name
   */
  it('Create team', () => {
      // setup tests objects
      let team = apiBuilder.getTeamBuilder().withName('testName').build();

      // providing request
      codenvyBackend.setTeam(team);
      codenvyBackend.usersBackendSetup();
      codenvyBackend.teamsBackendSetup();
      factory.getPersonalAccount().id = 'testid';

      // create team
      factory.createTeam(team.name);

      // expecting POSTs
      httpBackend.expectPOST('/api/organization', {name: team.name, parent: factory.getPersonalAccount().id});

      // flush command
      httpBackend.flush();
    }
  );


  /**
   * Check that we're able to update team
   */
  it('Update team', () => {
      // setup an object for test
      let team = apiBuilder.getTeamBuilder().withId('organizationfswamhsdfghrgvdd').build();

      // providing request
      codenvyBackend.setTeam(team);
      codenvyBackend.usersBackendSetup();
      codenvyBackend.teamsBackendSetup();

      // update team
      factory.updateTeam(team);

      // expecting POSTs
      httpBackend.expectPOST('/api/organization/' + team.id);

      // flush command
      httpBackend.flush();
    }
  );


  /**
   * Check that we're able to fetch team by it's name
   */
  it('Fetch team by name', () => {
      // setup an object for test
      let team = apiBuilder.getTeamBuilder().withName('test967967Team').build();

      // providing request
      codenvyBackend.setTeam(team);
      codenvyBackend.usersBackendSetup();
      codenvyBackend.teamsBackendSetup();

      // fetch team by name
      factory.fetchTeamByName(team.name);

      // expecting GETs
      httpBackend.expectGET('/api/organization/find?name=' + team.name);

      // flush command
      httpBackend.flush();
    }
  );

  /**
   * Check that we're able to delete team
   */
  it('Delete team', () => {
      // setup an object for test
      let team = apiBuilder.getTeamBuilder().withId('organizationfswamhsdfghrghty').build();

      // providing request
      codenvyBackend.setTeam(team);
      codenvyBackend.usersBackendSetup();
      codenvyBackend.teamsBackendSetup();

      // delete team
      factory.deleteTeam(team.id);

      // expecting DELETEs
      httpBackend.expectDELETE('/api/organization/' + team.id);

      // flush command
      httpBackend.flush();
    }
  );

});
