angular.module('activityApp')

.controller('GetLocationController', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
    $scope.location = $routeParams.location;

    $http.get('/api/activities/location/' + $scope.location)
      .then(function(response){
        $scope.destinations = response.data;
        console.log($scope.destinations);
      });
  }])

.controller('CitiesController', ['$scope', '$http',
  function($scope, $http) {
    $http.get('../json/locations.json')
      .success(function(data){
        $scope.destinations = data;
        console.log($scope.destinations);
      });
  }])

.controller('defaultController',
  function($scope) {
    $scope.message = 'Search for activities in your area!';
  });
