angular.module('mainApp.activities', [
  'ui.router',

  // Home App
  'mainApp.search',
  'mainApp.getLocation',

  // Activities App
  'mainApp.getActivity',
  'mainApp.createActivity',

  // Login App
  'mainApp.login',
  'mainApp.auth'
])

.config(function($stateProvider) {
  $stateProvider
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
          controller: 'SearchFormCtrl',
          templateUrl: '/app/activities/views/activities-search.html'
        }
      }
    })

    .state('activities.results', {
      url: '/location/:location',
      controller: 'GetLocationCtrl',
      templateUrl: '/app/activities/views/activities-results.html',
      params: {
        filterBy: ""
      }
    })

    .state('activities.createActivity', {
      url: '/create',
      controller: 'GetLocationCtrl',
      templateUrl: '/app/activities/views/activities-create.html',
      // Not needed because state inherits from auth.
      // data: {
      //   requiresLogin: true
      // }
    })

    .state('rsvp', {
      url: '/rsvp',
      views: {
        '': {
          templateUrl: '/app/activities/views/activities-rsvp.html'
        },
        'nav@activities': {
          templateUrl: '/partials/nav.html'
        }
      }
    })

    .state('rsvp.description', {
      url: '/:location/:activityID',
      controller: 'GetActivityCtrl',
      templateUrl: '/app/activities/views/activities-rsvp-description.html'
    });
})

.controller('ActivitiesCtrl', function($scope, $state) {

});
