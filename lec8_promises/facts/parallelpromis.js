const fs = require("fs");

let f1pendingpromis = fs.promises.readFile("./f1.txt");
let f2pendingpromis = fs.promises.readFile("./f2.txt");
let f3pendingpromis = fs.promises.readFile("./f3.txt");

f1pendingpromis.then( function(data){

    // console.log("inside scb");
    console.log(data+"");

} );

f2pendingpromis.then( function(data){

    // console.log("inside scb");
    console.log(data+"");

} );

f3pendingpromis.then( function(data){

    // console.log("inside scb");
    console.log(data+"");

} );
