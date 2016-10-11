function Mitglied(firstname,lastname) {
  this.firstname = firstname;
  this.lastname = lastname;
  this.id = lastname+firstname+new Date().toJSON()
  this.preferences = {
    format:null,
    role:null
  };
  this.tmp = {
    format:null,
    role:null,
    inDebate:false
  };
}

Mitglied.prototype.setName = function(name){
  this.firstname = name;
}

Mitglied.prototype.setFormat = function(format,tmp){
  if(tmp){
    this.tmp.format = format;
  }else{
    this.preferences.format = format;
  }
}

Mitglied.prototype.setRole = function(role){
  this.tmp.role = role;
}
