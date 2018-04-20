import sampleActionCardMultiDef from './sampleActionCardMultiDef.asset'
import compileMultiDefToJSON from '../compileMultiDefToJSON'

test('it generates the correct JSON', () => {
  const json = compileMultiDefToJSON(sampleActionCardMultiDef)
  expect(json).toMatchSnapshot()
})
