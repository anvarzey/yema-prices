const argEnCasa = require('./methods/argEnCasa')
const argentinisimo = require('./methods/argentinisimo')
const deliArg = require('./methods/deliArg')
const delicatino = require('./methods/delicatino')
const gustoArg = require('./methods/gustoArg')
const matemundo = require('./methods/matemundo')
const sabores = require('./methods/sabores')
const uruguayeces = require('./methods/uruguayeces')
const exportDataToExcel = require('./utils/exportData')

const workSheetColumnName = [
  'kgPrice',
  'link',
  'name',
  'offerPrice',
  'outOfStock',
  'price',
  'wholesalePrice'
]

const methodsArray = [
  {
    name: 'argEnCasa',
    method: argEnCasa
  },
  {
    name: 'argentinisimo',
    method: argentinisimo
  },
  {
    name: 'deliArg',
    method: deliArg
  },
  {
    name: 'delicatino',
    method: delicatino
  },
  {
    name: 'gustoArg',
    method: gustoArg
  },
  {
    name: 'matemundo',
    method: matemundo
  },
  {
    name: 'sabores',
    method: sabores
  },
  {
    name: 'uruguayeces',
    method: uruguayeces
  }
]

for (const method of methodsArray) {
  const workSheetName = method.name
  const filePath = './files/' + workSheetName + '.xlsx'
  method.method().then(res => exportDataToExcel(res, workSheetColumnName, workSheetName, filePath))
}
