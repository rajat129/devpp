const request = require("request");
const cheerio = require("cheerio");
const matchpage = require("./match");

// let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

function allmatchlink(link){

    request(link,function(error,response,data){
        parsebody(data);
    });

}

function parsebody(data){
    let ch = cheerio.load(data);

    let atags = ch('a[data-hover="Scorecard"]');

    for(let i=0;i<atags.length;i++){

        let tag = atags[i];
        let link = ch(tag).attr("href");
        let completelink = "https://www.espncricinfo.com" + link;
        matchpage(completelink);

    }
}

module.exports = allmatchlink;