const fs = require("fs");

let f1pendingpromis = fs.promises.readFile("./f1.txt");

f1pendingpromis.then( function(data){
    console.log(data+"");
    let f2pendingpromis = fs.promises.readFile("./f2.txt");
    return f2pendingpromis;
})
.then(function(data){
    console.log(data+"");
    let f3pendingpromis = fs.promises.readFile("./f3.txt");
    return f3pendingpromis;
})
.then(function(data){
    console.log(data+"");
});