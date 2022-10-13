const puppeteer = require('puppeteer')

const scrapFunction = async (page) => {
  return await page.$$eval('.product .inner_product', cards => {
    return cards.map(card => {
      const link = card.firstElementChild.href
      const name = card.querySelector('.woocommerce-loop-product__title').textContent || 'none'
      const parentClassList = Object.values(card.parentElement.classList)
      const outOfStock = parentClassList.includes('outofstock')
      let price
      let offerPrice
      const priceContainer = card.querySelector('.price')?.textContent || 'none'
      if (priceContainer === 'none') {
        price = priceContainer
        offerPrice = priceContainer
      } else {
        if (priceContainer.length > 6) {
          const pricesArr = priceContainer.split(' ')
          price = pricesArr[0]
          offerPrice = pricesArr[1]
        } else {
          price = priceContainer
          offerPrice = 'none'
        }
      }

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
}

const argentinisimo = async () => {
  const URL = 'https://argentinisimo.es/categoria-producto-argentino/tienda/yerba-mate/page/'
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)
  let pageNumber = 1
  const arr = []
  while (pageNumber < 404) {
    await page.goto(URL + pageNumber)
    const data = await scrapFunction(page)
    await arr.push(...data)
    const next = await page.$eval('.pagination .current', el => el.nextElementSibling || 'none')
    if (next === 'none') {
      pageNumber = 404
    } else {
      pageNumber++
    }
  }

  return arr
}

module.exports = argentinisimo
