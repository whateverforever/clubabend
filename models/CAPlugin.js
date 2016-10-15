function CAPlugin(){
}

// init will get called when the generate Debates Button is pressed
// Use the services to access all members and available formats
CAPlugin.prototype.init = function (memberService,formatService) {
    this.name = "Unnamed Plugin";
    this.author = "Unnamed Author";
    this.ms = memberService;
    this.fs = formatService;
    this.validFormats = [];
    this.validMembers = [];
};

CAPlugin.prototype.go = function(){
  console.error("%s doesn't implement go()",this.name);
}
