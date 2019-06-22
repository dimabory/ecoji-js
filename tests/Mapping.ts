import { strictEqual as eq, throws } from 'assert'
import emoji from '../lib/emojis'
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
      eq(mapping.getEmoji(i), rune(hex))
    })
  })
  emoji.slice(1, 10).forEach((hex, i) => {
    it(`Emoji code ${hex} should be equal to ID ${i}`, () => {
      eq(mapping.getId(rune(hex)), ++i)
    })
  })

  invalidEmojis.forEach(item => {
    it(`${item} should throw an Error`, () => {
      throws(() => mapping.getId(item), new Error(`Invalid rune provided: ${item}`))
    })
  })

  it(`ID > 1025 AND < -1 should throw an Error`, () => {
    throws(() => mapping.getEmoji(1025), new Error(`Invalid id provided: ${1025}`))
    throws(() => mapping.getEmoji(-2), new Error(`Invalid id provided: ${-2}`))
  })

  it('padding should be in the list of emojis', () => {
    eq(mapping.getPadding(), mapping.getEmoji(-1))
    eq(-1, mapping.getId(mapping.getPadding()))
  })

  it('padding should be equal to 0x2615', () => {
    eq(mapping.getPadding(), rune(0x2615))
  })
  it('padding40 should be equal to 0x2615', () => {
    eq(mapping.getPadding40(), rune(0x269C))
  })
  it('padding41 should be equal to 0x2615', () => {
    eq(mapping.getPadding41(), rune(0x1F3CD))
  })
  it('padding42 should be equal to 0x2615', () => {
    eq(mapping.getPadding42(), rune(0x1F4D1))
  })
  it('padding43 should be equal to 0x2615', () => {
    eq(mapping.getPadding43(), rune(0x1F64B))
  })
})
