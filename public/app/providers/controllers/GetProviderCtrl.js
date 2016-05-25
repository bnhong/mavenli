angular.module('mainApp.getProvider', [
  'ui.router',

  // Home App
  'mainApp.search',
  'mainApp.getLocation',

  // Activities App
  'mainApp.activities',

  // Activities App
  'mainApp.providers',

  // Login App
  'mainApp.login',
  'mainApp.auth'
])

.controller('GetProviderCtrl', ['$scope', '$http', '$stateParams',
  function($scope, $http, $stateParams) {

    console.log("inside ProviderController");
    console.log($stateParams);
    console.log($scope);

    $scope.providerID = $stateParams.providerID;
    $scope.activityId = $stateParams.activityID;

    // /api/activities/location/:location
    $http.get('/api/partners/' + $scope.providerID)
      .then(function(response) {
        $scope.provider = response.data[0];
        console.log($scope.provider);
        console.log($scope.provider.name);



      });
}]);
