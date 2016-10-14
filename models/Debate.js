"use strict";

function Debate(){
    this.teams = [];
    this.placement = [];
    this.motion = "";
    this.date = "";
    this.room = "";
    this.notes = "";
}

Debate.prototype.addTeam = function(people){
  var team = [];
  for(var person of people){
    team.push(person.id);
  }
  this.teams.push(team);
};
