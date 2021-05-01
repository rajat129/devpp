let cellscontent = document.querySelector(".cells-content");

function addcells(){

    let cells = `<div class="top-left"></div>`;

    cells+=`<div class="top-row">`;
    for(let i=0;i<26;i++){
        cells+=`<div class="top-row-cell">${String.fromCharCode(65+i)}</div>`;
    }
    cells+="</div>";

    cells+=`<div class="left-row">`;
    for(let i=0;i<100;i++){
        cells+=`<div class="left-row-cell">${i+1}</div>`;
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

let db;

function initdb(){
     db = [];

    for(let i=0;i<100;i++){
    
        let row = [];
    
        for(let j=0;j<26;j++){
    
            let name = String.fromCharCode(65+j)+(i+1)+"";
            let cellobj = {
                name:name,
                value:"",
                formule:" ",
                children:[],
                parent:[]
            }

            row.push(cellobj);
        }
        db.push(row);
    
    }

}

initdb();
