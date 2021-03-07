let fs = require("fs");

let content = process.argv.slice(2);

let flags = [];
let files = [];

for(let i=0;i<content.length;i++){

    if(content[i].startsWith("-")){
        flags.push(content[i]);
    }else{
        files.push(content[i]);
    }

}

let filedata="";

for(let i=0;i<files.length;i++){ 
    filedata+=fs.readFileSync(files[i])+" ";
}

console.log(filedata);

