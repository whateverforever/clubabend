var app = angular.module("clubabend",['ngRoute']);
var fs = require('fs');

app.config(function($routeProvider){
  $routeProvider.when("/",{
    templateUrl:"./sections/generation/generation.html",
    controller:"generationCtrl"
  }).when("/settings",{
    templateUrl:"./sections/settings/settings.html"
  }).otherwise({
    redirectTo:"/"
  });
});//config

app.controller("navCtrl",function($scope,$location){
  $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});
