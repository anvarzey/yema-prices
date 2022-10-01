const puppeteer = require('puppeteer');

(async () => {
  const URL = 'https://www.uruguayeces.com/en/search?controller=search&s=canarias'
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(URL)

  const arr = await page.$$eval('.product-miniature .thumbnail-container', cards => {
    return cards.map(card => {
      const link = card.firstElementChild.href
      const name = card.children[1].firstElementChild.textContent
      const price = card.children[1].querySelector('.price').textContent
      const outOfStock = !card.children[1].querySelector('.addToCartForm')

      return {
        name,
        price,
        outOfStock,
        link
      }
    })
  })

  await console.log(arr)
})()
