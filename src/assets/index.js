function active(){
    var header = document.getElementsByClassName("thumbnail");
    var btns = header.getElementsByClassName("allimg");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      if (current.length > 0) { 
        current[0].className = current[0].className.replace(" active", "");
      }
      this.className += " active";
      });
    }
}
