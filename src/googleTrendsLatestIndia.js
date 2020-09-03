const puppeteer = require("puppeteer");
const chalk = require("chalk");
var fs = require("fs");
let digCount=3;
const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    var browser = await puppeteer.launch({ headless: true });
    var page = await browser.newPage();
    await page.goto(`https://trends.google.com/trends/trendingsearches/daily?geo=IN`);
    await page.waitForSelector(".feed-item-header");
    // for(let i=0; i<=digCount;i++){
    //   await page.click('.feed-load-more-button')
    //   if(i==digCount){
        
    //   }
    // }
    var news = await page.evaluate(() => {
      var titleNodeList = document.querySelectorAll(`.feed-item-header`);
      var linkList = document.querySelectorAll(`.feed-item-header a`);
      var titleLinkArray = [];
      for (var i = 0; i < titleNodeList.length; i++) {
        titleLinkArray[i] = {
          title: titleNodeList[i].innerText.trim(),
          link: titleNodeList[i].getAttribute("href")
        };
      }
      return titleLinkArray;
    });
    await browser.close();
    // Writing the news inside a json file
    fs.writeFile("outputs/trends.json", JSON.stringify(news), function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
    console.log(success("File saved"));
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();
