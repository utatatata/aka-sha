const isBoolean = bool => bool === true || bool === false
const isNaturalNumber = n => Number.isInteger(n) && Math.abs(n) === n
const isString = str => typeof str === 'string'

module.exports = {
  isBoolean,
  isNaturalNumber,
  isString,
}
