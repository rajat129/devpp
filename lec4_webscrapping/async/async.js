const fs = require("fs");

console.log("hello start");

fs.readFile("./f1.txt", function(error,data){
    console.log(data+"");
})

// this is a async function taking callback func , this gets executed after the stack gets
// empty ya ye kehlo ki sab khatam hone ke baad ye wala func chalega end mai

console.log("hello end");