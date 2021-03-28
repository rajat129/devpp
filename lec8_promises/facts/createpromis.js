const fs = require("fs");


function mycreatedpromis(filepath){
    // create a new promise
    return new Promise(function(resolve,reject){
        fs.readFile(filepath,function(error,data){
            if(error){
                reject(error); // it will invole fcb =>failure callback
            }else{
                resolve(data); // it will invoke scb => success callback
            }
        });
    });

}

let pendingpromis = mycreatedpromis("./f1.txt");

pendingpromis.then(function(data){
    console.log(data+" ");
});

pendingpromis.catch(function(error){
    console.log(error);
});