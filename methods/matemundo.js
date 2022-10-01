const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.matemundo.es/search.php?text=canarias')

  const arr = await page.$$eval('#search div.product', cards => {
    return cards.map(el => {
      const nameContainer = el.children[1]
      const prices = el.children[2]
      const hasOffer = prices.children.length > 2

      if (hasOffer) {
        return {
          name: nameContainer.textContent,
          link: nameContainer.href,
          offerPrice: prices.querySelector('strong.price').textContent,
          kgPrice: prices.querySelector('.price.--convert').textContent
        }
      }
      return {
        name: nameContainer.textContent,
        link: nameContainer.href,
        price: prices.querySelector('strong.price').textContent,
        kgPrice: prices.querySelector('.price.--convert').textContent
      }
    })
  })

  await console.log(arr)
})()
