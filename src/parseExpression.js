const appendArgumentToCallStack = (argument, callStack) => {
  const topCall = callStack[callStack.length - 1]
  const args = topCall.arguments

  if (0 === args.length) {
    args.push({
      name: 'all',
      arguments: [argument]
    })

    return
  }

  const lastArg = args[args.length - 1]
  lastArg.arguments.push(argument)
}

const appendEmptyArgumentToCallStack = (callStack) => {
  const topCall = callStack[callStack.length - 1]
  topCall.arguments.push({
    name: 'all',
    arguments: []
  })
}

const parseExpression = (expression) => {
  const tokens = expression.split(/([(),\[\]])|(=>)/g)
    .filter(token => undefined !== token)
    .map(token => token.trim())
    .filter(token => '' !== token)

  if (0 === tokens.length) {
    return { name: 'all', arguments: [] }
  }

  const callStack = [{ name: 'all', arguments: [] }]

  let parens = 0

  let i = 0

  while (i < tokens.length) {
    const token = tokens[i]
    const nextToken = tokens[i + 1]

    if ('cardMatch' === callStack[callStack.length - 1].name) {
      if (']' === token) {
        const topCall = callStack[callStack.length - 1]
        const subExpression = topCall.source
        const [inputExpression, outputExpression] = subExpression.split('=>')
        const [parsedInput, parsedOutput] = [inputExpression, outputExpression].map(parseExpression)

        topCall.arguments = [parsedInput, parsedOutput]
        callStack.pop()

        i++
        continue
      }

      callStack[callStack.length - 1].source += token

      i++
      continue
    }

    if ('(' === nextToken) {
      const newCall = {
        name: token,
        arguments: []
      }

      appendArgumentToCallStack(newCall, callStack)
      callStack.push(newCall)

      i += 2
      continue
    }

    if ('[' === token) {
      const newCall = {
        name: 'cardMatch',
        source: ''
      }

      appendArgumentToCallStack(newCall, callStack)
      callStack.push(newCall)

      i++
      continue
    }

    if (')' === token) {
      callStack.pop()

      i++
      continue
    }

    if (',' === token) {
      appendEmptyArgumentToCallStack(callStack)

      i++
      continue
    }

    appendArgumentToCallStack(token, callStack)

    i++
  }

  return callStack[0].arguments[0]
}

export default parseExpression
