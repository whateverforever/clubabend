app.controller("generationCtrl",function($scope,formatService,pluginService,$route){
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
    $scope.attendants.push(member.id);
  };//addAttendant

  $scope.memberByID = function(id){
    for(var i=0;i<$scope.members.length;i++){
      if($scope.members[i].id === id){
        return $scope.members[i];
      }
    }
    console.error("No member with ID: %s",id);
    return {};
  }

  $scope.showAttendant = function(i){
    console.log($scope.attendants[i]);
  };

  $scope.makeDebates = function(){
    //FIXME
    var plugin = $scope.plugins[0];
    plugin.init($scope);
  };
});
