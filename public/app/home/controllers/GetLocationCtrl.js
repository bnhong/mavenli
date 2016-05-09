angular.module('mainApp.getLocation', [
  'ui.router',

  // Home App
  'mainApp.search',

  // Activities App
  'mainApp.activities',

  // Login App
  'mainApp.login',
  'mainApp.auth'
])

.controller('GetLocationCtrl', function($scope, $http, $state, $stateParams) {
  $scope.location = $stateParams.location;
  $scope.activityId = $stateParams.activityID;
  $scope.searchActivity = $stateParams.filterBy;

  // /api/activities/location/:location
  $http.get('/api/activities/location/' + $scope.location)
    .then(function(response) {
        $scope.destinations = response.data;

        if($scope.activityId) {
          for(var i = 0; i < $scope.destinations.length; i++) {
            if($scope.activityId == $scope.destinations[i].activityID) {
              $scope.currentActivity = $scope.destinations[i];
              console.log($scope.currentActivity);
            }
          }
        }
    });

  $scope.goToRsvp = function(value) {
    $state.go('rsvp.description', {
      location: $scope.location,
      activityID: value
    });
  };

  $scope.goToCreate = function() {
    console.log("goToCreate");
    $state.go('activities.create');
  };

  $scope.createRsvp = function(value) {
    var rsvpObj;
    var reservationId;           // String,
    var providerId;              // String,
    var activityId;              // String,
    var userId;                  // String,
    var checkin;                 // Date,
    var name;                    // String,
    var price;                   // Number,
    var completed;               // Boolean,

    if(this.name && this.email && this.checkin) {
      for(var i=0; i<this.destinations.length; i++) {
        if(value == this.destinations[i].activityID) {
          reservationId = this.name[0].toString() + this.destinations[i].providerID.toString()
            + "00000" + this.destinations[i].activityID.toString();
          providerId = this.destinations[i].providerID.toString();
          activityId = this.destinations[i].activityID.toString();
          userId = this.email.toString();
          checkin = new Date(this.checkin);
          name = this.name;
          price = this.destinations[i].price;
          completed = false;

          rsvpObj = {
            'reservationID' : reservationId,
            'providerID'    : providerId,
            'userID'        : userId,
            'activityID'    : activityId,
            'startTime'     : checkin,
            'bookedPrice'   : price,
            'completed'     : completed,
          };
        }
      }
    }
    else {
      console.log("Please fill out the form.");
    }

    console.log(rsvpObj);
    if(rsvpObj != null) {
      $http.post('/api/reservations', rsvpObj)
        .then(function(response) {
          console.log("response.data = ");
          console.log(response.data);
          console.log("$http.post succeeded!");
        });
    }
  };

  $scope.deleteRsvp = function() {

    $http.delete('/api/reservations/' + this.name)
    .then(function(response) {
      console.log(response);
    },
    function(response) {
      console.log("$http delete failed. :-(((");
    });
  };
});
