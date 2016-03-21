angular.module('mainApp.activities', [
  'ui.router'
])

/* TODO: moe Activities states from app.js to here.
.config(function($stateProvider) {
  $stateProvider
    .state('activities', {
      url: '',
      views: {
        '': {
          templateUrl: '../app/activities/views/activities.html'
        },

        'nav@activities': {
          templateUrl: '../partials/nav.html'
        }
      }
    })

    .state('activities.results', {
      url: '/activities/:location',
      controller: 'GetLocationController',
      templateUrl: '../pages/activities-results.html'
    })
})*/

.controller('ActivitiesCtrl', function($scope, $state) {
  $scope.list = [];

  $scope.text;
  $scope.city;
  $scope.date;

  $scope.search = function() {
    console.log("Searching...");

    if($scope.text) {
      $state.go('activities', {
        location: $scope.text
      });
    }

    if($scope.city) {
      $state.go('activities', {
        location: $scope.city
      });
    }
  };
});
