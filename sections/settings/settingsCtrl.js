app.controller("settingsCtrl",function($scope,$location,$routeParams,formatService,pluginService){
  $scope.id = $routeParams.id;
  $scope.pluginPath = "./sections/settings/"+$routeParams.id + ".html";
  $scope.formats = formatService.getAvailableFormats();
  $scope.plugins = pluginService.getAvailablePlugins();
});
