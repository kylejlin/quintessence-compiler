import sampleActionCardMultiDef from './sampleActionCardMultiDef.asset'
import compileMultiDefToJSON from '../compileMultiDefToJSON'

test('it generates the correct JSON', () => {
  const json = compileMultiDefToJSON(sampleActionCardMultiDef)
  expect(JSON.stringify(json, null, 4)).toMatchSnapshot()
})
