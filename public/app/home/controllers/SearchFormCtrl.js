angular.module('mainApp.search', [
  'ui.router'
])

.controller('SearchFormCtrl', function($scope, $state, $http) {
  $scope.sortType = '';
  $scope.sortReverse = false;
  $scope.searchActivity = this.searchActivity;

  $scope.searchByLocation = function() {
    if(this.city) {
      console.log("Searching for activities in " + this.city + "...");

      $state.go('activities.results', {
        location: this.city,
        filterBy: ""
      });
    }
  };

  $scope.searchByActivity = function() {


    if(this.searchActivity && this.city) {
      console.log("Searching for '" + this.searchActivity + "' in " + this.city + "...");

      $state.go('activities.results', {
        location: this.city,
        filterBy: this.searchActivity
      });
    }
  };
});
