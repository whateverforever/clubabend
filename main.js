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
  };//glog

  $scope.errors = [];
  $scope.displayErrors = false;
  //overwrite
  var log = console.error;
  console.error = function () {
    var index = 1;
    var replacements = arguments;
    var string = arguments['0'];
    var myError = "";
    if(string.indexOf("%s")>-1){
      myError = string.replace(/\%s/ig,function(){
        if(replacements[index]){
          return replacements[index++];
        }else{
          return "!!!";
        }
      });
    }else{
      myError = string;
    }
    $scope.errors.push(myError);
    log.apply(this, Array.prototype.slice.call(arguments));
  };

  $scope.showErrors = function(){
    $scope.displayErrors = !$scope.displayErrors;
  };

  $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
  $scope.goTo = function(target){
    $location.url(target);
  }
});
