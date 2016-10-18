class Format{
  constructor(json){
    for(var key in json){
      this[key] = json[key];
    }
  }

  minPeople(){
    var minPeople = 0;
    for(var team of this.teams){

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
