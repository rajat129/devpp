let db;

let dbrequest = indexedDB.open("gallery");

dbrequest.onupgradeneeded = function(e){
    db = e.target.result;
    let mediatable = db.createObjectStore("Media",{keyPath : "mid"});
    
}

dbrequest.onsuccess = function(e){
    db = e.target.result;
}

function savemedia(mediatype,source){

    let txn = db.transaction("Media","readwrite");
    let mediastore = txn.objectStore("Media");

    mediastore.add({
        mid:Date.now(),
        type:mediatype,
        source:source

    });

}