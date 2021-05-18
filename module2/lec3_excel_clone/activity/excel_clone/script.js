let cellcontentdiv = document.querySelector(".cells-content");
let topleft = document.querySelector(".top-left");
let toprow = document.querySelector(".top-row");
let leftrow = document.querySelector(".left-row");
let allcells = document.querySelectorAll(".cell");
let address = document.querySelector("#address");
let formulainput = document.querySelector("#formula");
let lastselectedcell;

cellcontentdiv.addEventListener("scroll",function(e){

    let left = e.target.scrollLeft;
    let top = e.target.scrollTop;

    topleft.style.top = top+"px";
    topleft.style.left = left+"px";
    toprow.style.top = top+"px";
    leftrow.style.left = left+"px";

});

let col;
let row;

for(let i=0;i<allcells.length;i++){

    allcells[i].addEventListener("click",function(e){

        if(lastselectedcell){
            lastselectedcell.classList.remove("active-cell");
            document.querySelector(`div[trid="${col}"]`).classList.remove("selected-cell");
            document.querySelector(`div[lrid="${row}"]`).classList.remove("selected-cell");
        }

       row = Number(e.target.getAttribute("rowid"));
       col = Number(e.target.getAttribute("colid"));
        let cellobj = db[row][col];
        if(cellobj.formula==undefined){
            formulainput.value = "";
        }else{
            formulainput.value = cellobj.formula;
        }
        
       let add = String.fromCharCode(65+col)+(row+1)+"";
       address.value = add;

        // console.log(db[row][col]);
       
        e.target.classList.add("active-cell");
        document.querySelector(`div[trid="${col}"]`).classList.add("selected-cell");
        document.querySelector(`div[lrid="${row}"]`).classList.add("selected-cell");

       cellobj.fontstyle.bold
       ? document.querySelector(".bold").classList.add("active-style")
       : document.querySelector(".bold").classList.remove("active-style");

       cellobj.fontstyle.italics
       ? document.querySelector(".italics").classList.add("active-style")
       : document.querySelector(".italics").classList.remove("active-style");

       cellobj.fontstyle.underline
       ? document.querySelector(".underline").classList.add("active-style")
       : document.querySelector(".underline").classList.remove("active-style");

       if(lastselectedcell){
           document.querySelector(".text-align .active-style").classList.remove("active-style");
       }

       let alignment = cellobj.textalign;

       document.querySelector(`.${alignment}`).classList.add("active-style");

    });

    allcells[i].addEventListener("blur",function(e){

        lastselectedcell = e.target;
        let row = e.target.getAttribute("rowid");
        let col = e.target.getAttribute("colid");
        let val = e.target.textContent;
        let cellobj = db[row][col];
        if(cellobj.value==val){
            return;
        }

        if(cellobj.formula){
            removeformula(cellobj);
            formulainput.value = "";
        }

        cellobj.value = val;
        updatechildren(cellobj);

        if(cellobj.visited){
            return;
        }
        cellobj.visited = true;
        visitedcells.push({rowid:row,colid:col});
        // console.log(sheetDb);
        
    })

    allcells[i].addEventListener("keydown",function(e){
        if(e.key == "Backspace"){
            let cell = e.target;
            let {row,col} = getrowandcol(cell);
            let cellobj = db[row][col];
            if(cellobj.formula){
                formulainput.value = "";
                cellobj.formula = "";
                removeformula(cellobj);
                cell.textContent = "";
                console.log(e);
            }
            
        
        }
    })

}

formulainput.addEventListener("blur",function(e){

    let formula = e.target.value;
    if(formula){
        let {row,col} = getrowandcol(lastselectedcell);
        let cellobj = db[row][col];

        if(cellobj.formula){
            removeformula(cellobj);
        }

        let computedvalue = solveformula(formula,cellobj);

        cellobj.formula = formula;
        cellobj.value = computedvalue;
        lastselectedcell.textContent = computedvalue;
        updatechildren(cellobj);

        if(cellobj.visited){
            return;
        }
        cellobj.visited = true;
        visitedcells.push({rowid:row,colid:col});
        // console.log(sheetDb);
        
    }

})