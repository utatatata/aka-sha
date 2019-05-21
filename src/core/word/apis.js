const OE = require('../../extra/object')

module.exports = OE.map(
  (apiName, apiObj) => ({
    ...apiObj,
    yargs: { ...apiObj.yargs, type: 'boolean' },
  }),
  {
    audio: {
      yargs: {
        desc: 'Fetches audio metadata for the word.',
      },
      options: ['useCanonical', 'limit'],
    },
    definitions: {
      yargs: {
        alias: 'd',
        desc: 'Returns definitions for the word.',
      },
      options: [
        'limit',
        'partOfSpeech',
        'includeRelated',
        'sourceDictionaries',
        'useCanonical',
        'includeTags',
      ],
    },
    etymologies: {
      yargs: {
        desc: 'Fetches etymology data.',
      },
      options: ['useCanonical'],
    },
    examples: {
      yargs: {
        alias: 'e',
        desc: 'Returns examples for the word.',
      },
      options: ['includeDuplicates', 'useCanonical', 'skip', 'limit'],
    },
    frequency: {
      yargs: {
        desc: 'Returns word usage over time.',
      },
      options: ['useCanonical', 'startYear', 'endYear'],
    },
    hyphenation: {
      yargs: {
        alias: 'h',
        desc: 'Returns syllable information for the word.',
      },
      options: ['useCanonical', 'sourceDictionary', 'limit'],
    },
    phrases: {
      yargs: {
        alias: 'p',
        desc: 'Fetches bi-gram phrases for the word.',
      },
      options: ['limit', 'wlmi', 'useCanonical'],
    },
    pronunciations: {
      yargs: {
        alias: 'n',
        desc: 'Returns text pronunciations for the word.',
      },
      options: ['useCanonical', 'sourceDictionary', 'typeFormat', 'limit'],
    },
    relatedWords: {
      yargs: {
        alias: 'r',
        desc: 'Returns relationships from the Word Graph.',
      },
      options: [
        'useCanonical',
        'relationshipTypes',
        'limitPerRelationshipType',
      ],
    },
    scrabbleScore: {
      yargs: {
        desc: 'Returns the Scrabble score for the word.',
      },
      options: [],
    },
    topExample: {
      yargs: {
        desc: 'Returns a top example for the word.',
      },
      options: ['useCanonical'],
    },
  }
)
