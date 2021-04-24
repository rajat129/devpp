const fs = require("fs");

let file = JSON.stringify(fs.readFileSync("./ipl.json"));

console.log(file);