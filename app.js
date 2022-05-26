require("dotenv").config();
const puppeteer = require('puppeteer');

async function doSomething() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.screenshot({ path: 'google.png' });

}
  

doSomething();