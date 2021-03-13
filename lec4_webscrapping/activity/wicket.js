const request = require("request");
const cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(url,function(error,response,body){
    parsebowler(body);
})

function parsebowler(html){

    let ch = cheerio.load(html);

    let data = ch(".table.bowler tr td");

    let num = 4;
    let max = 0;
    let idx = 0;

    let count1 = data.length/11;


    for(let i=0;i<count1;i++){
        
        let temp = ch(data[num]).text();

        if(temp>max){
            max = temp;
            idx = i;
        }

        num = num+11;
    }

    // console.log(max+" "+idx);

    let count = 11*idx;
    for(let i=0;i<10;i++){
        console.log(ch(data[count+i]).text());
    }

    


}