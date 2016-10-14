app.controller("settingsCtrl",function($scope,$location,$routeParams,formatService,pluginService){
  $scope.id = $routeParams.id;
  $scope.pluginPath = "./sections/settings/"+$routeParams.id + ".html";
  $scope.formats = formatService.getAvailableFormats();
  $scope.plugins = pluginService.getAvailablePlugins();
  $scope.activePlugin = pluginService.getActivePlugin();

  $scope.setActivePlugin = function(index){
    var plugin = $scope.plugins[index];
    pluginService.setActivePlugin(plugin);
    $scope.activePlugin = plugin;
  };
});
