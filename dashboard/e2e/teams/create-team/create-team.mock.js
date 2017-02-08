'use strict';

exports.cheBackend = function() {
  angular.module('codenvyDashboardMock', ['codenvyDashboard', 'ngMockE2E']).run(['$httpBackend', 'cheAPIBuilder', 'cheHttpBackendProvider',
      function($httpBackend, cheAPIBuilder, cheHttpBackendProvider) {
        let cheBackend = cheHttpBackendProvider.buildBackend($httpBackend, cheAPIBuilder);
        cheBackend.setup();
      }]);
};

exports.user = function() {
  console.log('>>> user mock step 1');
  angular .module('codenvyDashboardMock', ['codenvyDashboard', 'ngMockE2E']).run(function () {
    console.log('>>> user mock step 2');
  });
};

exports.data = function() {
  console.log('>>> mocking data');
  angular.module('codenvyDashboardMock', ['codenvyDashboard', 'ngMockE2E']).run(['$httpBackend', 'codenvyAPIBuilder', 'codenvyHttpBackendProvider', 'cheAPIBuilder', 'cheHttpBackendProvider',
      function($httpBackend, codenvyAPIBuilder, codenvyHttpBackendProvider, cheAPIBuilder, cheHttpBackendProvider) {
      console.log('>>> inside of data mock');
        // create and mock cheBackend
        let cheBackend = cheHttpBackendProvider.buildBackend($httpBackend, cheAPIBuilder);
        cheBackend.setup();

        // create backend
        let codenvyBackend = codenvyHttpBackendProvider.buildBackend($httpBackend);

        // setup tests objects
        let name = 'testName';
        let userId = 'testUserId';
        let teamId = 'testTeamId';
        let teamParent = 'testParent';
        let testUser = codenvyAPIBuilder.getUserBuilder().withId(userId).withName(name).build();
        let team = codenvyAPIBuilder.getTeamBuilder().withId(teamId).withName(name).withParent(teamParent).build();

        // providing request
        codenvyBackend.setTeam(team);
        codenvyBackend.setDefaultUser(testUser);
        codenvyBackend.usersBackendSetup();
        codenvyBackend.teamsBackendSetup();
      }]);
};
