const cheerio = require("cheerio");
const request = require("request");

getrepo("https://github.com/hope-for/hope-boot");

function getrepo(link){
    request(link,function(error,respose,data){
        parsebody(data);
    });
}

function parsebody(html){

    let ch = cheerio.load(html);
    let header = ch(`[data-ga-click="Repository, Navigation click, Issues tab"]`);

    let issue = header[0];
    let link = ch(issue).attr("href");
    
    console.log("https://github.com"+link);

    // console.log(header);

}

module.exports = getrepo;

