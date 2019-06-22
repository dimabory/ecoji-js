import { deepStrictEqual as deepEq, strictEqual as eq, throws } from 'assert'
import ecoji from '../lib/index'
import data from './fixtures.json'

describe('dimabory/ecoji-js test suite', () => {

  data.forEach(item => {
    it(`${JSON.stringify(item)} encode/decode`, () => {
      eq(ecoji.encode(item.input), item.output)
      eq(ecoji.decode(item.output), item.input)
    })
  })

  it('should encode/decode unicode', () => {
    const emoji = '🍟'
    const hash = '🍝🌫🆓🐊🏦🔦📣🇺🎲🌨☕☕'

    eq(ecoji.encode(emoji), hash)
    eq(ecoji.decode(hash), emoji)
  })

  it('should decoding with new lines', () => {
    const emoji = '🤠'
    const hash = '\n\n🍝🌫🆓🐊🏦🔧🌓🇺🏒🙌☕\n☕\n\n'
    eq(ecoji.decode(hash), emoji)
  })

  it('should throw an exception Unexpected data provided', () => {
    [
      '🤠',
      '🤠🤠',
      '🤠🤠🤠',
      '🤠🤠🤠🤠🤠',
      '→',
      '→↑',
      '→↑←',
    ].forEach(item => {
      throws(() => ecoji.decode(item), new Error('Unexpected emoji sequence provided.'))
    })
  })

  it('should throw an exception Invalid rune ', () => {
    throws(() => ecoji.decode('→↑←↓'), new Error('Invalid rune provided: →'))
    throws(
      () => ecoji.decode(String.fromCharCode(255).repeat(4)),
      new Error('Invalid rune provided: ' + String.fromCharCode(255)))
  })

})

describe('keith-turner/ecoji examples', () => {
  it('should encode/decode well', () => {
    const str = 'Base64 is so 1999, isn\'t there something better?'
    eq(ecoji.encode(str), '🏗📩🎦🐇🎛📘🔯🚜💞😽🆖🐊🎱🥁🚄🌱💞😭💮🇵💢🕥🐭🔸🍉🚲🦑🐶💢🕥🔮🔺🍉📸🐮🌼👦🚟🥰☕')
  })

  it('should concatenate', () => {
    const str = ecoji.encode('abc') + ecoji.encode('6789') + ecoji.encode('XY')
    eq(ecoji.decode(str), 'abc6789XY')
  })

})

it('should sort data', () => {
  const input = [
    'a',
    'ab',
    'abc',
    'abcd',
    'ac',
    'b',
    'ba',
  ]

  const base1024 = input.map(d => ecoji.encode(d))

  base1024.sort()

  deepEq(base1024, [
    '👕☕☕☕',
    '👖📲☕☕',
    '👖📸🎈☕',
    '👖📸🎦⚜',
    '👖🔃☕☕',
    '👙☕☕☕',
    '👚📢☕☕',
  ])

})
