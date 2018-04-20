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
        // .args
        return null // TODO
      })
    }
  })

  return computedCardProps
}

const splitArrow = (expression) => {
  const [inputExpression, outputExpression] = expression.split('->')
  return {
    input: inputExpression,
    output: outputExpression
  }
}

export default compileActionCardDefinitionsToJSON
