let canvas = document.querySelector(".canvas");

canvas.height = window.innerHeight-60;
canvas.width = window.innerWidth;

let ctx = canvas.getContext("2d");
ctx.lineCap = "round";

let mousedown = false;

let db = [];
let line = [];
let redodb = [];

canvas.addEventListener("mousedown",function(e){
    mousedown = true;
    let x = e.clientX;
    let y = e.clientY-60;
    ctx.beginPath();
    ctx.moveTo(x,y);
    
    let lineobj = {
        x : x,
        y : y,
        type:"md",
        color:ctx.strokeStyle,
        width:ctx.lineWidth
    }
    line.push(lineobj);

    redodb = [];
    
})

canvas.addEventListener("mouseup",function(e){
    mousedown = false;
    db.push(line);
    line = [];
    // console.log(db);
})

canvas.addEventListener("mousemove",function(e){
    if(mousedown){
        let x = e.clientX;
        let y = e.clientY-60;
        ctx.lineTo(x,y);
        ctx.stroke();

        let lineobj = {
            x : x,
            y : y
        }
        line.push(lineobj);
    }
})

window.addEventListener("resize",function(){
    canvas.height = window.innerHeight-60;
    canvas.width = window.innerWidth;
})