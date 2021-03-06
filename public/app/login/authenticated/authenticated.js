angular.module('mainApp.auth', [
  'ui.router'
])

.config(function($stateProvider) {
  $stateProvider
    .state('auth', {
      abstract: true,
      data: {
        requiresLogin: true
      },
      views: {
        '': {
          templateUrl: '../app/login/authenticated/authenticated.html',
          controller: 'AuthCtrl'
        },

        'nav@auth': {
          templateUrl: '../partials/nav_authd.html',
          controller: 'AuthCtrl'
        }
      }
    })

    .state('auth.about', {
      url: '/about',
      templateUrl: '../pages/about.html',
      // Not needed because state inherits from auth.
      data: {
        requiresLogin: true
      }
    });
})

.controller('AuthCtrl', function($scope, auth, $state) {
  $scope.auth = auth;

  $scope.logout = function() {
    auth.signout();
    // Can also redirect to About which redirects to login but this saves a step.
    $state.go('login');
  }
})

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
