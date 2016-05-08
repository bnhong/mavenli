angular.module('mainApp.createActivity', [
  'ui.router'
])

.controller('CreateActivityCtrl',
  function($scope, $http, $state, $stateParams) {

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

      if(this.activityId && this.providerId && this.location && this.title && this.description && this.price) {

        activityID = this.activityId;
        providerID = this.providerId;
        location = this.location;
        title = this.title;
        description = this.description;
        price = this.price;

        dataObj1 = {
          'activityID'    : reservationId,
          'providerID'    : providerId,
          'location'      : userId,
          'title'         : activityId,
          'description'   : checkin,
          'price'         : price,
        };
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
