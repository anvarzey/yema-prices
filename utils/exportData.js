const xlsx = require('xlsx')
const path = require('path')

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
  const workBook = xlsx.utils.book_new()
  const workSheetData = [
    workSheetColumnNames,
    ...data
  ]
  const workSheet = xlsx.utils.aoa_to_sheet(workSheetData)
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName)
  xlsx.writeFile(workBook, path.resolve(filePath))
}

const exportDataToExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
  const dataParsed = data.map(product => {
    return [
      product.kgPrice,
      product.link,
      product.name,
      product.offerPrice,
      product.outOfStock,
      product.price,
      product.wholesalePrice
    ]
  })
  exportExcel(dataParsed, workSheetColumnNames, workSheetName, filePath)
}

module.exports = exportDataToExcel
