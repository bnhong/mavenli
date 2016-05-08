angular.module('mainApp.login', [
  'ui.router',
  'auth0'
])

.config(function($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      views: {
        '': {
          templateUrl: '../app/login/login.html',
          controller: 'LoginCtrl'
        },
        'nav@login': {
          templateUrl: '/partials/nav.html'
        }
      }
    })

    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl',
      templateUrl: '../app/login/logout.html'
    });
})

.controller('LoginCtrl', function($scope, auth, $state) {
  /* Used by auth0 redirect
  auth.signin({
    popup: true,
    chrome: true,
    standalone: true
  }, function() {
    //$state.go('auth.about')''
    $state.go('auth.about');
  }, function(error) {
    console.log('There was an error', error);
  });
   */

  // Used by auth0 redirect.
  $scope.login = function() {
    auth.signin({
      connection: 'Username-Password-Authentication',
      email: $scope.email,
      password: $scope.password
    });
  }

  $scope.loginWithFacebook = function() {
    auth.signin({
      connection: 'facebook'
    });
  }

})

.controller('LogoutCtrl', function($scope, auth, $state) {
  $scope.auth = auth;

  $scope.logout = function() {
    auth.signout();

    $state.go('login');
  }
});
