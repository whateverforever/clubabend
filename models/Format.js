function Format(name){
  this.name = name;
  this.roles = [
    new Rolle("Speak","roleSpeak"),
    new Rolle("Judge","roleJudge"),
    new Rolle("Either","roleEither")
];
  this.addRole = function(role){
    this.roles.push(role);
  };
}
