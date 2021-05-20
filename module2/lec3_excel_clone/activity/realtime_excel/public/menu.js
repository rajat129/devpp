let menu = document.querySelector(".menu");
let filemenuoptions = document.querySelector(".file-menu-options");
let homemenuoptions = document.querySelector(".home-menu-options");

let bold = document.querySelector(".bold");
let italics = document.querySelector(".italics");
let underline = document.querySelector(".underline");

let left = document.querySelector(".left");
let center = document.querySelector(".center");
let right = document.querySelector(".right");

let fonttype = document.querySelector(".font-type");
let fontsize = document.querySelector(".font-size");

let backcolor = document.querySelector(".div1")
let textcolor = document.querySelector(".div2");

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
    socket.emit("bold",lastselectedcell);
});

italics.addEventListener("click",function(e){
    setstyle("italics",italics);
    socket.emit("italics",lastselectedcell);
});

underline.addEventListener("click",function(e){
    setstyle("underline",underline);
    socket.emit("underline",lastselectedcell);
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

fonttype.addEventListener("click",function(e){
    let {row,col} = getrowandcol(lastselectedcell);
    let cell = db[row][col];
    let font = e.target.value;

    if(cell.font==font){
        return;
    }

    lastselectedcell.style.fontFamily = font;
    cell.font = font;
})

fontsize.addEventListener("click",function(e){
    let size = e.target.value;
    let {row,col} = getrowandcol(lastselectedcell);
    let cell = db[row][col];

    if(cell.size==size){
        return;
    }

    console.log(size);
    lastselectedcell.style.fontSize = Number(size)+`px`;
    cell.size = size;
})

backcolor.addEventListener("click",function(e){
    document.querySelector(".back-color").click();
})

textcolor.addEventListener("click",function(e){
    document.querySelector(".text-color").click();
})

let color1 = document.querySelector(".back-color");
let color2 = document.querySelector(".text-color");

color1.addEventListener("blur",function(e){
    let {row,col} = getrowandcol(lastselectedcell);
    let cell = db[row][col];

    lastselectedcell.style.color = e.target.value;
    cell.textcolor = e.target.value;
});

color2.addEventListener("blur",function(e){
    let {row,col} = getrowandcol(lastselectedcell);
    let cell = db[row][col];

    lastselectedcell.style.backgroundColor = e.target.value;
    cell.backcolor = e.target.value;
})