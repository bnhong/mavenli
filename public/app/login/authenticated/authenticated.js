angular.module('mainApp.auth', [
  'ui.router'
])

.config(function($stateProvider) {
  $stateProvider
    .state('auth', {
      abstract: true,
      data: {
        requiresLogin: true
      },
      views: {
        '': {
          templateUrl: '../app/login/authenticated/authenticated.html',
          controller: 'AuthCtrl'
        },

        'nav@auth': {
          templateUrl: '../partials/nav_authd.html',
          controller: 'AuthCtrl'
        }
      }
    })

    .state('auth.about', {
      url: '/about',
      templateUrl: '../pages/about.html',
      // Not needed because state inherits from auth.
      data: {
        requiresLogin: true
      }
    });
})

.controller('AuthCtrl', function($scope, auth, $state) {
  $scope.auth = auth;

  $scope.logout = function() {
    auth.signout();
    // Can also redirect to About which redirects to login but this saves a step.
    $state.go('login');
  }
});
