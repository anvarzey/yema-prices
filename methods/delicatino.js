const puppeteer = require('puppeteer');

// const BRANDS = [
//   'Amanda',  CHECK
//   'Cachamate',
//   'CBSe',  CHECK
//   'Canarias',  CHECK
//   'Cruz de Malta',  CHECK
//   'La Merced', CHECK
//   'Mananita',
//   'Nobleza Gaucha', CHECK
//   'Playadito', CHECK
//   'Rosamonte', CHECK
//   'Taragui', CHECK
//   'Union' CHECK
// ]

// const url = 'https://www.delicatino.es/#/dfclassic/query=amanda'

(async () => {
  // const browser = await puppeteer.launch({ headless: false })
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // await page.goto('https://www.delicatino.es/#/dfclassic/query=amanda')
  await page.goto('https://www.delicatino.es/#/dfclassic/query=canarias')
  // await page.focus('input[placeholder= "Buscar"]')
  // await page.keyboard.type('playadito')

  // firstElementChild.firstElementChild.classList.contains('noStockDoofinder')

  const arr = await page.$$eval('div.df-card__content a', el => {
    return el.map(child => {
      const outOfStock = child.parentElement.previousElementSibling.firstElementChild.classList[0].includes('noStockDoofinder')
      const wholesalePrice = child.children[1]?.children?.length === 5
      if (child.children[1].children[2].children.length > 3) {
        return {
          name: child.children[0]?.textContent,
          price: child.children[1].children[2].children[0]?.textContent.trim(),
          offerPrice: child.children[1].children[2].children[1]?.textContent.trim(),
          outOfStock,
          wholesalePrice,
          link: child.href,
          kgPrice: child.children[1].children[2].children[3]?.textContent
        }
      } else {
        return {
          name: child.children[0]?.textContent,
          price: child.children[1].children[2].children[0]?.textContent.trim(),
          outOfStock,
          wholesalePrice,
          link: child.href,
          kgPrice: child.children[1].children[2].children[2]?.textContent
        }
      }
    })
  }
  )

  /*
    List of products that have discount per quantity
   */

  const wholesale = arr.filter(e => e.wholesalePrice === true && e.outOfStock === false)

  /*
  Function that returns the object that has wholesale with the wholesaleInfo (price, minimum units, price per kg)
  */

  /*
  async function getWholesaleInfo (prod) {
    const page2 = await browser.newPage()
    await page2.goto(prod.link)

    const regexForQuantity = /\d+(?=\sunidades)/i
    const regexForPricePerUnit = /\d+,?\d+(?=\seur)/i
    const regexForPricePerKg = /(?<=\()\d+,?\d+(?=\seur\sel\skg\))/i

    const container = Array.from(document.querySelector('section div.pt-2.pb-2.mb-3').children)
    const quantity = container[1]?.textContent.match(regexForQuantity)[0]
    const pricePerUnit = container[1]?.textContent.match(regexForPricePerUnit)[0]
    const pricePerKg = container[1].children[0]?.textContent.match(regexForPricePerKg)

    const newProductInfo = {
      ...prod,
      wholesaleInfo: {
        minUnits: quantity,
        pricePerUnit,
        pricePerKg
      }
    }

    return newProductInfo
  }

  */

  await console.log(wholesale)
})()
