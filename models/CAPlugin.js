class CAPlugin {
  constructor(){
    this.name = "Unnamed Plugin";
    this.author = "Unnamed Author";
    this.validFormats = [];
    this.validMembers = [];
    this.compatibleFormats = [];
  }

  // init will get called when the generate Debates Button is pressed
  // Use the services to access all members and available formats
  init(memberService,formatService){
    this.ms = memberService;
    this.fs = formatService;
  }

  go(){
    this.setFormats();
    this.filterMembers();
    this.makeDebates();
  }

  setFormats(){
    for(var format of this.fs.getAvailableFormats()){
      if(this.compatibleFormats.containsObject(format.name)){
        this.validFormats.push(format);
      }else{
        console.log("%s can't build %s debates",this.name,format.name);
      }
    }
  }

  // Get all the members, with formats this plugin can handle
  filterMembers(){
    var attendants = this.ms.getAttendants();
    for(var i=0;i<attendants.length;i++){
      var member =  attendants[i];
      if(this.compatibleFormats.containsObject(member.tmp.format.name)){
        this.validMembers.push(member);
      }
    }
  }
}//class
