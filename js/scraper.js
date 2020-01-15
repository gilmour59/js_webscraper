const puppeteer = require('puppeteer');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function scrapeTopComps(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const region_div = await page.$x('/html/body/div[1]/div[3]/ul[1]');
    const rank_div = await page.$x('/html/body/div[1]/div[3]/ul[2]');

    //if element is not found it will return [];
    const regions = region_div.$('li a.nav-link');

    //region: global, br, eune, euw, jp, kr, lan, las, na, oce, tr, ru
    //rank: all, challenger, grandmaster, master, diamond, platinum, gold, silver, bronze, iron
    rl.question('What Region: ', function(region_input){
        rl.question('What Rank: ', function(rank_input){
            
            console.log(regions);
        })
    });

    rl.on('line', (input) => {
        if (input == 'close' || input == 'exit'){
            rl.close();
        }
    });    

    rl.on("close", function() {
        console.log("mama mo!");
        process.exit(0);
    });

    browser.close();
}

scrapeTopComps('https://lolchess.gg/leaderboards');

//testing if scraper works
async function scrapeTest(url){
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

//scrapeTest('https://lolchess.gg/leaderboards?region=na&tier=diamond');
