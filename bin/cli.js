#!/usr/bin/env node

const ecoji = require('../dist/index')
const stdin = require('get-stdin')

stdin().then(input => {

  if (argv.d) {
    try {
      process.stdout.write(ecoji.decode(input.toString()))
    } catch (e) {
      process.stderr.write('You have provided incorrect data')
      console.error(e)
    }
    process.stdout.write('\n')
  } else {
    process.stdout.write(ecoji.encode(input))
    process.stdout.write('\n')
  }

})

const argv = require('yargs')
  .usage(`Usage: $0 [-d]
  
\Encode or decode data as Unicode emojis. 😁`)

  .example('echo -n 123 | ./bin/ecoji')
  .example('echo 🎌🚟🎈☕ | ./bin/ecoji -d')

  .command('-d', 'decode emoji to string')

  .option('d', {
    alias:    'decode',
    describe: 'decode data',
    type:     'boolean',
    default:  false,
  })

  .version()
  .alias('version', 'v')

  .help()
  .alias('help', 'h')
  .argv

