# quintessence-compiler

This compiles card definitions written in Quintessence Card Definition Language to JSON.

## Use

```bash
npm install --save quintessence-compiler
```

```javascript
import { compileMultiDefToJSON } from 'quintessence-compiler'
```

### Example
```javascript
import { compileMultiDefToJSON } from 'quintessence-compiler'
import fs from 'fs'

fs.readFile('myCard.txt', 'utf8', (error, sourceCode) => {
  if (error) {
    throw error
  }

  const json = compileMultiDefToJSON(sourceCode)
  const jsonString = JSON.stringify(json)

  fs.writeFile('myCard.json', jsonString, 'utf8', (error) => {
    if (error) {
      throw error
    }
  })
})
```
