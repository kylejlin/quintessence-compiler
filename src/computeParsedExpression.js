class Option {
  constructor() {
    this.energy = [0, 0, 0]
    this.mana = [0, 0, 0]
    this.strength = [0, 0, 0]
    this.transfers = []
  }

  addToProperty(key, otherAddend) {
    const legalKeys = 'energy mana strength'.split(' ')
    if (!legalKeys.includes(key)) {
      throw new TypeError('Valid keys are ' + legalKeys.join(', ') + '\nYou provided: ' + key)
    }

    if (otherAddend.length < 3) {
      throw new RangeError('Vectors must have at least 3 components.')
    }

    const property = this[key]

    for (let i = 0; i < 3; i++) {
      if (
        'number' === typeof property[i]
        && 'number' === typeof otherAddend[i]
      ) {
        property[i] += otherAddend[i]
      } else {
        property[i] = [
          '+',
          property[i],
          otherAddend[i]
        ]
      }
    }
  }
}

class Matcher {
  constructor() {
    this.energy = [null, null, null]
    this.mana = [null, null, null]
    this.strength = [null, null, null]
  }

  addToProperty(key, otherAddend) {
    const legalKeys = 'energy mana strength'.split(' ')
    if (!legalKeys.includes(key)) {
      throw new TypeError('Valid keys are ' + legalKeys.join(', ') + '\nYou provided: ' + key)
    }

    if (otherAddend.length < 3) {
      throw new RangeError('Vectors must have at least 3 components.')
    }

    const property = this[key]

    for (let i = 0; i < 3; i++) {
      property[i] = 0;
    }

    for (let i = 0; i < 3; i++) {
      if (
        'number' === typeof property[i]
        && 'number' === typeof otherAddend[i]
      ) {
        property[i] += otherAddend[i]
      } else {
        property[i] = [
          '+',
          property[i],
          otherAddend[i]
        ]
      }
    }
  }
}

const computeParsedExpression = (expression) => {
  if ('all' === expression.name) {
    const all = new Option()

    for (const subEx of expression.arguments) {
      if ('transfer' === subEx.name) {
        const [startLocation, endLocation, matcher] = subEx.arguments
        all.transfers.push({
          startLocation: startLocation.arguments,
          endLocation: endLocation.arguments,
          matcher: matcher.arguments[0].arguments.map(computeParsedMatcher)
        })
        continue
      }

      const args = subEx.arguments
        .map(arg => arg.arguments[0])
        .map(arg => /^\d+$/.test(arg) ? +arg : parseArithmetic(arg))

      all.addToProperty(subEx.name, args)
    }

    return all
  }

  console.log(expression)
  throw new Error('Cannot compute the following: ' + expression)
}

const computeParsedMatcher = (expression) => {
  if ('all' === expression.name) {
    const all = new Matcher()

    for (const subEx of expression.arguments) {
      if ('transfer' === subEx.name) {
        const [startLocation, endLocation, matcher] = subEx.arguments
        all.transfers.push({
          startLocation: startLocation.arguments,
          endLocation: endLocation.arguments,
          matcher: matcher.arguments[0].arguments.map(computeParsedMatcher)
        })
        continue
      }

      const args = subEx.arguments
        .map(arg => arg.arguments[0])
        .map(arg => /^\d+$/.test(arg) ? +arg : parseArithmetic(arg))

      all.addToProperty(subEx.name, args)
    }

    return all
  }

  console.log(expression)
  throw new Error('Cannot compute the following: ' + expression)
}

const parseArithmetic = (expression) => {
  const tokens = expression
    .split(/([+\-*/<>])/g)
    .filter(token => undefined !== token)
    .map(token => token.trim())
    .filter(token => '' !== token)

  const stack = [['+', 0]]

  let i = 0

  while (i < tokens.length) {
    const token = tokens[i]
    const nextToken = tokens[i + 1]

    if (/^[+\-*/]$/.test(nextToken)) {
      const newNode = [nextToken, token]
      stack[stack.length - 1][2] = newNode
      stack.push(newNode)

      i += 2
      continue
    }

    if ('<' === token) {
      i++

      let subExStart = i

      let brackets = 1

      while (i < tokens.length) {
        const token = tokens[i]

        if ('<' === token) {
          brackets++
          i++
          continue
        }

        if ('>' === token) {
          brackets--
          i++
          if (0 === brackets) {
            break
          }
          continue
        }

        i++
      }

      const subEx = tokens
        .slice(subExStart, i - 1)
        .join('')

      const nextOp = tokens[i]

      const newNode = /^[+\-*/]$/.test(nextOp)
        ? [nextOp, parseArithmetic(subEx)]
        : parseArithmetic(subEx)
      stack[stack.length - 1][2] = newNode
      stack.push(newNode)

      continue
    }

    stack[stack.length - 1][2] = token

    i++
    continue
  }

  return stack[0][2]
}

export default computeParsedExpression
