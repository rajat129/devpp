const { SSL_OP_MSIE_SSLV2_RSA_PADDING } = require("constants");
const fs = require("fs");
let files = ["../f1.txt","../f2.txt","../f3.txt"];

let filepromise = fs.promises.readFile(files[0]);

for(let i=1;i<files.length;i++){

    filepromise = filepromise.then(function(data){
        console.log(data+"");
        return fs.promises.readFile(files[i]);
    })

}

filepromise.then(function(data){
    console.log(data+"");
})