const isLineComment = (line) => '//' === line.slice(0, 2)

export default (multiDef) => {
  const lines = multiDef.split('\n')
    .map(line => line.trim())
    .filter(line => '' !== line)
  const meaningfulLines = lines.filter(line => !isLineComment(line))
  const cleanedMultiDef = meaningfulLines.join('')

  const cardDefs = {}

  let name = ''
  let def = ''
  let whatToAppendCharTo = 'NAME'

  for (const char of cleanedMultiDef) {
    if (whatToAppendCharTo === 'NAME') {
      if (char === '{') {

          whatToAppendCharTo = 'DEF'

          continue

      }

      name += char
    }

    if (whatToAppendCharTo === 'DEF') {
      if (char === '}') {

        cardDefs[name.trim()] = def.trim()

        name = ''
        def = ''
        whatToAppendCharTo = 'NAME'

        continue

      }

      def += char
    }
  }

  return cardDefs
}
