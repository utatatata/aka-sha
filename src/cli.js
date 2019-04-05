const yargs = require('yargs')
const akasha = require('./aka-sha')

const audio = data => {
  data.forEach(obj => {
    console.log(`  ${obj.audioType}: ${obj.fileUrl}`)
    console.log(`    (${obj.attributionText})`)
    console.log()
  })
}
const definitions = data => {
  data.forEach(obj => {
    console.log(`  ${obj.text}`)
    console.log(`    (${obj.attributionText})`)
    console.log()
  })
}
const etymologies = data => {
  data.forEach(str => {
    console.log(`  XML:`)
    console.log(`${str}`)
    console.log()
  })
}
const examples = data => {
  data.examples.forEach(obj => {
    console.log(`  ${obj.text}`)
    console.log(
      `    (${obj.title}, ${obj.year}${
        obj.url !== undefined ? ', ' + obj.url : ''
      })`
    )
    console.log()
  })
}
const frequency = data => {
  data.frequency.forEach(obj => {
    console.log(`  the year ${obj.year}: ${obj.count.toString().padStart(3)}`)
  })
  console.log()
}

const hyphenation = data => {}
const phrases = data => {}
const pronunciations = data => {}
const relatedWords = data => {}
const scrabbleScore = data => {}
const topExample = data => {}

const dealWith = {
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

const display = async (whatAbout, word) => {
  try {
    const data = await akasha.word[whatAbout](word)
    console.log(`${whatAbout.replace(/^./, head => head.toUpperCase())}:`)
    dealWith[whatAbout](data)
    console.log()
  } catch (e) {
    console.log('Oops!')
    console.log('Just a moment.')
    console.log(e)
    process.exit()
  }
}

module.exports = yargs.locale('en').command(
  '$0 <word>',
  'get infomation for the word',
  yargs =>
    yargs
      .option('audio', {
        desc: 'Fetches audio metadata for the word',
        type: 'boolean',
      })
      .option('definitions', {
        alias: 'd',
        desc: 'Returns definitions for the word',
        type: 'boolean',
      })
      .option('etymologies', {
        desc: 'Fetches etymology data',
        type: 'boolean',
      })
      .option('examples', {
        alias: 'e',
        desc: 'Returns examples for the word',
        type: 'boolean',
      })
      .option('frequency', {
        desc: 'Returns word usage over time',
        type: 'boolean',
      })
      .option('hyphenation', {
        alias: 'h',
        desc: 'Returns syllable information for the word',
        type: 'boolean',
      })
      .option('phrases', {
        alias: 'p',
        desc: 'Fetches bi-gram phrases for the word',
        type: 'boolean',
      })
      .option('pronunciations', {
        alias: 'n',
        desc: 'Returns text pronunciations for the word',
        type: 'boolean',
      })
      .option('relatedWords', {
        alias: 'r',
        desc: 'Returns relationships from the Word Graph',
        type: 'boolean',
      })
      .option('scrabbleScore', {
        desc: 'Returns the Scrabble score for the word',
        type: 'boolean',
      })
      .option('topExample', {
        desc: 'Returns a top example for the word',
        type: 'boolean',
      }),
  async argv => {
    if (argv.all) {
      return
    }

    Object.keys(akasha.word).forEach(whatAbout => {
      if (argv[whatAbout]) {
        display(whatAbout, argv.word)
      }
    })
    // if (argv.audio) {
    //   display('audio', argv.word)
    // }
    // if (argv.definitions) {
    //   display('definitions', argv.word)
    // }
    // if (argv.etymologies) {
    //   display('etymologies', argv.word)
    // }
    // if (argv.examples) {
    //   display('examples', argv.word)
    // }
    // if (argv.frequency) {
    //   display('frequency', argv.word)
    // }
    // if (argv.hyphenation) {
    //   display('hyphenation', argv.word)
    // }
    // if (argv.phrases) {
    //   display('phrases', argv.word)
    // }
    // if (argv.pronunciations) {
    //   display('pronunciations', argv.word)
    // }
    // if (argv.relatedWords) {
    //   display('relatedWords', argv.word)
    // }
    // if (argv.scrabbleScore) {
    //   display('scrabbleScore', argv.word)
    // }
    // if (argv.topExample) {
    //   display('topExample', argv.word)
    // }

    if (
      Object.keys(akasha.word)
        .map(apiName => argv[apiName])
        .every(opt => opt !== true)
    ) {
      display('definitions', argv.word)
    }
  }
)
