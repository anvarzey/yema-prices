const puppeteer = require('puppeteer')

const scrapFunction = async (page) => {
  return await page.$$eval('#search div.product', cards => {
    return cards.map(el => {
      const nameContainer = el.children[1].firstElementChild
      const prices = el.children[2]
      const hasOffer = prices.children.length > 2
      const offerPrice = hasOffer ? prices.querySelector('strong.price')?.textContent : 'none'
      const price = !hasOffer ? 'none' : prices.querySelector('strong.price')?.textContent

      return {
        kgPrice: prices.querySelector('.price.--convert')?.textContent,
        link: nameContainer.href,
        name: nameContainer?.textContent,
        offerPrice,
        outOfStock: false,
        price,
        wholesalePrice: false
      }
    })
  })
}

const matemundo = async () => {
  // const browser = await puppeteer.launch({ headless: false })
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const arr = []
  let pageNum = 0
  const argURL = 'https://www.matemundo.es/spa_m_Yerba-Mate_Yerba-Mate-por-pais-de-origen_Yerba-Mate-Argentina-3268.html'
  const urURL = 'https://www.matemundo.es/spa_m_Yerba-Mate_Yerba-Mate-por-pais-de-origen_Yerba-Mate-Uruguaya-3270.html'
  let actualURL = argURL
  do {
    await page.goto(actualURL + '?counter=' + pageNum)
    const notFound = Boolean(await page.$('#return_sub_404'))
    if (notFound) {
      if (actualURL === urURL) {
        pageNum = 404
      } else {
        actualURL = urURL
        pageNum = 0
      }
    } else {
      const data = await scrapFunction(page)
      await arr.push(...data)
      pageNum++
    }
  } while (pageNum < 404)

  return arr
}

module.exports = matemundo
