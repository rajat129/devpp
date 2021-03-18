const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const getdata = require("./final");

function inissue(link,topicname,reponame){

    request(link,function(error,respose,data){
        parsebody(data,topicname,reponame);
    });

}

function parsebody(html,topicname,reponame){

    let ch = cheerio.load(html);
    let allis = ch(".d-flex.Box-row--drag-hide.position-relative>a");

    for(let i=0;i<5;i++){
        let link = ch(allis[i]).attr("href");

        let completelink = "https://github.com/" + link;

        getdata(completelink,topicname,reponame);
    }
}

// inissue("https://github.com/storybookjs/storybook/issues","abjsv");

module.exports = inissue;