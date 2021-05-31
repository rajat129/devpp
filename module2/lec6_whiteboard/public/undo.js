let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");

undo.addEventListener("click",function(){

    let removedline = db.pop();

    redodb.push(removedline);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    redraw();

})

redo.addEventListener("click",function(){

    if(redodb.length>=1){
        let templine = redodb.pop();

        for(let j=0;j<templine.length;j++){
            let obj = templine[j];

            if(obj.type=="md"){
                // console.log(obj);
                ctx.strokeStyle = obj.color;
                ctx.lineWidth = obj.width;
                ctx.beginPath();
                ctx.moveTo(obj.x,obj.y);
            }else{
                ctx.lineTo(obj.x,obj.y);
                ctx.stroke();
            }
        }        
    }

})

function redraw(){

    
    ctx.lineCap = "round";

    for(let i=0;i<db.length;i++){

        let templine = db[i];

        for(let j=0;j<templine.length;j++){
            let obj = templine[j];

            if(obj.type=="md"){
                // console.log(obj);
                ctx.strokeStyle = obj.color;
                ctx.lineWidth = obj.width;
                ctx.beginPath();
                ctx.moveTo(obj.x,obj.y);
            }else{
                ctx.lineTo(obj.x,obj.y);
                ctx.stroke();
            }
        }
    }

    // console.log(db);
}