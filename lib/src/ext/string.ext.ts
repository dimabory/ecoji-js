/* tslint:disable-next-line:interface-name */
declare interface String {
  mb_length(): number

  mb_substr(from: number, length?: number): string

  mb_split(): string[]

  has_emoji(): boolean

  encode(): string

  decode(): string
}
