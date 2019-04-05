const yargs = require('yargs')
const akasha = require('./aka-sha')

const toTitle = str =>
  str
    .replace(/^./, head => head.toUpperCase())
    .replace(/-./g, str => ' ' + str[1].toUpperCase())

const audio = data => {
  data.forEach(obj => {
    console.log(`  ${toTitle(obj.audioType)}: ${obj.fileUrl}`)
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

const hyphenation = data => {
  console.log(
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
        .join(' - ')
  )
}

const phrases = data => {
  data.forEach(obj => {
    console.log(`  ${obj.gram1} ${obj.gram2}`)
    console.log()
  })
}

const pronunciations = data => {
  data.forEach(obj => {
    console.log(`  ${toTitle(obj.rawType)}: ${obj.raw}`)
    console.log()
  })
}

const relatedWords = data => {
  data.forEach(obj => {
    console.log(`  ${toTitle(obj.relationshipType)}:`)
    obj.words.forEach(word => {
      console.log(`    ${word}`)
    })
    console.log()
  })
}

const scrabbleScore = data => {
  console.log(`  Score: ${data.value}`)
  console.log()
}

const topExample = data => {
  console.log(`  ${data.text}`)
  console.log(
    `    (${data.title}, ${data.year}${
      data.url !== undefined ? ', ' + data.url : ''
    })`
  )
  console.log()
}

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
    console.log(`${toTitle(whatAbout)}:`)
    dealWith[whatAbout](data)
    console.log()
  } catch (e) {
    console.log('Oops!')
    console.log('Just a moment.')
    console.log(e)
    process.exit()
  }
}

module.exports = yargs
  .locale('en')
  .strict(true)
  .command(
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
      Object.keys(akasha.word).forEach(whatAbout => {
        if (argv[whatAbout]) {
          display(whatAbout, argv.word)
        }
      })

      if (
        Object.keys(akasha.word)
          .map(whatAbout => argv[whatAbout])
          .every(option => option !== true)
      ) {
        display('definitions', argv.word)
      }
    }
  )
