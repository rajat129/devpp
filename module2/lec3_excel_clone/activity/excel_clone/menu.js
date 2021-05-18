let menu = document.querySelector(".menu");
let filemenuoptions = document.querySelector(".file-menu-options");
let homemenuoptions = document.querySelector(".home-menu-options");

let bold = document.querySelector(".bold");
let italics = document.querySelector(".italics");
let underline = document.querySelector(".underline");

let left = document.querySelector(".left");
let center = document.querySelector(".center");
let right = document.querySelector(".right");

left.addEventListener("click",function(e){
    setalignment("left",left);
})

center.addEventListener("click",function(e){
    setalignment("center",center);
})

right.addEventListener("click",function(e){
    setalignment("right",right);
})

function setalignment(alignment,element){

    if(element.classList.contains("active-style") || !lastselectedcell){
        return;
    }

    // document.querySelector(`.${alignment}`).classList.remove("active-style");
    let {row,col} = getrowandcol(lastselectedcell);
    let cellobj = db[row][col];

    document.querySelector(".text-align .active-style").classList.remove("active-style");
    element.classList.add("active-style");

    lastselectedcell.style.textAlign = alignment;
    cellobj.textalign = alignment;

}

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


