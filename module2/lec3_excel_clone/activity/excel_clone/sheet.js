let addsheetbtn = document.querySelector(".add-sheets");
let sheetlist = document.querySelector(".sheet-list");

let sheetid = 0

addsheetbtn.addEventListener("click",function(e){

    sheetid++;
    let sheetdiv = document.createElement("div");
    sheetdiv.classList.add("sheet");
    sheetdiv.setAttribute("sheetid",sheetid);
    sheetdiv.innerHTML = `Sheet ${sheetid+1}`;

    document.querySelector(".active-sheet").classList.remove("active-sheet");
    sheetdiv.classList.add("active-sheet");

    sheetlist.append(sheetdiv);

    clearUI();
    initdb();
    
    console.log(sheetDb);

});

sheetlist.addEventListener("click",function(e){

    let selectedsheet = e.target;

    if(selectedsheet.classList.contains("active-sheet")){
        return;
    }
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    selectedsheet.classList.add("active-sheet");
    clearUI();
    db = sheetDb[selectedsheet.getAttribute("sheetid")].db;
    visitedcells = sheetDb[selectedsheet.getAttribute("sheetid")].visitedcells;
    updateUI();

})

function updateUI(){

    for(let i=0;i<visitedcells.length;i++){
        let {rowid,colid} = visitedcells[i];
        document.querySelector(`div[rowid="${rowid}"][colid="${colid}"]`).innerHTML = db[rowid][colid].value;
    }    

}

function clearUI(){

    // for(let i=0;i<100;i++){
    //     for(let j=0;j<26;j++){
    //         document.querySelector(`div[rowid="${i}"][colid="${j}"]`).innerHTML = "";
    //     }
    // }
    
    for(let i=0;i<visitedcells.length;i++){
        let {rowid,colid} = visitedcells[i];
        document.querySelector(`div[rowid="${rowid}"][colid="${colid}"]`).innerHTML = "";
        document.querySelector(`div[rowid="${rowid}"][colid="${colid}"]`).style = "normal";
    }
}