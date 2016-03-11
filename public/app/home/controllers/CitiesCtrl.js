angular.module('mainApp')

.controller('CitiesController', ['$scope', '$http',
    function($scope, $http) {
        $http.get('../json/locations.json')
            .success(function(data){
                $scope.destinations = data;
                console.log($scope.destinations);
            });
}]);
