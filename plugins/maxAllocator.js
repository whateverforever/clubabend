// @author Max
// @description Allocator to fill debate roothis.ms

// Inherits from CAPlugin
// See ./models/CAPlugin.js for reference
"use strict";

class BasicPlugin extends CAPlugin{
  constructor(){
    super();
    this.name = "Basic Plugin";
    this.author = "max";

    this.leftovers = [];
    this.compatibleFormats = ["OPD"];
  }

  makeDebates(){
    for(var format of this.validFormats){
      if(this.validMembers.length < format.minPeople()){
        glog("Not enough people for %s",format.name);
        for(var member in this.validMembers){
          this.leftovers.push(member);
        }
      }else{
        this.fillDebateByPriority(format);
      }
    }
  }

  fillDebateByPriority(format){
    for(var member of this.validMembers){
      if(member.tmp.format == format){
          var i = 0;
          var lastXDebates = 50;
          var wishesGranted = 0;
          for(var past of member.history){
            if(i>=lastXDebates){
              break;
            }
            if(past.wishGranted){
              wishesGranted++;
            }
            i++;
          }//for past
          member.tmp.wishesGranted = wishesGranted;
      }
    }//for member
    this.sortMembersByWishesGranted();
    for(var member of this.validMembers){
      //TODO! AddbyWish, oder auch nicht...
    }
  }

  // the lower the index, the less wishes were granted in the past
  sortMembersByWishesGranted(){
    this.validMembers.sort(function(memberA,memberB){
      if(memberA.tmp.wishesGranted < memberB.tmp.wishesGranted){
        return -1;
      }
      if(memberA.tmp.wishesGranted > memberB.tmp.wishesGranted){
        return 1;
      }
      return 0;
    });
  }//sort
};

module.exports = BasicPlugin;
