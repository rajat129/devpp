
function solveformula(formula,lastselectedcell){

    let formulacomp = formula.split(" ");

    for(let i=0;i<formulacomp.length;i++){

        let temp = formulacomp[i];
        if(temp[0]>='A' && temp[0]<='Z'){

            let {row,col} = getvalfromaddress(temp);
            let cellobj = db[row][col];

            if(lastselectedcell){
                cellobj.children.push(lastselectedcell.name);
                lastselectedcell.parent.push(cellobj.name);
            }
            let val = cellobj.value;
            formula = formula.replace(temp,val);
        }

    }

    let computedval = eval(formula);
    return computedval;

}

function updatechildren(cellobj){

    for(let i=0;i<cellobj.children.length;i++){
        let children = cellobj.children[i];
        let {row,col} = getvalfromaddress(children);
        let childrencellobj = db[row][col];

        let value = solveformula(childrencellobj.formula);
        document.querySelector(`div[rowid="${row}"][colid="${col}"]`).textContent = value;
        childrencellobj.value = value;

        updatechildren(childrencellobj);
    }

}

function removeformula(cellobj){
    cellobj.formula = "";
    for(let i=0;i<cellobj.parent.length;i++){
        let parentname = cellobj.parent[i];
        let {row,col} = getvalfromaddress(parentname);
        let parentcellobj = db[row][col];

        let updatedchildren = parentcellobj.children.filter(function(child){
            return child!=cellobj.name;
        })

        parentcellobj.children = updatedchildren;
    }
    cellobj.parent = [];

}

function getvalfromaddress(temp){

    let row = Number(temp.substring(1))-1;
    let col = temp.charCodeAt(0)-65;

    return {row,col};

}

function getrowandcol(lastselectedcell){
    let row = lastselectedcell.getAttribute("rowid");
    let col = lastselectedcell.getAttribute("colid");
    return {row,col};
}