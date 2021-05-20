
socket.emit("userconnected",username);

socket.on("click",function(obj){
    
    if(document.querySelector(".clicked-cell")){
        document.querySelector(".clicked-cell").classList.remove("clicked-cell");
        document.querySelector(".name-div").remove();
    } 

    let {row,col,username} = obj
    console.log(obj);
    document.querySelector(`div[rowid="${row}"][colid="${col}"]`).classList.add("clicked-cell");
    let div = document.createElement("div");
    div.classList.add("name-div");
    div.innerHTML = username;
    document.querySelector(`div[rowid="${row}"][colid="${col}"]`).append(div);

})

socket.on("cell-val",function(cellval){
    // console.log(cellval);
    let cell = document.querySelector(".clicked-cell");
    let childnodes = cell.childNodes;

    if(childnodes.length==1){
        let namediv = childnodes[0];
        cell.innerHTML = cellval;
        cell.append(namediv);
    }else{
        let namediv = childnodes[1];
        cell.innerHTML = cellval;
        cell.append(namediv);
    }
})

socket.on("bold",function(lastselectedcell){

    if(!document.querySelector(".clicked-cell")){
        return;
    }
    let lastclickedcell = document.querySelector(".clicked-cell");
    let {row,col} = getrowandcol(lastclickedcell);
    let cell = db[row][col];
    let bold = document.querySelector(".bold");

    if(!cell.fontstyle["bold"]){
        cell.fontstyle["bold"] = !cell.fontstyle["bold"];
        lastclickedcell.style.fontWeight = "bold";
        bold.classList.add("active-style");
    }else{
        cell.fontstyle["bold"] = !cell.fontstyle["bold"];
        lastclickedcell.style.fontWeight = "normal";
        bold.classList.remove("active-style");
    }
    
})

socket.on("italics",function(lastselectedcell){

    if(!document.querySelector(".clicked-cell")){
        return;
    }
    let lastclickedcell = document.querySelector(".clicked-cell");
    let {row,col} = getrowandcol(lastclickedcell);
    let cell = db[row][col];

    let italics = document.querySelector(".italics");
    if(!cell.fontstyle["italics"]){
        cell.fontstyle["italics"] = !cell.fontstyle["italics"];
        lastclickedcell.style.fontStyle = "italic";
        italics.classList.add("active-style");
    }else{
        cell.fontstyle["italics"] = !cell.fontstyle["italics"];
        lastclickedcell.style.fontStyle = "normal";
        italics.classList.remove("active-style");
    }
    
})

socket.on("underline",function(lastselectedcell){

    if(!document.querySelector(".clicked-cell")){
        return;
    }
    let lastclickedcell = document.querySelector(".clicked-cell");
    let {row,col} = getrowandcol(lastclickedcell);
    let cell = db[row][col];

    let underline = document.querySelector(".underline");
    if(!cell.fontstyle["underline"]){
        cell.fontstyle["underline"] = !cell.fontstyle["underline"];
        lastclickedcell.style.textDecoration = "underline";
        underline.classList.add("active-style");
    }else{
        cell.fontstyle["underline"] = !cell.fontstyle["underline"];
        lastclickedcell.style.textDecoration = "none";
        underline.classList.remove("active-style");
    }
    
})