const OE = require('../../extra/object')
const AH = require('../apiHelper')
const apis = require('./apis')
const options = require('./options')

module.exports = {
  apis: OE.map(
    (apiName, apiObj) => ({
      ...apiObj,
      method: (word, params = {}) =>
        AH.get(AH.buildUrl(`/word.json/${word}/${apiName}`, params)),
      validate: params =>
        apiObj.options.map(option => options[option].validate(params)),
    }),
    apis
  ),
  options,
}
