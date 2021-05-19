
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