function active(){for(var t=document.getElementsByClassName("thumbnail").getElementsByClassName("allimg"),e=0;e<t.length;e++)t[e].addEventListener("click",function(){var a=document.getElementsByClassName("active");a.length>0&&(a[0].className=a[0].className.replace(" active","")),this.className+=" active"})}