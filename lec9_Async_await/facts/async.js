let fs = require("fs");

console.log("start");

(async function(){

    try{
        let f1data = await fs.promises.readFile("./f1.txt");
        let f2data = await fs.promises.readFile("./f2.txt");

         console.log(f1data);
         console.log(f2data);
    }catch{
        // console.log(error);
    }

})();

console.log("end");