let gallerybutton = document.querySelector(".gallery-button");

gallerybutton.addEventListener("click",function(){
    window.location.assign("gallery.html");
})

function savemedia(mediatype,source){

    let txn = db.transaction("Media","readwrite");
    let mediastore = txn.objectStore("Media");

    mediastore.add({
        mid:Date.now(),
        mediatype,
        source

    });

}