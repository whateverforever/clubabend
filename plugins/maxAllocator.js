// @author Max
// @description Allocator to fill debate rooms

// IDs of People who want to debate:     scope.attendants
// Objects of all members:               scope.members
"use strict";

module.exports = function(){
  this.name = "Basic Plugin";
  this.author = "max";

  var scope = null;
  this.allowedFormats = ["OPD"];
  this.leftovers = [];
  this.validFormats = [];
  this.validMembers = [];

  this.init = function($scope){
    scope = $scope;
    this.setFormats();
    this.filterMembers();
    this.makeDebates();
  }

  this.setFormats = function(){
    for(var format of scope.formats){
      if(this.allowedFormats.containsObject(format.name)){
        this.validFormats.push(format);
      }else{
        console.log("maxAllocator can't build %s debates",format.name);
      }
    }
  };

  this.makeDebates = function(){
    for(var format of this.validFormats){
      if(this.validMembers.length < format.minPeople()){
        console.log("Not enough people for %s",format.name);
        for(var member in this.validMembers){
          this.leftovers.push(member);
        }
      }else{
        console.log("Let's make a debate");
      }
    }
  };

  this.filterMembers = function(){
    for(var i=0;i<scope.attendants.length;i++){
      var id = scope.attendants[i];
      var member = scope.memberByID(id);
      if(this.allowedFormats.containsObject(member.tmp.format.name)){
        this.validMembers.push(member);
      }
    }
  };

};//exports
