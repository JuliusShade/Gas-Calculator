const puppeteer = require('puppeteer-core');

async function scrapeGasPrice(url) {
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage();
  await page.goto(url);

  let price;

  const priceElement = await page.$('.text__xl___2MXGo.text__left___1iOw3');
  if (priceElement) {
    const innerHTML = await page.evaluate((el) => el.innerHTML, priceElement);
    price = parseFloat(innerHTML.replace('$', ''));
    console.log(price);
  }

  browser.close();
  return price;
}

module.exports = { scrapeGasPrice };
