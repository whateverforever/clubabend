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
            var json = response.data;
            var format = new Format(json);
            availableFormats.push(format);
          }, function(error){
            console.error("Couldn't load format "+f+": "+error);
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
