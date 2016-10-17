class Format{
  constructor(json){
    for(var key in json){
      this[key] = json[key];
    }
  }

  minPeople(){
    var minPeople = 0;
    for(var i=0;i<this.teams.length;i++){
      var team = this.teams[i];
      if(typeof team.num === "number"){
        minPeople += team.num;
      }else if(typeof team.num === "string"){
        minPeople += parseInt(team.num.split("-")[0]);
      }else{
        console.error("Unknown 'num' format of format '%s'",this.name);
      }
    }
    return minPeople;
  }
}
