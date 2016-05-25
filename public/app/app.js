angular.module('mainApp', [
  'ui.router',
  'auth0',

  // Home App
  'mainApp.search',
  'mainApp.getLocation',

  // Activities App
  'mainApp.activities',

  // Providers App
  'mainApp.providers',

  // Login App
  'mainApp.login',
  'mainApp.auth'
])

.config(function($stateProvider, $urlRouterProvider, authProvider) {
  // For any unmatched url, redirect to ''
  $urlRouterProvider.otherwise('');

  authProvider.init({
    domain: 'mavenli.auth0.com',
    clientID: 'W2JYTHEJIrMJf0Qaa7XN5Bvk5enH5Bhe',
    callbackURL: location.href,
    loginState: 'login'
  });

  $stateProvider
    .state('home', {
      url: '',
      views: {
        '': {
          templateUrl: '../app/home/views/home.html'
        },

        'nav@home': {
          templateUrl: '../partials/nav.html'
        },

        'jumbotron@home': {
          controller: 'SearchFormCtrl',
          templateUrl: '../partials/jumbotron.html'
        },

        'cities@home': {
          templateUrl: '../partials/cities.html'
        }
      }
    })

    .state('home.results', {
      url: '/activities/location/:location',
      controller: 'GetLocationCtrl',
      templateUrl: '/app/activities/views/activities-results.html'
    });

    // Used by auth0 redirect mode
    authProvider.on('loginSuccess', function($state) {
      $state.go('auth.about');
    });

    authProvider.on('loginFailure', function(error) {
      console.log("Error loggin in", error);
    });

})

.run(function(auth) {
  // Instantiate auth0 service.
  auth.hookEvents();
})

.controller('AppCtrl', function AppCtrl($scope, $location ) {

});
