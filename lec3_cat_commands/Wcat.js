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
    filedata+=fs.readFileSync(files[i]);
    filedata+="\r\n";
}


 let arr = filedata.split("\r\n");
 let ans = [];

    if(flags.includes('-s')){
        removespaces(arr);
    }

    if(flags.includes('-n')){
        addline2(arr);
    }else if(flags.includes('-b')){
        addline1(arr);
    }



function removespaces(arr){
    let check = false;
    for(let i=0;i<arr.length;i++){

        if(arr[i]=="" && !check){
            ans.push(arr[i]);
            check = true;
        }else if(arr[i] != ""){
            ans.push(arr[i]);
        }
    
    }
    ans = ans.join("\n");
    console.log(ans);   
}








function addline1(arr){
    let count = 1;
    for(let i=0;i<arr.length;i++){

        if(arr[i]!=""){
            arr[i] = `${count}. ${arr[i]}`;
            count++;
        }else{
            arr[i] = arr[i];
        }
    
    }
    arr = arr.join("\n");
    console.log(arr);

}





function addline2(arr){
    let count1 = 1;
    for(let i=0;i<arr.length;i++){
        arr[i] = `${count1}. ${arr[i]}`;
        count1++;
    }
    arr = arr.join("\n");
    console.log(arr);
}



