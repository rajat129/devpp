const request = require("request");
const cheerio = require("cheerio");
const allmatchlink = require("./allmatches");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595",function(error,response,data){
    parsebody(data);
});

function parsebody(html){
    let ch = cheerio.load(html);

    let atag = ch('[data-hover="View All Results"]');
    let link = atag.attr("href");
    let completelink = "https://www.espncricinfo.com"+link;
    allmatchlink(completelink);
}