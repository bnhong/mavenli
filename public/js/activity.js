angular.module('activityApp', ['ngRoute'])

// configure our routes
.config(function($routeProvider) {
  $routeProvider
    .when('/:location', {
      templateUrl: '../pages/activities-results.html',
      controller: 'GetLocationController',
      controllerAs: 'GetLocationCtrl'
    })
});
