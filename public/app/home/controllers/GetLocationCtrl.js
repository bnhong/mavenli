angular.module('mainApp.location', [
  'ui.router',

  // Home App
  'mainApp.rsvp',
  'mainApp.search',

  // Activities App
  'mainApp.activities',

  // Login App
  'mainApp.login',
  'mainApp.auth'
])

.controller('GetLocationCtrl',
  function($scope, $http, $state, $stateParams) {
    $scope.location = $stateParams.location;
    $scope.activityId = $stateParams.activityID;

    console.log($stateParams);

    // /api/activities/location/:location
    $http.get('/api/activities/location/' + $scope.location)
      .then(function(response){
          $scope.destinations = response.data;
          console.log($scope.destinations);
          console.log("$http.get was successful!");

          if($scope.activityId) {
            console.log("IF?!");
            console.log($scope.destinations.length);

            for(var i = 0; i < $scope.destinations.length; i++) {
              console.log($scope.destinations[i]);
              console.log($scope.destinations[i].activityID);
              if($scope.activityId == $scope.destinations[i].activityID) {
                console.log("SUCCESS, FINALLY!");
                $scope.currentActivity = $scope.destinations[i];
                console.log($scope.currentActivity);
              }
            }

          }
      });

    $scope.goToRsvp = function(value) {
      console.log(value);
      if(value == $scope.destinations[0].activityID ) {
        console.log($scope.destinations[0]);
        console.log($scope.destinations[0].activityID);
        console.log($scope.destinations[0].title);
      }

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
      var dataObj1;
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

            dataObj1 = {
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

      console.log(dataObj1);
      if(dataObj1 != null) {
        $http.post('/api/reservations', dataObj1)
          .then(function(response) {
            console.log("response = ");
            console.log(response);
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

    $scope.createActivity = function() {
      // Create Activity
      var dataObj2;
      var activityID;          // String,
      var providerID;          // String,
      var location;            // String,
      var descriptionTagsList; // []],
      var title;               // String,
      var description;         // String,
      var duration;            // Date,
      var destinationList;     // [],
      var transportIncluded;   // Boolean,
      var foodIncluded;        // Boolean,
      var lodgingIncluded;     // Boolean,
      var ticketsIncluded;     // Boolean,
      var equipmentIncluded;   // Boolean,
      var price;               // Number,
      var pricePointScore;     // Number,
      var adventurePointScore; // Number

      if(this.activityId && this.provider && this.location && this.title && this.description && this.price) {

        activityID = this.activityId;
        providerID = this.provider;
        location = this.location;
        title = this.title;
        description = this.description;
        price = this.price;

        dataObj2 = {
          'activityID'    : activityID,
          'providerID'    : providerID,
          'location'      : location,
          'title'         : title,
          'description'   : description,
          'price'         : price,
        };
        console.log(dataObj2);
      }
      else {
        console.log("Please fill out the form.");
      }

      if(dataObj2 != null) {
        $http.post('/api/activities', dataObj2)
          .then(function(response) {
            console.log("response = ");
            console.log(response);
            console.log("response.data = ");
            console.log(response.data);
            console.log("$http.post to //api//activities succeeded!");
          });
      }
    };
  });
