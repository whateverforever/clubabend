"use strict";

var app = angular.module("clubabend",['ngRoute']);
var fs = require('fs');
var glog = null;

app.config(function($routeProvider){
  $routeProvider.when("/",{
    templateUrl:"./sections/generation/generation.html",
    controller: "generationCtrl"
  }).when("/settings",{
    templateUrl:"./sections/settings/settings.html",
    controller:"settingsCtrl"
  }).when("/settings/:id",{
    redirectTo:"/settings"
  }).otherwise({
    redirectTo:"/"
  });
});//config

app.controller("navCtrl",function($scope,$location,$rootScope){
  glog = function(string){
    var index = 1;
    var replacements = arguments;
    if(string.indexOf("%s")>-1){
      $rootScope.guiError = string.replace(/\%s/ig,function(){
        if(replacements[index]){
          return replacements[index++];
        }else{
          return "!!!";
        }
      });
    }else{
      $rootScope.guiError = string;
    }

    setTimeout(function(){
      $rootScope.$apply(function(){
        $rootScope.guiError = null;
      });
    },5000);
  };

  $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
  $scope.goTo = function(target){
    $location.url(target);
  }
});
