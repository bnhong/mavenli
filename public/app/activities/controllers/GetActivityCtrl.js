angular.module('mainApp.getActivity', [
  'ui.router',

  // Home App
  'mainApp.search',
  'mainApp.getLocation',

  // Activities App
  'mainApp.activities',

  // Login App
  'mainApp.login',
  'mainApp.auth'
])

.controller('GetActivityCtrl', ['$scope', '$http', '$stateParams',
  function($scope, $http, $stateParams) {
    $scope.location = $stateParams.location;
    $scope.activityId = $stateParams.activityID;

    // /api/activities/location/:location
    $http.get('/api/activities/location/' + $scope.location)
      .then(function(response) {
        $scope.destinations = response.data;

        if($scope.activityId) {
          for(var i = 0; i < $scope.destinations.length; i++) {
            if($scope.activityId == $scope.destinations[i].activityID) {
              $scope.currentActivity = $scope.destinations[i];
            }
          }
        }
      });
}]);
