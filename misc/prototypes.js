Array.prototype.containsObject = function(obj){
    var i;
    for (i = 0; i < this.length; i++) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};
