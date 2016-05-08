angular.module('mainApp.rsvp', [])

.controller('RsvpFormController', function($scope, $http) {
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
});
