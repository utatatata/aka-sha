const OE = require('../extra/object')
const core = require('../core')

module.exports = {
  word: OE.map(
    (apiName, apiObj) => ({
      method: apiObj.method,
      validate: apiObj.validate,
    }),
    core.word.apis
  ),
}
