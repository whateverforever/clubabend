app.controller("generationCtrl",function($scope,formatService,pluginService,memberService,$route){
  var ms = memberService;
  var fs = formatService;
  $scope.members = ms.getMembers();
  $scope.attendants = ms.getAttendants();
  $scope.formats = fs.getAvailableFormats();
  $scope.plugins = pluginService.getAvailablePlugins();
  $scope.activePlugin = pluginService.getActivePlugin();

  $scope.generateMembers = function(){
    for(var i=0;i<100;i++){
      var person = new Member(chance.first(),chance.last());
      var tmpHistory = {
        date:chance.date({string: true}),
        debate:{},
        wishGranted:chance.bool()
      };
      person.history.push(tmpHistory);

      ms.addMember(person);
    }
    console.error("asdasdasdasd");
    ms.addMember(new Member("Donald J.","Trump"));//godemperor
  };//generateMembers

  $scope.makeAttend = function(){
    var i=0;
    for(var member of $scope.members){
      member.tmp.format = fs.formatByName("OPD");
      $scope.addAttendant(member);
      i++;
      if(i>=15){
        return;
      }
    }
  }

  $scope.addAttendant = function(member){
    member.tmp.inDebate = true;
    ms.addAttendant(member);
  };//addAttendant

  $scope.showAttendant = function(i){
    console.log($scope.attendants[i]);
  };

  $scope.makeDebates = function(){
    var plugin = $scope.activePlugin;
    if(plugin){
      plugin.init(ms,fs);
      plugin.go();
    }else{
      glog("Kein Plugin ist aktiviert! Gehe in die Einstellungen und such dir eins aus.");
    }
  };
});
