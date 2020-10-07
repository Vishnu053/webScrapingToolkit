var scraper=require('table-scraper')
scraper
.get('https://bugcrowd.com/arkose-labs')
.then(res=>console.log(res))
.catch(e=>console.log(e))