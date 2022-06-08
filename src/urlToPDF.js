const puppeteer = require("puppeteer");
var puppetBrowser = ""
puppeteer.launch({
    headless: true
}).then(browser => {
    puppetBrowser = browser
    return browser.newPage();
}).then(page => {
    return page.goto("https://www.google.com/").then(function () {
        page.pdf({
            format: 'A4', //specify page format
            path: `${__dirname}/generatedPDF.pdf` //comment this if you only want a pdf buffer
        }).then(buff => {
            console.log(buff);// you can furether do anything with this buffer
            puppetBrowser.close() //close the browser
        })
    })
})
