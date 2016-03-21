angular.module('mainApp.search', [
  'ui.router'
])

.controller('SearchFormCtrl', function($scope, $state, $http) {
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
      $state.go('activities.results', {
        location: $scope.text
      });
    }

    if($scope.city) {
      $state.go('activities.results', {
        location: $scope.city
      });
    }
  };
});
