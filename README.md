# AKAsha

A command-line dictionary and thesaurus using Wordnik API.

## Usage

Install `@utatatata/aka-sha` in global using NPM (or Yarn).

```
// NPM
$ npm i -g @utatatata/aka-sha

// Yarn
$ yarn global add @utatatata/aka-sha
```

Then you can run `aka-sha` or `aka` command.

Also you can see the help with `--help` option.

```
$ aka -h

aka <word>

get infomation for the word

Options:
  --help                Show help                                      [boolean]
  --version             Show version number                            [boolean]
  --audio               Fetches audio metadata for the word            [boolean]
  --definitions, -d     Returns definitions for the word               [boolean]
  --etymologies         Fetches etymology data                         [boolean]
  --examples, -e        Returns examples for the word                  [boolean]
  --frequency           Returns word usage over time                   [boolean]
  --hyphenation, -h     Returns syllable information for the word      [boolean]
  --phrases, -p         Fetches bi-gram phrases for the word           [boolean]
  --pronunciations, -n  Returns text pronunciations for the word       [boolean]
  --relatedWords, -r    Returns relationships from the Word Graph      [boolean]
  --scrabbleScore       Returns the Scrabble score for the word        [boolean]
  --topExample          Returns a top example for the word             [boolean]
```
