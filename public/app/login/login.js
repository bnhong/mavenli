angular.module('mainApp.login', [
  'ui.router',
  'auth0'
])

.config(function($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      controller: 'LoginCtrl',
      templateUrl: '../app/login/login.html'
    })

    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl',
      templateUrl: '../app/login/logout.html'
    });
})

.controller('LoginCtrl', function(auth, $state) {
  auth.signin({
    popup: true,
    chrome: true,
    standalone: true
  }, function() {
    //$sate.go('auth.about')''
    $state.go('auth.about');
  }, function(error) {
    console.log('There was an error', error);
  });
})

.controller('LogoutCtrl', function($scope, auth, $state) {
  $scope.auth = auth;

  $scope.logout = function() {
    auth.signout();

    $state.go('login');
  }
});
