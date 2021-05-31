let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let color = document.querySelectorAll(".pencil-color div");
let size1 = document.querySelector(".pencil-size input");
let size2 = document.querySelector(".eraser-size input");
let sticky = document.querySelector(".sticky");
let addsticky = document.querySelector(".add-sticky");

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
    ctx.lineWidth = size2.value;
    erasersize = size2.value;
})

addsticky.addEventListener("click",function(){
    let div = document.createElement("div");
    div.classList.add("note");
    div.setAttribute("id",Date.now());

    div.innerHTML = `<div class="head">
    <div class="note-text">Click & Move</div>
    <div class="maximize hide">
        <i class="far fa-window-maximize"></i>
    </div>
    <div class="minimize">
        <i class="far fa-window-minimize"></i>
    </div>
    <div class="close">
        <i class="fas fa-times"></i>
    </div>
    </div>
    <div class="body" contenteditable="true">
        enter here !!!!
    </div>`;

    sticky.appendChild(div);

    let stickyclose = document.querySelectorAll(".close");

    for(let i=0;i<stickyclose.length;i++){

        stickyclose[i].addEventListener("click",function(e){
            // console.log(e.path[3].id);
            let id = e.path[3].id;
            if(document.querySelector(`div[id="${id}"]`)){
                document.querySelector(`div[id="${id}"]`).remove();
            }
        })

    }

    let stickyhead = document.querySelectorAll(".note-text");

    for(let i=0;i<stickyhead.length;i++){
        
        let mousedown = false;
        let initialx;
        let initialy;
        let id;

        stickyhead[i].addEventListener("mousedown",function(e){
            mousedown = true;
            console.log(e.path);
            id = e.path[2].id;
        })

        document.addEventListener("mousemove",function(e){
            if(mousedown){
                

                let x = e.clientX;
                let y = e.clientY;
                console.log(x,y);
                let div = document.querySelector(`div[id="${id}"]`);
                div.style.left = x+"px";
                div.style.top = y+"px";
            }
        })

        document.addEventListener("mouseup",function(e){
            mousedown = false;
        })
    }

    let notebody = document.querySelectorAll(".body");

    for(let i=0;i<notebody.length;i++){
        notebody[i].addEventListener("click",function(e){
            notebody[i].innerHTML = "";
            // notebody[i].style.opacity = 1;
        })
    }
   

    let min = document.querySelectorAll(".minimize");

    for(let i=0;i<min.length;i++){

        min[i].addEventListener("click",function(e){
            console.log(e.path);
            let id = e.path[3].id;
            let div = document.querySelector(`div[id="${id}"]`);
            div.querySelector(".body").classList.add("hide");
            div.querySelector(".maximize").classList.remove("hide");
            div.querySelector(".minimize").classList.add("hide");
        })

    }

    let max = document.querySelectorAll(".maximize");

    for(let i=0;i<max.length;i++){

        max[i].addEventListener("click",function(e){
            let id = e.path[3].id;
            let div = document.querySelector(`div[id="${id}"]`);
            div.querySelector(".body").classList.remove("hide");
            div.querySelector(".maximize").classList.add("hide");
            div.querySelector(".minimize").classList.remove("hide");
        })

    }
})



