const puppeteer = require('puppeteer');

(async () => {
  const URL = 'https://www.deliargentina.com/index.php?route=product/search&search=amanda'
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(URL)

  const arr = await page.$$eval('.product-layout', cards => {
    // const regexForPrice = /\d+,?\d+€/
    return cards.map(card => {
      const priceValues = card.querySelector('.price div')
      const hasOffer = priceValues.children.length === 2
      const outOfStock = Boolean(Object.values(card.classList).find(el => el === 'out-of-stock'))
      if (hasOffer) {
        return {
          name: card.querySelector('.name').textContent,
          // price: card.firstElementChild?.children[1].children[2].textContent.match(regexForPrice),
          price: priceValues.children[1].textContent,
          offerPrice: priceValues.children[0].textContent,
          outOfStock,
          link: card.querySelector('.name a').href
        }
      }
      return {
        name: card.querySelector('.name').textContent,
        // price: card.firstElementChild?.children[1].children[2].textContent.match(regexForPrice),
        price: priceValues.children[0].textContent,
        outOfStock,
        link: card.querySelector('.name a').href
      }
    })
  })

  await console.log(arr)
})()
