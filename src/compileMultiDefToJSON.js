import getIndividualCardDefsFromMultiDef from './getIndividualCardDefsFromMultiDef'
import getPropertiesFromCardDef from './getPropertiesFromCardDef'
import parseExpression from './parseExpression'
import computeParsedExpression from './computeParsedExpression'

import mapObject from './mapObject'

const compileActionCardDefinitionsToJSON = (multiDef) => {
  const cardDefs = getIndividualCardDefsFromMultiDef(multiDef)
  const cardProps = mapObject(cardDefs, getPropertiesFromCardDef)

  const parsedCardProps = mapObject(cardProps, (cardProp) => {
    const attacks = cardProp.attack || []
    const defenses = cardProp.defense || []
    const boths = cardProp.both || []
    const prices = cardProp.price || []
    const variables = cardProp.variable || []

    return {
      attacks: attacks.map(splitArrow).map(({ input, output }) => {
        return {
          input: parseExpression(input),
          output: parseExpression(output)
        }
      }),
      defenses: defenses.map(splitArrow).map(({ input, output }) => {
        return {
          input: parseExpression(input),
          output: parseExpression(output)
        }
      }),
      boths: boths.map(splitArrow).map(({ input, output }) => {
        return {
          input: parseExpression(input),
          output: parseExpression(output)
        }
      }),
      prices: prices.map(parseExpression),
      variables: variables.map(parseExpression)
    }
  })

  const computedCardProps = mapObject(parsedCardProps, (parsedCardProp) => {
    const {
      attacks,
      defenses,
      boths,
      prices,
      variables
    } = parsedCardProp

    return {
      attacks: attacks.map(({ input, output }) => {
        return {
          input: computeParsedExpression(input),
          output: computeParsedExpression(output)
        }
      }),
      defenses: defenses.map(({ input, output }) => {
        return {
          input: computeParsedExpression(input),
          output: computeParsedExpression(output)
        }
      }),
      boths: boths.map(({ input, output }) => {
        return {
          input: computeParsedExpression(input),
          output: computeParsedExpression(output)
        }
      }),
      prices: prices.map((price) => {
        return computeParsedExpression(price)
      }),
      variables: variables.map((variable) => {
        const expr = variable.arguments[0].arguments[0].arguments[0]
        const parts = expr
          .split(/([a-zA-Z]+)/)
          .filter(part => undefined !== part)
          .map(part => part.trim())
          .filter(part => '' !== part)

        const nameIndex = parts.findIndex(part => /^[a-zA-Z]+$/.test(part))
        const name = parts[nameIndex]

        const minExpr = nameIndex === 0
          ? null
          : parts[0]
        const maxExpr = nameIndex !== parts.length - 2
          ? null
          : parts[parts.length - 1]

        const minimum = minExpr
          ? {
            isInclusive: minExpr.indexOf('<=') > -1,
            value: +extractDigits(minExpr)
          }
          : null
        const maximum = maxExpr
          ? {
            isInclusive: maxExpr.indexOf('<=') > -1,
            value: +extractDigits(maxExpr)
          }
          : null

        return {
          name,
          minimum,
          maximum
        }
      })
    }
  })

  return computedCardProps
}

const extractDigits = (string) => {
  return string
    .split('')
    .filter(char => /\d/.test(char))
    .join('')
}

const splitArrow = (expression) => {
  const [inputExpression, outputExpression] = expression.split('->')
  return {
    input: inputExpression,
    output: outputExpression
  }
}

export default compileActionCardDefinitionsToJSON
