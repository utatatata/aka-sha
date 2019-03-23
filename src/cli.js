const yargs = require('yargs')
const aka = require('./aka')

module.exports =
  yargs
    .command('$0', 'default', () => {}, argv => {
      console.log(aka.greet('AKAsha'))
    })
