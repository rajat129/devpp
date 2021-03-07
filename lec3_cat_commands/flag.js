let fs = require("fs");


let content = fs.readFileSync("./f1.txt")+"";
//  console.log(content);

let arr = content.split("\r\n");
//  console.log(arr);

//-s => to remove extra spaces

// let ans = [];
// let check = false;

// function removespaces(arr){
//     for(let i=0;i<arr.length;i++){

//         if(arr[i]=="" && !check){
//             ans.push(arr[i]);
//             check = true;
//         }else if(arr[i] != ""){
//             ans.push(arr[i]);
//         }
    
//     }
// }

// removespaces(arr);

// ans = ans.join("\n");
// console.log(ans);



// -b=> add line numbers

// let count = 1;

// function addline1(arr){
//     for(let i=0;i<arr.length;i++){

//         if(arr[i]!=""){
//             arr[i] = `${count}. ${arr[i]}`;
//             count++;
//         }else{
//             arr[i] = arr[i];
//         }
    
//     }
// }

// addline1(arr);

// arr = arr.join("\n");
// console.log(arr);


// -n=> add number t0 every line

let count = 1;

function addline2(arr){

    for(let i=0;i<arr.length;i++){
        arr[i] = `${count}. ${arr[i]}`;
        count++;
    }

}

addline2(arr);

arr = arr.join("\n");
console.log(arr);
