const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const inissue = require("./issue");

function inside(link,topicname,reponame){
    request(link,function(error,respose,data){
        parsebody(data,topicname,reponame);
    });
}

function parsebody(data , topicname,reponame){

    let ch = cheerio.load(data);
    let link = ch(".UnderlineNav-body.list-style-none a ");
    let issuelink = ch(link[1]).attr("href");

    // console.log(issuelink);
    let completelink = "https://github.com" + issuelink;

    //fs.mkdirSync(path);

    inissue(completelink,topicname,reponame);

}

// inside("https://github.com/storybookjs/storybook","storybook");

module.exports = inside;