const cheerio = require("cheerio");
const request = require("request");
const inrepo = require("./allrepo");
const fs = require("fs");

request("https://github.com/topics",function(error,respose,data){
    parsebody(data);
});

function parsebody(html){

    let ch = cheerio.load(html);
    let tag = ch(".no-underline.d-flex.flex-column.flex-justify-center");

    for(let i=0;i<tag.length;i++){
        let link = ch(tag[i]).attr("href");
        if(link!=undefined){
            let completelink = "https://github.com"+link;
            
            let topicname = link.split("/")[2];

            let path = `./data/${topicname}`;

            fs.mkdirSync(path);

            inrepo(completelink,topicname);

        }
    }

}