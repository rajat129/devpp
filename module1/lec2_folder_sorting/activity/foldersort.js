const fs = require("fs");
const path = require("path");
let folderpath = "./downloads";
let extensions = require("./util.js");
let extfolderpath;

function checkfolder(extension){

    for(let key in extensions){

        if(extensions[key].includes(extension)){
            
            extfolderpath = `${folderpath}/${key}`;
            break;
        }

    }

    return fs.existsSync(extfolderpath);
}


function movefile(filename){

    let sourcefilepath = `${folderpath}/${filename}`;
    let destfilepath = `${extfolderpath}/${filename}`;
    fs.copyFileSync(sourcefilepath,destfilepath);

    fs.unlinkSync(sourcefilepath);

}

function createfolder(){
    fs.mkdirSync(extfolderpath);
}

function sortfolder(folderpath){

    //get content of folderpath
    let content = fs.readdirSync(folderpath);

    for(let i=0;i<content.length;i++){
        //get extention of files
        let extensionname = path.extname(content[i]);

        console.log(extensionname);
        let extfolderexists = checkfolder(extensionname);

        if(extfolderexists){
           movefile(content[i]);
        }
        else{
            createfolder();
            movefile(content[i]);
        }

    }

}

sortfolder(folderpath);
