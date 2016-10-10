var app = angular.module("clubabend",[]);
var fs = require('fs');

app.controller("mainCtrl",function($scope,formatService,pluginService){
  $scope.members = [];
  $scope.attendants = [];
  $scope.formats = formatService.getAvailableFormats();
  $scope.plugins = pluginService.getAvailablePlugins();

  $scope.generateMembers = function(){
    for(var i=0;i<100;i++){
      var person = new Mitglied(chance.first(),chance.last());
      $scope.members.push(person);
    }
    $scope.members.push(new Mitglied("Donald J.","Trump"));//godemperor
  };//generateMembers

  $scope.addAttendant = function(member){
    member.tmp.inDebate = true;
    $scope.attendants.push(member);
  };//addAttendant

  $scope.showAttendant = function(i){
    console.log($scope.attendants[i]);
  };

  $scope.makeDebates = function(){
    //FIXME
    var plugin = new $scope.plugins[0];
    plugin.setFormats($scope.formats);
    plugin.makeDebates($scope.attendants);
  };
});

app.service("formatService",function($http){
  var availableFormats = null;

  return {
    getAvailableFormats: function(){
      if(availableFormats){
        return availableFormats;
      }else{
        availableFormats = [];

        var files = fs.readdirSync('./formats/');
        files.forEach(function(f){
          $http.get('./formats/'+f).then(function(response){
            var format = response.data;
            availableFormats.push(format);
          }, function(error){
            console.error(error);
          });
        });

        return availableFormats;
      }
    }
  };
});

app.service("pluginService",function(){
  var availablePlugins = null;

  return {
    getAvailablePlugins: function(){
      if(availablePlugins){
        return availablePlugins;
      }else{
        availablePlugins = [];
        var files = fs.readdirSync('./plugins/');
        files.forEach(function(f) {
          var plugin = require('./plugins/'+f);
          availablePlugins.push(plugin);
        });
        return availablePlugins;
      }
    }
  };
});
