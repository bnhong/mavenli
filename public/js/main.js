angular.module('mainApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  //$urlRouterProvider.otherwise('/');

  $stateProvider
      .state('home', {
        url: '/',
        views: {
            // the main template will be placed here (relatively named)
            '': {
                templateUrl: '/templates/home.html'
            },

            //the child views will be defined here (absolutely named)
            'nav@home': {
                templateUrl: '/partials/nav.html'
            },

            'jumbotron@home': {
                templateUrl: '/partials/jumbotron.html'
            },

            'cities@home': {
                templateUrl: '/pages/cities.html',
                controller: 'CitiesController'
            }
        }

      })

      .state('results', {
        url: '/:location',
        templateUrl: '../pages/activities-results.html',
        controller: 'GetLocationController'
      })

      .state('about', {

      });
})

.controller('CitiesController', ['$scope', '$http',
    function($scope, $http) {
        $http.get('../json/locations.json')
            .success(function(data){
                $scope.destinations = data;
                console.log($scope.destinations);
            });
}])

.controller('GetLocationController', ['$scope', '$http', '$stateParams',
    function($scope, $http, $stateParams) {
        $scope.location = $stateParams.location;

        $http.get('/api/activities/location/' + $scope.location)
            .then(function(response){
                $scope.destinations = response.data;
                console.log($scope.destinations);
            });
}])

.controller('RsvpForm', ['$scope', '$http', function($scope, $http) {
    $scope.list = [];
    $scope.rsvpList = [];

    $scope.text;
    $scope.checkin;
    $scope.checkout;
    $scope.guests;


    $scope.submit = function() {
        if ($scope.text) {
            $scope.list.push(this.text);
            $scope.text = '';
            $scope.list.push(this.checkin);
            $scope.checkin = '';
            $scope.list.push(this.checkout);
            $scope.checkout = '';
            $scope.list.push(this.guests);
            $scope.guests = '';
        }
    };

    $scope.rsvp = function() {
        $scope.rsvpList.push({
            'searched': $scope.text,
            'checkin': $scope.checkin,
            'checkout': $scope.checkout,
            'guests': $scope.guests
        });

        var dataObj = {
            searched : $scope.text,
            checkin : $scope.checkin,
            checkout : $scope.checkout,
            guests : $scope.guests
        };

      $http.post('../json/temp.json', dataObj)
          .success(function(data, status, headers, config) {
              $scope.message = data;
          });

      $scope.text = '';
      $scope.checkin = '';
      $scope.checkout = '';
      $scope.guests = '';
    };
}]);
