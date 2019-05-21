const AE = require('../extra/array')

const toTitle = str =>
  str
    .replace(/^./, head => head.toUpperCase())
    .replace(/-./g, str => ' ' + str[1].toUpperCase())

const audio = data => [
  'Audio:',
  ...AE.flattenWith(
    '',
    data.map(obj => [
      `  ${toTitle(obj.audioType)}: ${obj.fileUrl}`,
      `    (${obj.attributionText})`,
    ])
  ),
]

const definitions = data => [
  'Definitions:',
  ...AE.flattenWith(
    '',
    data.map(obj => [`  ${obj.text}`, `    (${obj.attributionText})`])
  ),
]

const etymologies = data => [
  'Etymologies:',
  ...AE.flattenWith('', data.map(str => [`  XML:`, `${str}`])),
]

const examples = data => [
  'Examples:',
  ...AE.flattenWith(
    '',
    data.examples.map(obj => [
      `  ${obj.text}`,
      `    (${obj.title}, ${obj.year}${
        obj.url !== undefined ? ', ' + obj.url : ''
      })`,
    ])
  ),
]

const frequency = data => [
  'Frequency:',
  ...data.frequency.map(
    obj => `  the year ${obj.year}: ${obj.count.toString().padStart(3)}`
  ),
]

const hyphenation = data => [
  'Hyphenation:',
  '  ' +
    data
      .map(
        syllable =>
          (syllable.type === 'stress'
            ? "'"
            : syllable.type === 'secondary stress'
            ? '`'
            : '') + syllable.text
      )
      .join(' - '),
]

const phrases = data => [
  'Phrases:',
  ...AE.flattenWith('', data.map(obj => [`  ${obj.gram1} ${obj.gram2}`])),
]

const pronunciations = data => [
  'Pronunciations:',
  ...AE.flattenWith(
    '',
    data.map(obj => [`  ${toTitle(obj.rawType)}: ${obj.raw}`])
  ),
]

const relatedWords = data => [
  'Related words:',
  ...AE.flattenWith(
    '',
    data.map(obj => [
      `  ${toTitle(obj.relationshipType)}:`,
      ...obj.words.map(word => `    ${word}`),
    ])
  ),
]

const scrabbleScore = data => ['Scrabble score:', `  Score: ${data.value}`]

const topExample = data => [
  'Top example:',
  `  ${data.text}`,
  `    (${data.title}, ${data.year}${
    data.url !== undefined ? ', ' + data.url : ''
  })`,
]

module.exports = {
  audio,
  definitions,
  etymologies,
  examples,
  frequency,
  hyphenation,
  phrases,
  pronunciations,
  relatedWords,
  scrabbleScore,
  topExample,
}
