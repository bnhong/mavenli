angular.module('mainApp')

.controller('GetLocationController', ['$scope', '$http', '$stateParams',
    function($scope, $http, $stateParams) {
        $scope.location = $stateParams.location;

        $http.get('/api/activities/location/' + $scope.location)
            .then(function(response){
                $scope.destinations = response.data;
                console.log($scope.destinations);
            });
}]);
