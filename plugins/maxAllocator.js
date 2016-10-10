// @author Max
// @description Allocator to fill debate rooms
"use strict";

module.exports = function(){
  var scope = this;
  scope.allowedFormats = ["OPD"];
  scope.availableFormats = [];
  scope.validMembers = [];

  this.setFormats = function(formats){
    for(var i=0;i<formats.length;i++){
      var format = formats[i];
      if(scope.allowedFormats.containsObject(format.name)){
        scope.availableFormats.push(format);
      }
    }
  };

  this.getMinPplByFormat = function(format){
    var minPpl = 0;

    for(var j=0;j<format.roles.length;j++){
      var role = format.roles[j];
      var num = role.num;
      if(typeof num === "string"){
        var minmax = num.split("-");
        minPpl += parseInt(minmax[0]);
      }else if(typeof num === "number"){
        minPpl += num;
      }else{
        console.error("maxAllocator: %s.%s.num neither number nor string",format.name,role.id);
      }
    }

    return minPpl;
  };

  this.makeDebates = function(members){
    for(var i=0;i<members.length;i++){
      var member = members[i];
      if(scope.allowedFormats.containsObject(member.tmp.format.name)){
        scope.validMembers.push(member);
      }
    }

    for(var i=0;i<scope.availableFormats.length;i++){
      var format = scope.availableFormats[i];
      var minPpl = scope.getMinPplByFormat(format);
      console.log("Min people for %s debate: %d",format.name,minPpl);
      if(scope.validMembers.length<minPpl){
        console.error("Cant create %s debate. Too few peoplez",format.name);
      }else{
        console.log("Will create debate :)");
      }
    }
  };
};
