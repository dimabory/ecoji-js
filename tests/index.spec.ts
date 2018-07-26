import ecoji from '../lib'
/* tslint:disable-next-line:no-var-requires */
const data: any[] = require('./test.json')

describe('ecoji', () => {

  data.forEach(item => {
    it('should be encoded/decoded', () => {
      expect(ecoji.encode(item.input)).toEqual(item.output)
      expect(ecoji.decode(item.output)).toEqual(item.input)
    })
  })

  it('should encode/decode unicode', () => {
    const emoji = '🍟'
    const hash  = '🍝🌫🆓🐊🏦🔦📣🇺🎲🌨☕☕'

    expect(ecoji.encode(emoji)).toEqual(hash)
    expect(ecoji.decode(hash)).toEqual(emoji)
  })

  it('should decoding with new lines', () => {
    const emoji = '🤠'
    const hash  = '\n\n🍝🌫🆓🐊🏦🔧🌓🇺🏒🙌☕\n☕\n\n'
    expect(ecoji.decode(hash)).toEqual(emoji)
  })

  it('should throw an exception Unexpected data provided', () => {
    [
      '🤠',
      '🤠🤠',
      '🤠🤠🤠',
      '→',
      '→↑',
      '→↑←',
    ].forEach(item => {
      expect(() => ecoji.decode(item)).toThrow(new Error('Unexpected data provided. Expected more than 4 emojis'))
    })
  })

  it('should throw an exception Invalid rune ', () => {
    expect(() => ecoji.decode('→↑←↓')).toThrow(new Error('Invalid rune provided: →'))
    expect(
      () => ecoji.decode(String.fromCharCode(255).repeat(4)),
    ).toThrow(new Error('Invalid rune provided: ' + String.fromCharCode(255)))
  })

})

describe('keith-turner/ecoji examples', () => {
  it('should encode/decode well', () => {
    const str = 'Base64 is so 1999, isn\'t there something better?'
    expect(ecoji.encode(str)).toEqual('🏗📩🎦🐇🎛📘🔯🚜💞😽🆖🐊🎱🥁🚄🌱💞😭💮🇵💢🕥🐭🔸🍉🚲🦑🐶💢🕥🔮🔺🍉📸🐮🌼👦🚟🥰☕')
  })

  it('should concatenate', () => {
    const str = ecoji.encode('abc') + ecoji.encode('6789') + ecoji.encode('XY')
    expect(ecoji.decode(str)).toEqual('abc6789XY')
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

  expect(base1024).toEqual([
    '👕☕☕☕',
    '👖📲☕☕',
    '👖📸🎈☕',
    '👖📸🎦⚜',
    '👖🔃☕☕',
    '👙☕☕☕',
    '👚📢☕☕',
  ])

})
