const puppeteer = require('puppeteer')

const scrapFunction = async (page) => {
  return await page.$$eval('.ProductItem__Wrapper', cards => {
    return cards.map(card => {
      const regexForAvailability = /vuelve\spronto/i
      let infoContainer
      let outOfStock = false
      if (card.children.length > 2) {
        infoContainer = card.children[2]
        outOfStock = regexForAvailability.test(card.children[1].textContent.trim())
      } else {
        infoContainer = card.children[1]
      }
      const link = card.firstElementChild.href
      const brand = infoContainer.firstElementChild.textContent
      const product = infoContainer.children[1].textContent.trim()
      const priceInfo = infoContainer.children[2]
      let offerPrice
      let price

      if (priceInfo.children.length > 1) {
        offerPrice = priceInfo.children[0].textContent
        price = priceInfo.children[1].textContent
      } else {
        offerPrice = 'none'
        price = priceInfo.firstElementChild.textContent
      }

      return {
        kgPrice: 'none',
        link,
        name: brand + ' ' + product,
        offerPrice,
        outOfStock,
        price,
        wholesalePrice: false
      }
    })
  })
}

const gustoArg = async () => {
  const URL = 'https://www.gustoargentino.com/collections/yerba-mate'
  const browser = await puppeteer.launch()
  // const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(URL)
  const arr = []
  let nextBtn
  do {
    nextBtn = Boolean(await page.$('a[title= "Página siguiente"]'))
    const data = await scrapFunction(page)
    await arr.push(...data)
    if (nextBtn) {
      await page.click('a[title= "Página siguiente"]')
      await page.waitForNavigation()
    }
  } while (nextBtn)

  return arr
}

module.exports = gustoArg
