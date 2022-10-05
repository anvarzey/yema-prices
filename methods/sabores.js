const puppeteer = require('puppeteer')

const sabores = async () => {
  const URL = 'https://saboresdelplata.es/etiqueta-producto/yerba-mate-bombilla-termo'
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(URL)

  const arr = await page.$$eval('li.sales-flash-overlay', cards => {
    return cards.map(card => {
      const name = card.firstElementChild.children[1]?.textContent
      const priceContainer = card.firstElementChild?.lastElementChild
      const hasOffer = Object.values(priceContainer.children).length === 3

      const price = hasOffer
        ? priceContainer.firstElementChild?.textContent
        : priceContainer.firstElementChild.textContent
      const offerPrice = hasOffer
        ? priceContainer.children[1].textContent
        : 'none'
      const link = card.firstElementChild.href
      return {
        kgPrice: 'none',
        link,
        name,
        offerPrice,
        outOfStock: false,
        price,
        wholesalePrice: false
      }
    })
  })

  return arr
}

module.exports = sabores
