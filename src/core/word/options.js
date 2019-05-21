const VH = require('../validatorHelper')

const partOfSpeechList = [
  'noun',
  'adjective',
  'verb',
  'adverb',
  'interjection',
  'pronoun',
  'preposition',
  'abbreviation',
  'affix',
  'article',
  'auxiliary-verb',
  'conjunction',
  'definite-article',
  'family-name',
  'given-name',
  'idiom',
  'imperative',
  'noun-plural',
  'noun-posessive',
  'past-participle',
  'phrasal-prefix',
  'proper-noun',
  'proper-noun-plural',
  'proper-noun-posessive',
  'suffix',
  'verb-intransitive',
  'verb-transitive',
]

const sourceDictionaryList = [
  'ahd',
  'century',
  'cmu',
  'macmillan',
  'wiktionary',
  'webster',
  'wordnet',
]

const sourceDictionariesList = ['all', ...sourceDictionaryList]

const typeFormatList = ['ahd', 'arpabet', 'gcide-diacritical', 'IPA']

const relationshipTypesList = [
  'synonym',
  'antonym',
  'variant',
  'equivalent',
  'cross-reference',
  'related-word',
  'rhyme',
  'form',
  'etymologically-related-tem',
  'hypernym',
  'hyponynm',
  'inflected-form',
  'primary',
  'same-context',
  'verb-form',
  'verb-stem',
  'has-topic',
]

module.exports = {
  useCanonical: {
    yargs: {
      alias: 'c',
      desc:
        "If true will try to return the correct word root ('cats' -> 'cat'). If false returns exactly what was requested.",
      type: 'boolean',
      default: false,
    },
    validate: VH.isBoolean,
  },
  includeSuggestions: {
    yargs: {
      desc: 'Return suggestions (for correct spelling, case variants, etc.).',
      type: 'boolean',
      default: true,
    },
    validate: VH.isBoolean,
  },
  limit: {
    yargs: {
      alias: 'l',
      desc: 'Maximum number of results to return.',
      type: 'number',
      default: 5,
    },
    validate: n => VH.isNaturalNumber(n) && 1 <= n && n <= 50,
  },
  partOfSpeech: {
    yargs: {
      desc: 'list of part-of-speech types.',
      type: 'array',
      choices: partOfSpeechList,
    },
    validate: str => VH.isString(str) && partOfSpeechList.include(str),
  },
  includeRelated: {
    yargs: {
      desc: 'Return related words with definitions.',
      type: 'boolean',
    },
    validate: VH.isBoolean,
  },
  sourceDictionaries: {
    yargs: {
      desc: 'Source dictionary to return definitions from.',
      type: 'string',
      choices: sourceDictionariesList,
    },
    validate: str => VH.isString(str) && sourceDictionariesList.include(str),
  },
  includeTags: {
    yargs: {
      desc: 'Return a closed set of XML tags in response',
      type: 'boolean',
      default: false,
    },
    validate: VH.isBoolean,
  },
  includeDuplicates: {
    yargs: {
      desc: 'Show duplicate examples from different sources',
      type: 'boolean',
      default: false,
    },
    validate: VH.isBoolean,
  },
  skip: {
    yargs: {
      desc: 'Results to skip',
      type: 'number',
    },
    validate: VH.isNaturalNumber,
  },
  startYear: {
    yargs: {
      desc: 'Starting Year',
      type: 'number',
    },
    validate: VH.isNaturalNumber,
  },
  endYear: {
    yargs: {
      desc: 'Ending Year',
      type: 'number',
    },
    validate: VH.isNaturalNumbern,
  },
  wlmi: {
    yargs: {
      desc: 'Minimum WLMI for the phrase',
      type: 'number',
    },
    validate: VH.isNaturalNumber,
  },
  sourceDictionary: {
    yargs: {
      desc:
        'Get from a single dictionary. Valid options: ahd, century, wiktionary, webster, and wordnet.',
      type: 'string',
      choices: sourceDictionaryList,
    },
    validate: str => VH.isString(str) && sourceDictionaryList.include(str),
  },
  typeFormat: {
    yargs: {
      desc: 'Text pronunciation type',
      type: 'string',
      choices: typeFormatList,
    },
    validate: str => VH.isString(str) && typeFormatList.include(str),
  },
  relationshipTypes: {
    yargs: {
      desc: 'Limits the total results per type of relationship type',
      type: 'string',
      choices: relationshipTypesList,
    },
    validate: str => VH.isString(str) && relationshipTypesList.include(str),
  },
  limitPerRelationshipTypes: {
    yargs: {
      desc: 'Restrict to the supplied relatinship types',
      type: 'number',
    },
    validate: VH.isNaturalNumber,
  },
}
