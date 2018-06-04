import validateMultiDef from './validateMultiDef'

const def = `
Volcano9 {
  attack: -> energy(4, 0, 1)
  price: mana(2, 0, 1)
}
`

console.log('validation result: ', validateMultiDef(def))
