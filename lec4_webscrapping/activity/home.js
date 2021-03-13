const request = require("request");
const cheerio  = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
let lastballdata = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";

// request(url,function(error,response,body){
//     parsebody(body);
// })

// function parsebody(html){

//     let ch = cheerio.load(html);

//     let atag = ch('a[data-hover="View All Results"]').text();
//     console.log(atag);

// }

//last ball commentory

request(lastballdata,function(error,response,body){
    commentory(body);
})

function commentory(html){
    let ch = cheerio.load(html);

    let temp = ch('.match-comment-wrapper');

    console.log(ch(temp['0']).text());
}