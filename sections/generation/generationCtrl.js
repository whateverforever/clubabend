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
      ms.addMember(person);
    }
    ms.addMember(new Member("Donald J.","Trump"));//godemperor
  };//generateMembers

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
