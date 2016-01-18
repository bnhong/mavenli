var TAP = {};  // wrapper object pattern

TAP.mean = angular.module('meanapp', ['ngResource', 'ui.bootstrap']);

TAP.mean.config(function ($routeProvider)
{
    $routeProvider.
        when('/', {
            controller: "",
            templateUrl: 'views/pages/index.ejs'
        }).
        otherwise({
            redirectTo: '/'
        });
});
