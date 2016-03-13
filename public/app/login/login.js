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
    });
})

.controller('LoginCtrl', function(auth, $state) {
  auth.signin({
    popup: true,
    chrome: true,
    standalone: true
  }, function() {
    $state.go('auth.home');
  }, function(error) {
    console.log('There was an error', error);
  });
});
