angular.module('mainApp.createProvider', [
  'ui.router'
])

.controller('CreateProviderCtrl', function($scope, $http) {
    console.log("INSIDE CONTROLLER");

    $scope.provider = {};

    $scope.createProvider = function(){

      // Create Provider
      var provider = $scope.provider;
      var providerObj;
      var providerID;                   // String,
      var name;                         // String,
      var address;                      // String,
      var phoneNumber;                  // Number,
      var email;                        // String,
      var bio;                          // String,
      var password;                     // String,
      var currentlyWorking;             // Boolean,
      var rating;                       // Number,
      var reviewsList;                  // [],
      var pastActivitiesList;           // []]

      console.log($scope.provider);
      console.log(provider.name);


      if(provider.name && provider.address && provider.phoneNumber && provider.email && provider.bio && provider.password) {
        name = provider.name;
        address = provider.address;
        phoneNumber = provider.phoneNumber;
        email = provider.email;
        bio = provider.bio;
        password = provider.password;

        providerObj = {
          'providerID'       : email,
          'name'             : name,
          'address'          : address,
          'phoneNumber'      : phoneNumber,
          'email'            : email,
          'bio'              : bio,
          'password'         : password,
        };
      }
      else {
        console.log("Please fill out the form.");
      }

      if(providerObj != null){
        $http.post("/api/partners", providerObj)
        .then(function(response) {
          console.log("response.data = ");
          console.log(response.data);
          console.log("$http.post to /api/partners succeeded!");
        });
      }

    };

  });
