// @author Max
// @description Allocator to fill debate roothis.ms

// Inherits from CAPlugin
// See ./models/CAPlugin.js for reference
"use strict";

function BasicPlugin(){
  CAPlugin.call(this);
  this.name = "Basic Plugin";
  this.author = "max";

  this.leftovers = [];
  this.compatibleFormats = ["OPD"];

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
};

BasicPlugin.prototype = Object.create(CAPlugin.prototype);
module.exports = BasicPlugin;
