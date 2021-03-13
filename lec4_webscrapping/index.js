const fs = require("fs");
const cheerio = require("cheerio");

let filedata = fs.readFileSync('./index.html');

let ch = cheerio.load(filedata);

// let ptag = ch("p");

// console.log(ch(ptag['4']).text());

let ptag = ch(".a3");
console.log(ptag.text());