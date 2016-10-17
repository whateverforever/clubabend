class Member {
  constructor(firstname,lastname){
    this.firstname = firstname;
    this.lastname = lastname;
    this.id = lastname+firstname+new Date().toJSON();
    this.history = [
      {
        date:"0",
        debate:{},
        wishGranted: false
      }];
    this.tmp = {
      format:null,
      role:null,
      inDebate:false
    };
  }

  setName(name){
    this.firstname = name;
  }

  setFormat(format){
      this.tmp.format = format;
  }

  setRole(role){
    this.tmp.role = role;
  }
}
