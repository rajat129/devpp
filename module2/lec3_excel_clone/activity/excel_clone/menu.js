let menu = document.querySelector(".menu");
let filemenuoptions = document.querySelector(".file-menu-options");
let homemenuoptions = document.querySelector(".home-menu-options");

menu.addEventListener("click",function(e){

    if(e.target.classList.contains("menu")){
        return;
    }

    let selectedmenu = e.target;
    if (selectedmenu.classList.contains("active")) {
        return;
    }
    
    document.querySelector(".active").classList.remove("active");
    selectedmenu.classList.add("active");

    let menuname = selectedmenu.classList[0];

    if(menuname=="home"){
        homemenuoptions.classList.remove("hide");
        filemenuoptions.classList.add("hide");
    }else{
        homemenuoptions.classList.add("hide");
        filemenuoptions.classList.remove("hide");
    }
});

let bold = document.querySelector(".bold");
let italics = document.querySelector(".italics");
let underline = document.querySelector(".underline");

bold.addEventListener("click",function(e){
    setstyle("bold",bold);
});

italics.addEventListener("click",function(e){
    setstyle("italics",italics);
});

underline.addEventListener("click",function(e){
    setstyle("underline",underline);
});

function setstyle(stylename,element){
    if(lastselectedcell){

        let {row,col} = getrowandcol(lastselectedcell);
        let cellobj = db[row][col];

        if(cellobj.fontstyle[stylename]){
            if(stylename=="bold"){
                lastselectedcell.style.fontWeight = "normal";
            }
            if(stylename=="italics"){
                lastselectedcell.style.fontStyle = "normal";
            }
            if(stylename=="underline"){
                lastselectedcell.style.textDecoration = "none";
            }
            element.classList.remove("active-style");
        }else{
            if(stylename=="bold"){
                lastselectedcell.style.fontWeight = "bold";
            }
            if(stylename=="italics"){
                lastselectedcell.style.fontStyle = "italic";
            }
            if(stylename=="underline"){
                lastselectedcell.style.textDecoration = "underline";
            }
            element.classList.add("active-style");
        }
        // console.log(cellobj.fontstyle.bold);
        cellobj.fontstyle[stylename] = !cellobj.fontstyle[stylename];
        // console.log(cellobj.fontstyle.bold);

    }
}


