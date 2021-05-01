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

for(let i=0;i<allcells.length;i++){

    allcells[i].addEventListener("click",function(e){

       let row = Number(e.target.getAttribute("rowid"));
       let col = Number(e.target.getAttribute("colid"));
        let cellobj = db[row][col];
        if(cellobj.formula==undefined){
            formulainput.value = "";
        }else{
            formulainput.value = cellobj.formula;
        }
        
       let add = String.fromCharCode(65+col)+(row+1)+"";
       address.value = add;
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
    }

})