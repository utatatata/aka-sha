const yargs = require('yargs')
const akasha = require('./aka-sha')

module.exports = yargs.command(
  '$0',
  'default',
  () => {},
  async argv => {
    const d = await akasha.word.definitions('hello')
    console.log(d)
  }
)
