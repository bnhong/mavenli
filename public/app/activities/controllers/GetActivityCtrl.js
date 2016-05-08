angular.module('mainApp.activity', [])

.controller('GetActivityCtrl', ['$scope', '$http', '$stateParams',
  function($scope, $http, $stateParams) {
    $scope.location = $stateParams.location;

    // /api/activities/location/:location
    $http.get('/api/activities/location/' + $scope.location)
      .then(function(response){
          $scope.destinations = response.data;
          console.log("GET by location");
          console.log($scope.destinations);
      });

    // /api/activities/:activityID
    $http.get('/api/activities/' + $scope.destinations.activityId)
      .then(function(response){
          $scope.activity = response.data;
          console.log("GET by activityID");
          console.log($scope.activity);
      });


}]);
