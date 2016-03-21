angular.module('mainApp', [
  'ui.router',
  'auth0',

  // Home App
  'mainApp.rsvp',
  'mainApp.search',
  'mainApp.login',
  'mainApp.auth',

  // Activities App
  'mainApp.activities'
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

    .state('activities', {
      url: '/activities',
      views: {
        '': {
          templateUrl: '/app/activities/views/activities.html'
        },
        'nav@activities': {
          templateUrl: '/partials/nav.html'
        },
        'search@activities': {
          templateUrl:'/app/activities/views/activities-search.html'
        }
      }
    })

    .state('activities.results', {
      url: '/activities/:location',
      controller: 'GetLocationController',
      templateUrl: '../pages/activities-results.html'
    });
})

.run(function(auth) {
  // Instantiate auth0 service.
  auth.hookEvents();
})

.controller('AppCtrl', function AppCtrl($scope, $location ) {

});
