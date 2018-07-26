import emoji   from '../lib/src/emojis'
import Mapping from '../lib/src/Mapping'

const invalidEmojis = [
  '0x2615',
  '0x269C',
  '0x1F3CD',
  '0x1F4D1',
  '0x1F64B',
]

const mapping = new Mapping(emoji)

describe('Mapping.ts test', () => {

  const rune = (hex: string | number) => String.fromCodePoint(Number(hex))

  emoji.slice(0, 10).forEach((hex, i) => {
    it(`ID: ${i} should be equal to emoji code ${hex}`, () => {
      expect(mapping.getEmoji(i)).toEqual(rune(hex))
    })
  })
  emoji.slice(1, 10).forEach((hex, i) => {
    it(`Emoji code ${hex} should be equal to ID ${i}`, () => {
      expect(mapping.getId(rune(hex))).toEqual(++i)
    })
  })

  invalidEmojis.forEach(item => {
    it(`${item} should throw an Error`, () => {
      expect(() => mapping.getId(item)).toThrow(new Error(`Invalid rune provided: ${item}`))
    })
  })

  it(`ID > 1025 AND < -1 should throw an Error`, () => {
    expect(() => mapping.getEmoji(1025)).toThrow(new Error(`Invalid id provided: ${1025}`))
    expect(() => mapping.getEmoji(-2)).toThrow(new Error(`Invalid id provided: ${-2}`))
  })

  it('padding should be in the list of emojis', () => {
    expect(mapping.getPadding()).toEqual(mapping.getEmoji(-1))
    expect(-1).toEqual(mapping.getId(mapping.getPadding()))
  })

  it('padding should be equal to 0x2615', () => {
    expect(mapping.getPadding()).toEqual(rune(0x2615))
  })
  it('padding40 should be equal to 0x2615', () => {
    expect(mapping.getPadding40()).toEqual(rune(0x269C))
  })
  it('padding41 should be equal to 0x2615', () => {
    expect(mapping.getPadding41()).toEqual(rune(0x1F3CD))
  })
  it('padding42 should be equal to 0x2615', () => {
    expect(mapping.getPadding42()).toEqual(rune(0x1F4D1))
  })
  it('padding43 should be equal to 0x2615', () => {
    expect(mapping.getPadding43()).toEqual(rune(0x1F64B))
  })
})
