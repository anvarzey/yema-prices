const puppeteer = require('puppeteer')

const uruguayeces = async () => {
  const URL = 'https://www.uruguayeces.com/en/5-yerba-mate'
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(URL)

  const arr = await page.$$eval('.product-miniature .thumbnail-container', cards => {
    return cards.map(card => {
      const link = card.firstElementChild.href
      const name = card.children[1].firstElementChild.textContent
      const oldPrice = card.children[1].children[1].querySelector('.regular-price')
      const finalPrice = card.children[1].children[1].querySelector('span[itemprop = "price"]').textContent
      const offerPrice = oldPrice ? finalPrice : 'none'
      const price = oldPrice ? oldPrice.textContent : finalPrice
      const outOfStock = !card.children[1].querySelector('.addToCartForm')

      return {
        kgPrice: 'none',
        link,
        name,
        offerPrice,
        outOfStock,
        price,
        wholesalePrice: false
      }
    })
  })

  return arr
}

module.exports = uruguayeces
