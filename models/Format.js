class Format{
  constructor(json){
    for(var key in json){
      this[key] = json[key];
    }
  }

  minPeople(){
    var minPeople = 0;
    for(var i=0;i<this.roles.length;i++){
      var role = this.roles[i];
      if(typeof role.num === "number"){
        minPeople += role.num;
      }else if(typeof role.num === "string"){
        minPeople += parseInt(role.num.split("-")[0]);
      }else{
        console.error("Unknown 'num' format of format '%s'",this.name);
      }
    }
    return minPeople;
  }
}
