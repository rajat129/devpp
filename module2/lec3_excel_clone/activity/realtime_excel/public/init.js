let cellscontent = document.querySelector(".cells-content");

function addcells(){

    let cells = `<div class="top-left"></div>`;

    cells+=`<div class="top-row">`;
    for(let i=0;i<26;i++){
        cells+=`<div class="top-row-cell" trid=${i}>${String.fromCharCode(65+i)}</div>`;
    }
    cells+="</div>";

    cells+=`<div class="left-row">`;
    for(let i=0;i<100;i++){
        cells+=`<div class="left-row-cell" lrid=${i}>${i+1}</div>`;
    }
    cells+=`</div>`;

    cells+=`<div class="allcells">`;

    for(let i=0;i<100;i++){

        cells+=`<div class="row">`;
        for(let j=0;j<26;j++){
            cells+=`<div class="cell" rowid = "${i}" colid = "${j}" contentEditable=true></div>`
        }
        cells+=`</div>`;

    }

    cells+=`</div>`;

    cellscontent.innerHTML = cells;

}
addcells();

let sheetDb = [];
let db;
let visitedcells;

function initdb(){
    let selectedsheetdb = [];
    visitedcells = [];

    for(let i=0;i<100;i++){
    
        let row = [];
    
        for(let j=0;j<26;j++){
    
            let name = String.fromCharCode(65+j)+(i+1)+"";
            let cellobj = {
                name:name,
                value:"",
                formule:" ",
                children:[],
                parent:[],
                visited:false,
                fontstyle : {bold:false,italics:false,underline:false},
                textalign : "left",
                font : "comic sans",
                size :10,
                textcolor :"#000000",
                backcolor : "#000000"
            }

            row.push(cellobj);
        }
        selectedsheetdb.push(row);
    
    }
    sheetDb.push({db:selectedsheetdb, visitedcells:visitedcells});

    db = selectedsheetdb;

}

initdb();
