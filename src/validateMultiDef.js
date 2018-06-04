import { Grammars } from 'ebnf'
import multiDefGrammar from './multiDefGrammar.asset'

const parser = new Grammars.W3C.Parser(multiDefGrammar)

export default (sourceCode) => {
  try {
    console.log('sc: ', sourceCode)
    const ast = parser.getAST(sourceCode)
    console.log('ast: ', ast)
    return true
  } catch (error) {
    console.log('parsing error: ', error)
    return false
  }
}
