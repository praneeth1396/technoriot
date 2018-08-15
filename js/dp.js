function onLoad(){
    var firstLink = document.getElementsByTagName("a")[0];
    firstLink.style.backgroundColor = "black";
    var firstElement = document.getElementById("about_section");
    firstElement.style.display = "block";
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
    e.currentTarget.style.backgroundColor = "black";
    
    var main = document.getElementsByClassName("main")[0];
    var i = 1;
    for(i;i<8;i+=2){
        var child = main.childNodes[i];
        if(i != sectionId)
            child.style.display = "none";
        else
            child.style.display = "block";
    }
}
