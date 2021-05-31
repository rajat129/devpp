let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let color = document.querySelectorAll(".pencil-color div");
let size1 = document.querySelector(".pencil-size input");
let size2 = document.querySelector(".eraser-size input");

let current = "pencil";
let lastpencilcolor = "black";
let pencilsize = 1;
let erasersize = 1;

pencil.addEventListener("click",function(){

    if(current=="pencil"){
        if(document.querySelector(".tool-options").classList.contains("hide")){
            document.querySelector(".tool-options").classList.remove("hide");
        }else{
            document.querySelector(".tool-options").classList.add("hide");
        }
    }else{
        current = "pencil";
        ctx.lineWidth = pencilsize;
        ctx.strokeStyle = lastpencilcolor;
    }
    document.querySelector(".tool-options-eraser").classList.add("hide");

})

eraser.addEventListener("click",function(){

    if(current=="eraser"){
        if(document.querySelector(".tool-options-eraser").classList.contains("hide")){
            document.querySelector(".tool-options-eraser").classList.remove("hide");
        }else{
            document.querySelector(".tool-options-eraser").classList.add("hide");
        }
    }else{
        current = "eraser";
        ctx.lineWidth = erasersize;
        ctx.strokeStyle = "white";
    }
    document.querySelector(".tool-options").classList.add("hide");

})

for(let i=0;i<color.length;i++){

    color[i].addEventListener("click",function(e){
        ctx.strokeStyle = e.target.classList.value;
        lastpencilcolor = e.target.classList.value;
    })
}


size1.addEventListener("change",function(){
    ctx.lineWidth = size1.value;
    pencilsize = size1.value;
})

size2.addEventListener("change",function(){
    ctx.lineWidth = size1.value;
    erasersize = size1.value;
})

