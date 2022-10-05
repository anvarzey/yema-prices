const puppeteer = require('puppeteer')

const deliArg = async () => {
  const URL = 'https://www.deliargentina.com/yerba-mate'
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(URL)

  const arr = await page.$$eval('.product-layout', cards => {
    // const regexForPrice = /\d+,?\d+€/
    return cards.map(card => {
      const priceValues = card.querySelector('.price div')
      const hasOffer = priceValues.children.length === 2
      const outOfStock = Boolean(Object.values(card.classList).find(el => el === 'out-of-stock'))
      let price
      let offerPrice
      if (hasOffer) {
        price = priceValues.children[1].textContent
        offerPrice = priceValues.children[0].textContent
      } else {
        price = priceValues.children[0].textContent
        offerPrice = 'none'
      }

      return {
        kgPrice: 'none',
        link: card.querySelector('.name a').href,
        name: card.querySelector('.name').textContent,
        offerPrice,
        outOfStock,
        price,
        wholesalePrice: false
      }
    })
  })

  return arr
}

module.exports = deliArg
