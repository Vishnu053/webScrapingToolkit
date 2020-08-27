const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://www.quikr.com/mobiles-tablets/Apple+Mobile-Phones+India+y149fd';

rp(url)
  .then(function(html){
    //success!
    let l=$('.srpProducts', html).length
    console.log(l);
    // console.log($('big > a', html));
    const wikiUrls = [];
    for (let i = 0; i < l; i++) {
      // wikiUrls.push($('.description', html)[i].attribs.href);
      wikiUrls.push($('.srpProducts', html)[i]);
    }
    for(let j of wikiUrls){
      console.log(j)
    }
    
  })
  .catch(function(err){
    console.log(err);
  });