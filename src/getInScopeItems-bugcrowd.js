// #user-guides__bounty-brief__targets-table table
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
    await page.goto(`https://bugcrowd.com/arkose-labs`);
    await page.waitForSelector("#user-guides__bounty-brief__targets-table table");
    // for(let i=0; i<=digCount;i++){
    //   await page.click('.feed-load-more-button')
    //   if(i==digCount){
        
    //   }
    // }
    var news = await page.evaluate(() => {


        const table = Array.from(document.querySelectorAll('#user-guides__bounty-brief__targets-table table ')); 
        return table.map(td => td.innerText);

//         const query = (selector, context) =>
//   Array.from(context.querySelectorAll(selector));
  
// console.log(

//   query('tr', document).map(row =>
//     query('td, th', row).map(cell =>
//       cell.textContent))

// )



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
    let j=[]
    for(let i of news){
        j.push(i.split('/n'))
    }
    console.log(j);
    await browser.close();
    // Writing the news inside a json file
    // fs.writeFile("outputs/trends.json", JSON.stringify(news), function(err) {
    //   if (err) throw err;
    //   console.log("Saved!");
    // });
    // console.log(success("File saved"));
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error("Browser Closed"));
  }
})();
