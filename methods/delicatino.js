const puppeteer = require('puppeteer')

const delicatino = async () => {
  const URL = 'https://www.delicatino.es/Yerba-Mate:::2.html'
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(URL)

  try {
    let previousHeight = 0
    let actualHeight = await page.$eval('main', (el) => el.scrollHeight)
    while (previousHeight < actualHeight) {
      previousHeight = actualHeight
      await page.evaluate(`window.scrollTo(0, ${actualHeight})`)
      await new Promise((resolve, reject) => setTimeout(resolve, 1000))
      actualHeight = await page.$eval('main', (el) => el.scrollHeight)
    }
  } catch (e) {
    console.error(e)
  }

  const arr = await page.$$eval('.product-miniature-container', products => {
    return products.map(product => {
      const blankURL = 'https://www.delicatino.es/blank.gif'
      const outOfStock = product.firstElementChild.firstElementChild.firstElementChild.children[1].src !== blankURL
      const wholesalePrice = Boolean(product.children[1]?.children[3]?.children[3].textContent.trim())
      let price
      let offerPrice
      const oldPrice = product.children[1].children[3].children[0]?.children[0].textContent.trim() || 'none'
      if (oldPrice === 'none') {
        price = product.children[1].children[3].children[0]?.children[1].textContent.trim()
        offerPrice = 'none'
      } else {
        price = oldPrice
        offerPrice = product.children[1].children[3].children[0]?.children[1].textContent.trim()
      }
      return {
        kgPrice: product.children[1].children[3].children[1]?.textContent.trim(),
        link: product.children[1].children[1].href,
        name: product.children[1]?.children[1].textContent.trim(),
        offerPrice,
        outOfStock,
        price,
        wholesalePrice
      }
    })
  })

  return arr
}

module.exports = delicatino
