let image = document.querySelector(".image-icon");
let input = document.querySelector(".image-input");
let download = document.querySelector(".download");

image.addEventListener("click",function(){
    input.click();
})

input.addEventListener("change",function(e){
    let fileobj = e.target.files[0];
    let img = document.createElement("img");
    let imgurl = URL.createObjectURL(fileobj);
    img.src = imgurl;
    img.classList.add("image");
    addimg(img);
})

download.addEventListener("click",function(){

    let canvasurl = canvas.toDataURL({type:"image/png"});
    let atag = document.createElement("a");
    atag.download = "canvas.png";
    atag.href = canvasurl;
    atag.click();

})

//
function addimg(img){

    let div = document.createElement("div");
    div.classList.add("note1");
    div.setAttribute("id",Date.now());
    div.appendChild(img);
    sticky.appendChild(div);
    let down = false;
    let id;

    sticky.addEventListener("mousedown",function(e){
        down = true;
        id = e.path[1].id;
    })

    document.addEventListener("mousemove",function(e){

        if(down){
            let x = e.clientX;
            let y = e.clientY;
            console.log(x+" "+y);
            let div = document.querySelector(`div[id="${id}"]`);
            div.style.left = x+"px";
            div.style.top = y+"px";

        }

    })

    sticky.addEventListener("mouseup",function(e){
        down = false;
    })
}