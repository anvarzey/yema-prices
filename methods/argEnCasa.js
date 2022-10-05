const puppeteer = require('puppeteer')

const argEnCasa = async () => {
  const URL = 'https://www.argentinaencasa.com/18-yerba-mate'
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(URL)

  const arr = await page.$$eval('.product-miniature .thumbnail-container', cards => {
    return cards.map(card => {
      const regexToAvailability = /vuelvo\spronto/i

      const name = card.children[1].firstElementChild.textContent
      const price = card.querySelector('.price').textContent.trim()
      const link = card.children[2].href
      const outOfStock = regexToAvailability.test(card.children[2].firstElementChild.textContent.trim())

      return {
        kgPrice: 'none',
        link,
        name,
        offerPrice: 'none',
        outOfStock,
        price,
        wholesalePrice: false
      }
    })
  })

  return arr
}

module.exports = argEnCasa
