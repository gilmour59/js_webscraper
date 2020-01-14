const puppeteer = require('puppeteer');

async function scrapeNames(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    //[el] = destructuring; passing the result to an array with an index of 'el';
    //$x is a puppeteer selector; select by using XPath
    const [el] = await page.$x('//*[@id="wrapper"]/div[3]/table/tbody/tr[1]/td[1]');

    //pull the attribute of the el;
    //to get class attribute use 'className';
    //google the list of properties of HTML DOM Element Object;
    const class_prop = await el.getProperty('textContent');

    //convert json result to string
    const class_prop_txt = await class_prop.jsonValue();

    console.log({class_prop_txt});

    browser.close();
}

scrapeNames('https://lolchess.gg/leaderboards?region=na&tier=diamond');
