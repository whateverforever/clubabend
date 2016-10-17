app.service("memberService",function(){
  var members = [];
  var attendants = [];
  return {
    memberByID:function(id){
      for(var member in members){
        if(member.id === id){
          return member;
        }
      }
      console.error("Couldnt find member with id %s",id);
    },
    addMember: function(member){
      members.push(member);
    },
    getMembers: function(){
      return members;
    },
    addAttendant: function(tmpPerson){
      attendants.push(tmpPerson);
    },
    getAttendants: function(){
      return attendants;
    }
  };
});

app.service("formatService",function($http){
  var availableFormats = null;

  return {
    formatByName:function(name){
      for(var format of availableFormats){
        if(format.name == name){
          return format;
        }
      }
    },
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
  var activePlugin = null;

  return {
    getAvailablePlugins: function(){
      if(availablePlugins){
        return availablePlugins;
      }else{
        availablePlugins = [];
        var files = fs.readdirSync('./plugins/');
        files.forEach(function(f) {
          var plugin = require('./plugins/'+f);
          availablePlugins.push(new plugin);
          console.log("Loaded plugin %s",f);
        });

        if(!activePlugin){
          if(availablePlugins.length===1){
            activePlugin = availablePlugins[0];
          }else{
            //TODO
            activePlugin = availablePlugins[0];
          }
        }

        return availablePlugins;
      }
    },
    getActivePlugin:function(){
      if(activePlugin){
        return activePlugin;
      }else{
        return null;
      }
    },
    setActivePlugin: function(newPlugin){
      if(typeof newPlugin === "string"){
        for(var tmpPlugin of availablePlugins){
          if(tmpPlugin.name === newPlugin){
            activePlugin = tmpPlugin;
            return;
          }
        }
        console.error("Couldnt find plugin named %s",newPlugin);
      }else{
        activePlugin = newPlugin;
      }
    }
  };
});
