# ecoji-js | 1️⃣0️⃣2️⃣4️⃣  👨‍💻🔥#️⃣🌎🛫🕶️

[![npm version](https://badge.fury.io/js/ecoji-js.svg)](https://www.npmjs.com/package/ecoji-js)
[![Build Status](https://travis-ci.com/dimabory/ecoji-js.svg?branch=master)](https://travis-ci.com/dimabory/ecoji-js)
[![codecov](https://codecov.io/gh/dimabory/ecoji-js/branch/master/graph/badge.svg)](https://codecov.io/gh/dimabory/ecoji-js)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](https://opensource.org/licenses/Apache-2.0)

A JavaScript implementation of the [Ecoji](https://github.com/keith-turner/ecoji) encoding standard. Provides a simple API to encode or/and decode data as a base-1024 sequence of emoji symbols.

## Installation

```bash
# globally
$ npm i -g ecoji-js
$ ecoji -h

# locally
$ npm i -S ecoji-js
$ ./node_modules/.bin/ecoji -h
```

## Usage

The library provides two public methods to encode and/or decode data: 
* `encode(str: string): string`
* `decode(str: string): string`

### Encoding
```js
const ecoji = require('ecoji-js')
const str = 'Hello World'
ecoji.encode(str)
```
```
🏯🔩🚗🌷🍉👇🦒🕊👡☕☕☕
```
### Decoding
```js
const ecoji = require('ecoji-js')
const str = '🏯🔩🚗🌷🍉👇🦒🕊👡☕☕☕'
ecoji.decode(str)
```
```
Hello World
```
### CLI

```bash
$ ecoji -h
Usage: ecoji [-d]

Encode or decode data as Unicode emojis. 😁

Commands:
  ecoji -d  decode emoji to string

Options:
  -d, --decode   decode data                          [boolean] [default: false]
  --version, -v  Show version number                                   [boolean]
  --help, -h     Show help                                             [boolean]

Examples:
  echo -n 123 | ./bin/ecoji
  echo 🎌🚟🎈☕ | ./bin/ecoji -d

```
## [Ecoji encoding standard](https://github.com/keith-turner/ecoji/blob/master/docs/encoding.md)
Read more about standard by following above link.

## License
This project is licensed under the terms of the [Apache License 2.0](LICENSE).

Copyright (©️) 2019 Dmytro Borysovskyi
