const cheerio = require("cheerio");
const request = require("request");
const getrepo = require("./repo");

function inrepo(link){
    request(link,function(error,respose,data){
        parsebody(data);
    });


}

function parsebody(html){

    let ch = cheerio.load(html);
    let atag = ch("h1 .text-bold ");

    // for(let i=0;i<5;i++){

    //     let link = ch(atag[i]).attr("href");
    //     let completelink = "https://github.com/"+link;
        
    //     getrepo(completelink);
        
    // }

}


module.exports = inrepo;