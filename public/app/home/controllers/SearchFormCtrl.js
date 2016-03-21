angular.module('mainApp.search', [
  'ui.router'
])

.config(function($stateProvider) {
  /*
  $stateProvider
    .state('search', {
      url: '/location/:location',
      controller: 'GetLocationController',
      templateUrl: '../pages/activities-results.html'
    });
    */
})

.controller('searchFormCtrl', function($scope, $state, $http) {
  $scope.list = [];

  $scope.text;
  $scope.city;

  $scope.submit = function() {
    if($scope.city) {
      $scope.list.push(this.city);
      $scope.city = '';
    }

    if($scope.text) {
      $scope.list.push(this.text);
      $scope.text = '';
    }

    console.log($scope.list);
  };

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

    /*$state.go('activities', {
      location: 'San Francisco'
    });*/
  };



});
