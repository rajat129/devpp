const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const inside = require("./repo");

function inrepo(link,topicname){

    request(link,function(error,respose,data){
        parsebody(data,topicname);
    });
}

function parsebody(html,topicname){

    let ch = cheerio.load(html);
    let atag = ch("h1 .text-bold ");
    
    folderpath = `./${topicname}`;

    for(let i=0;i<5;i++){
        let link = ch(atag[i]).attr("href");

        let completelink = "https://github.com"+link;   
        let reponame = link.split("/")[2];

        let path = `./data/${topicname}/${reponame}`;
        fs.mkdirSync(path);
        
        inside(completelink,topicname,reponame);

    }

}

// inrepo("https://github.com/topics/ember","ember");

module.exports = inrepo;