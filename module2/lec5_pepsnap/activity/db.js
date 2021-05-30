let db;

let dbrequest = indexedDB.open("gallery");

dbrequest.onupgradeneeded = function(e){
    db = e.target.result;
    let mediatable = db.createObjectStore("Media",{keyPath : "mid"});
    
}

dbrequest.onsuccess = function(e){
    db = e.target.result;
}

