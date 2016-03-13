angular.module('mainApp', [
  'ui.router',
  'mainApp.login',
  'auth0'
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
          templateUrl: '../templates/home.html'
        },

        'jumbotron@home': {
          templateUrl: '../partials/jumbotron.html'
        },

        'cities@home': {
          templateUrl: '../partials/cities.html'
        }
      }
    })

    .state('home.results', {
      url: '/location/:location',
      controller: 'GetLocationController',
      templateUrl: '../pages/activities-results.html'
    })

    .state('about', {
      url: '/about',
      templateUrl: '../pages/about.html',
      data: {
        requiresLogin: true
      }
    });
})

.run(function(auth) {
  // Instantiate auth0 service.
  auth.hookEvents();
})

.controller('AppCtrl', function AppCtrl($scope, $location ) {

});
