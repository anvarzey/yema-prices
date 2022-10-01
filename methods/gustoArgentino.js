const puppeteer = require('puppeteer');

(async () => {
  const URL = 'https://www.gustoargentino.com/collections/yerba-mate'
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(URL)

  const arr = await page.$$eval('.ProductItem__Wrapper', cards => {
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

      if (priceInfo.children.length > 1) {
        return {
          name: brand + ' ' + product,
          link,
          price: priceInfo.children[1].textContent,
          offerPrice: priceInfo.children[0].textContent,
          outOfStock
        }
      }

      return {
        name: brand + ' ' + product,
        link,
        price: priceInfo.firstElementChild.textContent,
        outOfStock
      }
    })
  })

  await console.log(arr)
})()
