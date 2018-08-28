function onLoad(){
    var firstLink = document.getElementsByTagName("a")[0];
    firstLink.style.backgroundColor = "beige";
    var toggleBtn = document.getElementById("toggle_menu_btn");
    toggleBtn.style.display = "inline";
    var firstElement = document.getElementById("about_section");
    firstElement.style.display = "block";
    var firstHeading = document.getElementById("info_h");
    firstHeading.style.display = "inline";
    var i = 1;
    var headers = document.getElementsByTagName("h3");
    for(i; i< headers.length;i++){
        headers[i].style.display = "none";
    }
    var firstButton = document.getElementsByClassName("btn-holder")[0];
    firstButton.style.display = "block";
}
function toggleSection(e){
    var anchorTags = document.getElementsByTagName("a");
    var i = 0;
    for(i;i<anchorTags.length;i++){
        var anchor = anchorTags[i];
        anchor.style.removeProperty("background-color");
    }
    console.log(e.currentTarget);
    var sectionId = e.currentTarget.getAttribute("data-id");
    e.currentTarget.style.backgroundColor = "beige";
    
    var main = document.getElementsByClassName("main")[0];
    var i = 7;
    for(i;i<15;i+=2){
        var child = main.childNodes[i];
        if(i != sectionId){
            child.style.display = "none";
            if(child.id == "about_section")
                document.getElementById("info_h").style.display = "none";
            else if(child.id == "problem_section")
                document.getElementById("problem_h").style.display = "none";
            else if(child.id == "rules_section")
                document.getElementById("rules_h").style.display = "none";
            else
                document.getElementById("contact_h").style.display = "none";
        }
        else{
            child.style.display = "block";
            if(child.id == "about_section")
                document.getElementById("info_h").style.display = "inline";
            else if(child.id == "problem_section")
                document.getElementById("problem_h").style.display = "inline";
            else if(child.id == "rules_section")
                document.getElementById("rules_h").style.display = "inline";
            else
                document.getElementById("contact_h").style.display = "inline";
        }
    }
}
