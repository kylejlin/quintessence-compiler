export default `
LEFT_CURLY ::= #x7B
RIGHT_CURLY ::= #x7D
COLON ::= #x3A
WS ::= [#x20#x09#x0A#x0D]+   /* Space | Tab | \\n | \\r */

multiDef ::= (WS* cardDef WS*)*

cardDef ::= cardName WS* LEFT_CURLY cardDefBody RIGHT_CURLY

cardName ::= [a-zA-Z]+ (" " [a-zA-Z]+)*

cardDefBody ::= WS* (WS* propertyDef WS*)+ WS*

propertyDef ::= propertyName WS* COLON WS* propertyValue

propertyName ::= [a-zA-Z]+

propertyValue ::= primitiveExpressions | (primitiveExpressions? "->" primitiveExpressions?)

primitiveExpressions ::= ((funcCall | matcherDef) WS*)+

funcCall ::= funcName WS* "(" WS* funcArgs WS* ")"

funcName ::= [a-zA-Z]+

funcArgs ::= WS* funcArg WS* ("," WS* funcArg WS*)*

funcArg ::= (primitiveExpressions | [a-zA-Z0-9]+)+

matcherDef ::= WS* "[" WS* primitiveExpressions? WS* "=>" WS* primitiveExpressions? WS* "]"
`
