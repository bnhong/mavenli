angular.module('mainApp.activities', [
  'ui.router',

  // Home App
  'mainApp.rsvp',
  'mainApp.search',
  'mainApp.location',

  // Login App
  'mainApp.login',
  'mainApp.auth'
])

// TODO: move Activities states from app.js to here.
.config(function($stateProvider) {
  $stateProvider
    .state('activities', {
      url: '/activities',
      views: {
        '': {
          templateUrl: '/app/activities/views/activities.html'
        },
        'nav@activities': {
          templateUrl: '/partials/nav.html'
        },
        'search@activities': {
          templateUrl:'/app/activities/views/activities-search.html'
        }
      }
    })

    .state('activities.results', {
      url: '/location/:location',
      controller: 'GetLocationCtrl',
      templateUrl: '/app/activities/views/activities-results.html'
    })

      .state('activities.resultsByActivity', {
        url: '/:location',
        controller: 'GetActivityCtrl', // currently not used
        templateUrl: '/app/activities/views/activities-resultsbyactivity.html'
      })

    .state('activities.createActivity', {
      url: '/create',
      controller: 'GetLocationCtrl',
      templateUrl: '/app/activities/views/activities-create.html',
      // Not needed because state inherits from auth.
      // data: {
      //   requiresLogin: true
      // }
    })

    .state('rsvp', {
      url: '/rsvp',
      views: {
        '': {
          templateUrl: '/app/activities/views/activities-rsvp.html'
        },
        'nav@activities': {
          templateUrl: '/partials/nav.html'
        }
      }
    })

    .state('rsvp.description', {
      url: '/:location/:activityID',
      controller: 'GetLocationCtrl',
      templateUrl: '/app/activities/views/activities-rsvp-description.html'
    })
})

.controller('ActivitiesCtrl', function($scope, $state) {
  // $scope.list = [];

  $scope.activity;
  $scope.city;

  var searchable = false;
  //$scope.date;


  /* REMOVE: Search by City
  $scope.search = function() {
    console.log("Searching...");

    if($scope.text) {
      $state.go('activities.results', {
        location: $scope.text
      });
    }

    if($scope.city) {
      $state.go('activities.results', {
        location: $scope.city
      });
    }
  };
   */

  $scope.search = function() {
    console.log("Searching...");

    if($scope.city) {
      searchable = true;
      //continue
    }

    if($scope.activity && searchable == true) {
      //TO DO: Add filter for activities search field.
      $state.go('activities.results', {
        location: $scope.city
      });
    }

  }

  $scope.goToDescription = function() {
    console.log("activities::goToDescription");

    $state.go('activities.description');
  };

  /*
  $scope.findValue = function(enteredValue) {
    angular.forEach($scope.myData.SerialNumbers, function(value, key) {
        if (key === enteredValue) {
            $scope.list.push({serial: key, owner: value[0].Owner});
        }
    });
  };
  */

  $scope.findValue = function(value) {

  };

  $scope.createRsvp = function($scope, $http) {
    $scope.rsvp = this.rsvp;

    $scope.reservationId = "000001";
    $scope.providerId;
    $scope.activityId;
    $scope.userId = this.email;
    $scope.checkin = this.checkin;
    $scope.name = this.name;
    $scope.price;
    $scope.completed = false;

    console.log($scope.reservationId);

    var data = {
      reservationID : $scope.reservationId,
      providerID    : $scope.providerId,
      userID        : $scope.userId,
      activityID    : $scope.activityId,
      startTime     : $scope.checkin,
      bookedPrice   : $scope.price,
      completed     : $scope.completed,
    };

    $http.post('/someUrl', data, config)
      .then(function(response){
        $scope.destinations = response.data;
        console.log($scope.destinations);
    });
  }
});
