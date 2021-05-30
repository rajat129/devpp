// let db;
let items = document.querySelector(".items");
document.querySelector(".back").addEventListener("click",function(){
    window.location.assign("index.html");
})

function show(){

    let txn = db.transaction("Media","readonly");
    let mediastore = txn.objectStore("Media");

    let cursorobj = mediastore.openCursor();

    cursorobj.onsuccess = function(e){

        let cursor = cursorobj.result;
        if(cursor){
            console.log(cursor.value);
            display(cursor.value);
            cursor.continue();
        }
    }

}

let iv = setInterval(function(){
    if(db){
        show();
        clearInterval(iv);
    }
    
},100);

function creatediv(){
    let div = document.createElement("div");
    div.classList.add("item");
    div.innerHTML = `<div class="media">
    </div>
    <div class="options">
        <div class="download">
        <i class="fas fa-download"></i>
        </div>
        <div class="delete">
        <i class="fas fa-trash-alt"></i>
        </div>
    </div>`;
    return div;
}

function display(cursur){

    let div = creatediv();

    if(cursur.mediatype=="image"){
        let imgtag = document.createElement("img");
        imgtag.src = cursur.source;
        div.setAttribute("mid",cursur.mid);

        console.log(imgtag);
        div.querySelector(".media").appendChild(imgtag);
        items.appendChild(div);

        
    }else{
        let blob = new Blob([cursur.source],{type:"video/mp4"});
        let videourl = URL.createObjectURL(blob);
        div.setAttribute("mid",cursur.mid);

        // console.log(blob);

        let videotag = document.createElement("video");
        videotag.src = videourl;
        videotag.autoplay = "true";
        videotag.controls = "true";
        videotag.loop = "true";
        
        div.querySelector(".media").appendChild(videotag);
        items.appendChild(div);

                
    }

    div.querySelector(".download").addEventListener("click",function(){
        download(cursur)
    });
    div.querySelector(".delete").addEventListener("click",function(){
        del(cursur)
    });
}

function del(media){

    let mid = media.mid;
    // remove form db
    let txn = db.transaction("Media","readwrite");
    let mediastore = txn.objectStore("Media");
    mediastore.delete(mid);

    //remove form ui
    document.querySelector(`div[mid="${mid}"]`).remove();

}

function download(media){

    let atag = document.createElement("a");

    if(media.mediatype=="image"){
        
        atag.href = media.source;
        atag.download = "image.jpg";
    
        // atag.click();
        
    }else{
        let blob = new Blob([media.source], { type: "video/mp4" });
        let videoUrl = URL.createObjectURL(blob);
        atag.download = "video.mp4";
        atag.href = videoUrl;

    
    }
    atag.click();
    atag.remove();

}