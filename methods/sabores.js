const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://saboresdelplata.es/?s=cbse')

  const arr = await page.$$eval('li.sales-flash-overlay', cards => {
    return cards.map(card => {
      const name = card.querySelector('.woocommerce-loop-product__title').textContent
      const price = card.querySelector('.woocommerce-Price-amount bdi').textContent
      const link = card.children[0].href
      return {
        name,
        price,
        link
      }
    })
  })
  await console.log(arr)
})()
