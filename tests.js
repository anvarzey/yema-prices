const playadito = {
  list: [
    'Playadito 6 x 1Kg',
    'Playadito 10 x 1Kg',
    'Playadito - yerba mate 1Kg',
    'Playadito - yerba mate 3 x 1Kg',
    'Playadito - yerba mate 500g',
    'Playadito despalada - yerba mate 500g',
    'Playadito con Hierbas - yerba mate 500g',
    'Liebig Original - yerba mate 500g',
    'Playadito yerba mate - 20 saquitos',
    'Liebig Original - yerba mate 12 x 500g'
  ],
  products: [
    'Playadito 500gr',
    'Playadito 1kg',
    'Playadito 3 X 1kg',
    'Playadito 6 X 1kg',
    'Playadito 10 X 1kg',
    'Playadito Despalada 500gr',
    'Playadito Hierbas 500gr',
    'Kit Playadito 500gr + mate + bombilla'
  ]
}

const canarias = {
  list: [
    'Canarias - yerba mate 1kg',
    'Canarias - 3x1Kg',
    'Canarias - 4x1Kg',
    'Canarias - 6x1Kg',
    'Canarias - yerba mate 500g',
    'Canarias - 10x1Kg',
    'Canarias Edición Especial - yerba mate 1kg',
    'Canarias - 20 x 1Kg',
    '3 x Canarias Edición Especial - yerba mate 1kg',
    'Canarias - yerba mate 6* 500g (3 KG)',
    'Baldo - yerba mate 1kg',
    'Baldo - Yerba Mate 6 x 1 KG',
    'Canarias Serena 1kg',
    'Canarias Té Verde y Jengibre 1kg'
  ],
  products: [
    'Canarias 500gr',
    'Canarias 6 X 500gr',
    'Canarias 1kg',
    'Canarias 3 X 1kg',
    'Canarias 6 X 1kg',
    'Canarias 10 X 1kg',
    'Canarias Especial 1kg',
    'Canarias Especial 3 X 1kg',
    'Canarias Serena 1kg',
    'Canarias Te Verde y Jengibre 1kg',
    'Canarias Te Rojo y Centella 1kg'
  ]
}

const wordsToAvoid = ['-', 'yerba', 'mate', 'con']

const normalizedProducts = canarias.products.map(product => product.split(' ').map(e => {
  const u = e.toLowerCase()
  if (u === '500gr') return u.slice(0, -1)
  return u
}))

const regex = /\*\s|\s\(|\)\s|\s/
// (?<=x)\W(?=x)
// const regex = /\*\s|\)\s|\s\(|\s/

const normalizedList = canarias.list.map(product => product.split(regex).map(e => e.toLowerCase()))

const finalList = []

for (let i = 0; i < normalizedList.length; i++) {
  const que = normalizedList[i].filter(onda => onda !== wordsToAvoid[0] && onda !== wordsToAvoid[1] && onda !== wordsToAvoid[2] && onda !== wordsToAvoid[3])
  finalList.push(que)
}
console.log(normalizedProducts)
console.log(finalList)

const checker = []
