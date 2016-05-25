angular.module('mainApp.providers', [
  'ui.router',

  // Home App
  'mainApp.search',
  'mainApp.getLocation',

  // Activities App
  'mainApp.getActivity',
  'mainApp.createActivity',

  // Providers App
  'mainApp.getProvider',
  'mainApp.createProvider',

  // Login App
  'mainApp.login',
  'mainApp.auth'
])

.config(function($stateProvider) {
  $stateProvider
    .state('providers', {
      url: '/providers',
      views: {
        '': {
          templateUrl: '/app/providers/views/providers.html'
        },
        'nav@providers': {
          templateUrl: '/partials/nav.html'
        }
      },
      controller: 'ProvidersCtrl'
    })

    .state('providers.createProvider', {
      url: '/create',
      controller: 'CreateProviderCtrl',
      templateUrl: '/app/providers/views/providers-create.html',
    })

    .state('providers.getProvider', {
      url: '/view/:providerID',
      controller: 'GetProviderCtrl',
      templateUrl: '/app/providers/views/providers-results.html',
    });

})

.controller('ProvidersCtrl', function($scope, $state) {

});
