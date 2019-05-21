const os = require('os')
const yargs = require('yargs')
const core = require('../core')
const AE = require('../extra/array')
const OE = require('../extra/object')
const display = require('./display')

module.exports = yargs
  .locale('en')
  .strict(true)
  .command(
    '$0 <word>',
    'get infomation for the word',
    yargs =>
      yargs.options(
        OE.map((name, obj) => obj.yargs, {
          ...core.word.apis,
          ...core.word.options,
        })
      ),
    async argv => {
      const wordSelectedAPiNames = Object.keys(core.word.apis).filter(
        apiName => argv[apiName] === true
      )
      const wordSelectedApis = OE.filter(
        (apiName, apiObj) => argv[apiName] === true,
        core.word.apis
      )
      const wordAvailableOptionNames = AE.flatten(
        OE.mapToValues((apiName, apiObj) => apiObj.options, wordSelectedApis)
      )
      const wordAvailableOptions = OE.filter(
        (optionName, optionObj) =>
          wordAvailableOptionNames.includes(optionName),
        core.word.options
      )
      const wordUsedOptions = OE.filter(
        (optionName, optinoObj) => Object.keys(argv).includes(optionName),
        wordAvailableOptions
      )

      {
        const wordInvalidOptionNames = OE.filterToKeys(
          (optionName, optionObj) => !optionObj.validate(argv[optionName]),
          wordUsedOptions
        )
        if (wordInvalidOptionNames.length > 0) {
          process.stderr.write(
            `Invalid options: '${wordInvalidOptionNames.join(', ')}'${os.EOL}`
          )
          process.exit()
        }
      }
      const result = await Promise.all(
        OE.mapToValues(
          async (apiName, apiObj) => [
            apiName,
            await apiObj.method(
              argv.word,
              OE.filter((k, v) => apiObj.options.includes(k), argv)
            ),
          ],
          wordSelectedApis
        )
      )

      const displayRows = AE.flatten(
        AE.interpose(
          ['', ''],
          result.map(([apiName, data]) => display[apiName](data))
        )
      )

      const displayString = displayRows.join(os.EOL)
      const removeXrefTags = str => str.replace(/(\<xref\>|\<\/xref\>)/g, '`')
      process.stdout.write(removeXrefTags(displayString) + os.EOL)
    }
  )
