angular.module('mainApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to ''
  $urlRouterProvider.otherwise('');

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
          url: '/:location',
          templateUrl: '../pages/activities-results.html',
          controller: 'GetLocationController'
      })

      .state('about', {
          // TBD
      });
});
