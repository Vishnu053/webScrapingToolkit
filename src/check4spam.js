const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://check4spam.com/';

rp(url)
  .then(function(html){
    var fs = require('fs');
    fs.writeFile("./outputs/check4spamScrap.txt", $('a .post-url.post-title', html), function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    });
  })
  .catch(function(err){
    //handle error
  });


