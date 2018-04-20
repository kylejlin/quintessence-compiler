const addToProps = (props, key, value) => {
  if (props[key]) {
    props[key].push(value)
  } else {
    props[key] = [value]
  }
}

export default (cardDef) => {
  const tokens = cardDef.split(/(->)|([:,()])/g)
    .filter(token => undefined !== token)
    .map(token => token.trim())
    .filter(token => '' !== token)


  const props = {}

  let propertyKey = tokens[0]
  let propertyValue = ''

  let i = 2

  while (i < tokens.length) {
    const token = tokens[i]
    const nextToken = tokens[i + 1]

    if (':' === nextToken) {
      addToProps(props, propertyKey, propertyValue)

      propertyKey = token
      propertyValue = ''
      i += 2

      continue
    }

    propertyValue += token

    i++
  }

  addToProps(props, propertyKey, propertyValue)

  return props
}
