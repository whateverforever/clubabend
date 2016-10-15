// @author Max
// @description Allocator to fill debate roothis.ms

// Inherits from CAPlugin
// See ./models/CAPlugin.js for reference
"use strict";

function BasicPlugin(){
  this.name = "Basic Plugin";
  this.author = "max";
  
  this.leftovers = [];
  this.compatibleFormats = ["OPD"];

  this.go = function(){
    this.setFormats();
    this.filterMembers();
    this.makeDebates();
  };

  this.setFormats = function(){
    for(var format of this.fs.getAvailableFormats()){
      if(this.compatibleFormats.containsObject(format.name)){
        this.validFormats.push(format);
      }else{
        console.log("maxAllocator can't build %s debates",format.name);
      }
    }
  };

  this.makeDebates = function(){
    for(var format of this.validFormats){
      if(this.validMembers.length < format.minPeople()){
        glog("Not enough people for %s",format.name);
        for(var member in this.validMembers){
          this.leftovers.push(member);
        }
      }else{
        console.log("Let's make a debate");
      }
    }
  };

  this.filterMembers = function(){
    var attendants = this.ms.getAttendants();
    for(var i=0;i<attendants.length;i++){
      var member =  attendants[i];
      if(this.compatibleFormats.containsObject(member.tmp.format.name)){
        this.validMembers.push(member);
      }
    }
  };
};

BasicPlugin.prototype = Object.create(CAPlugin.prototype);
module.exports = BasicPlugin;
