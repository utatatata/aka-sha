const yargs = require('yargs')
const akasha = require('./aka-sha')

const audio = data => {
  console.log('Audio:')
  data.forEach(obj => {
    console.log(`  ${obj.audioType}: ${obj.fileUrl}`)
    console.log(`    (${obj.attributionText})`)
    console.log()
  })
}
const definitions = data => {
  console.log('Definitions:')
  data.forEach(obj => {
    console.log(`  ${obj.text}`)
    console.log(`    (${obj.attributionText})`)
    console.log()
  })
}
const etymologies = data => {
  console.log('Etymologies:')
  data.forEach(str => {
    console.log(`  XML:`)
    console.log(`${str}`)
    console.log()
  })
}
const examples = data => {
  console.log('Examples:')
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
  console.log('Frequency:')
  data.frequency.forEach(obj => {
    console.log(`  the year ${obj.year}: ${obj.count.toString().padStart(3)}`)
  })
  console.log()
  console.log()
}

module.exports = yargs.locale('en').command(
  '$0 <word>',
  'get infomation of the word',
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
    if (argv.audio) {
      const data = await akasha.word.audio(argv.word).catch(e => {
        console.error('Error!', e)
        process.exit()
      })
      audio(data)
    }
    if (argv.definitions) {
      const data = await akasha.word.definitions(argv.word).catch(e => {
        console.error('Error!', e)
        process.exit()
      })
      definitions(data)
    }
    if (argv.etymologies) {
      const data = await akasha.word.etymologies(argv.word).catch(e => {
        console.error('Error!', e)
        process.exit()
      })
      etymologies(data)
    }
    if (argv.examples) {
      const data = await akasha.word.examples(argv.word).catch(e => {
        console.error('Error!', e)
        process.exit()
      })
      examples(data)
    }
    if (argv.frequency) {
      const data = await akasha.word.frequency(argv.word).catch(e => {
        console.error('Error!', e)
        process.exit()
      })
      frequency(data)
    }

    if (
      Object.keys(akasha.word)
        .map(apiName => argv[apiName])
        .every(opt => opt !== true)
    ) {
      const data = await akasha.word.definitions(argv.word)
      definitions(data)
    }
  }
)
