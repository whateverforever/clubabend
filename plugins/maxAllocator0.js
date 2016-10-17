// @author Max
// @description Allocator to fill debate roothis.ms

// Inherits from CAPlugin
// See ./models/CAPlugin.js for reference
"use strict";

class BasicPlugin extends CAPlugin{
  constructor(){
    super();
    this.name = "Basic Plugin 2";
    this.author = "max";

    this.leftovers = [];
    this.compatibleFormats = ["OPD","BP"];
  }

  makeDebates(){
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

module.exports = BasicPlugin;
