const puppeteer = require("puppeteer");
const $ = require("cheerio");
const prompt = require("prompt");
let url = "";
let outputFile = "";
const properties = [
  {
    name: "url",
  },
  {
    name: "filename",
  },
];

prompt.start();
prompt.get(properties, function (err, result) {
  if (err) {
    return onPromptErr(err);
  }
  outputFile = result.filename;
  let ur = parseUrl(result.url);
  url = ur;
  if (ur && ur.includes("http")) {
    console.log("  Target: " + ur);
    console.log("Initializing scrape");
    startScrape();
  }
});
function parseUrl(u) {
  if (u) {
    u = u.replace(/(^\w+:|^)\/\//, "");
    u = "http://" + u;
    return u;
  }
}

function onPromptErr(err) {
  console.log(err);
  return 1;
}
function startScrape() {
  console.log("Launching chrome instance");
  puppeteer
    .launch({ headless: true })
    .then(function (browser) {
      return browser.newPage();
    })
    .then(function (page) {
      return page.goto(url).then(function () {
        return page.content();
      });
    })
    .then(function (html) {
        let u=[]
      $("a", html).each(function () {
        // let outputArray=[]
        let atag = $(this).attr().href;
        if (atag) {
          if (atag.includes("http")) {
            // outputArray.push("[" + atag + "] " + $(this).text())
            console.log("[" + atag + "] " + $(this).text() + ',' );
            u.push({'link':atag,'title':$(this).text()})
//             writeToFile("[" + atag + "] " + $(this).text() + ',' );
          }
        }
      });
      writeToFile(JSON.stringify(u) );
      return
    })
    .catch(function (err) {
      console.log(err);
      //handle error
    });
}
function writeToFile(w) {
  var fs = require("fs");
  fs.appendFileSync(
    "./outputs/" + outputFile,
    w,
    "UTF-8",
    { flags: "a" },
    function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("Added " + w);
    }
  );
}
