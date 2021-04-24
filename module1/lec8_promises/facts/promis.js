const fs = require("fs");


// A sends a promis to B
let pendingpromis = fs.promises.readFile("./f1.txt");

console.log(pendingpromis);

// when the promis is a success -cb
pendingpromis.then( function(data){

    console.log("inside scb");
    console.log(data+"");

} );

// when promis is a fail -cb
pendingpromis.catch( function(error){

    console.log("inside fcb");
    console.log(error);

} );