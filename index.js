const puppeteer = require('puppeteer');

const sites = require('./list').sites;

async function getHttpStatus(el) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(el.url, { waitUntil: 'load' });
    let status = await response.status();
    if (status == 200) {
        let stringAnswer = el.name + " - " + status;
        console.log(stringAnswer);
    }else{ 
        let stringAnswer = el.name + " - " + status + " WARNING!!!!!";
        console.warn(stringAnswer);
    }
    await browser.close();
}

const run = async () => {
    await sites.forEach(async (el) => {
        await getHttpStatus(el);
    });
}

run();