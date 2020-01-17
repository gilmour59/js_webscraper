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

    //the method elementHandle.$x() returns: <Promise<Array<ElementHandle>>></Promise>
    const [region_div] = await page.$x('/html/body/div[1]/div[3]/ul[1]');
    const [rank_div] = await page.$x('/html/body/div[1]/div[3]/ul[2]');

    //if element is not found it will return [];
    const regions = await region_div.$$('li a.nav-link');

    //store the regions from html list
    var regions_array = [];

    for (var i = 0; i < regions.length; i++){
        var region_name = await regions[i].getProperty('textContent');
        var region_text = await region_name.jsonValue();
        regions_array.push(region_text.trim());
    }

    //region: global, br, eune, euw, jp, kr, lan, las, na, oce, tr, ru    
    console.log('Regions: global, br, eune, euw, jp, kr, lan, las, na, oce, tr, ru');

    //if no workaround is found. just nest.
    rl.question('What Region: ', function(region_input){        
        if ((regions_array.indexOf(region_input.trim().toUpperCase())) != -1) {
            console.log('region is in array!')
            console.log(regions_array.indexOf(region_input.trim().toUpperCase()));
        }
        rl.pause();
    });

    //rank: all, challenger, grandmaster, master, diamond, platinum, gold, silver, bronze, iron
    rl.question('What Rank: ', function(rank_input){    

    })

    rl.on('line', (input) => {
        if (input == 'close' || input == 'exit' || input == 'end'){
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
