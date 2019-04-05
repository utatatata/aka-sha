const base = require('./_base')

const wordGetUri = (word, what, params = {}) =>
  base.getUri(`/word.json/${word}/${what}`, params)

const wordGet = what => (word, params = {}) =>
  base.get(wordGetUri(word, what, params))

const apis = [
  'audio',
  'definitions',
  'etymologies',
  'examples',
  'frequency',
  'hyphenation',
  'phrases',
  'pronunciations',
  'relatedWords',
  'scrabbleScore',
  'topExample',
].reduce((apis, what) => ({ ...apis, [what]: wordGet(what) }), {})

module.exports = {
  wordGetUri,
  wordGet,
  apis: apis,
}
