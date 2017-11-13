'use strict'

const en = require('./en')
const unicode = require('./unicode')

module.exports = parse


function parse (str, t) {
  if (typeof str !== 'string') throw Error('Argument should be a string')
  str = str.trim().toLowerCase()

  if (unicode[str]) return unicode[str]

  if (!t) t = en

  let match

  // one point two
  if (match = t.point.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let right = str.slice(match.index + match[0].length).trim()

    let unit = parseNumber(left, t)
    let fract = parseNumber(right, t)
    let mag = Math.pow(10, Math.ceil(Math.log(fract) / Math.LN10))

    return [unit * mag + fract, mag]
  }

  // hundred percent
  if (match = t.percent.exec(str)) {
    let left = str.slice(0, match.index).trim()

    let unit = parseNumber(left, t)

    return [unit, 100]
  }

  // 1 over 2
  if (match = t.over.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let right = str.slice(match.index + match[0].length).trim()

    let num = parseNumber(left, t)
    let denom = parseNumber(right, t)

    return [num, denom]
  }

  // any generic sort of pattern
  let [patternStr, args] = detectPattern(str, t)

  if (t.pattern[patternStr]) return t.pattern[patternStr].apply(t, args)

  throw Error('Unknown pattern `' + patternStr + '` for string `' + str + '`')
}


// return number representation of a word
function parseNumber (str, t) {
  str = str.trim()

  let [pattern, args] = detectPattern(str, t)

  pattern += ' U'
  args.push(0)

  if (t.pattern[pattern]) return t.pattern[pattern].apply(t, args)[0]

  throw Error('Unknown pattern `' + pattern + '` for string `' + str + '`')
  return NaN
}


// get pattern/arguments out of a string
function detectPattern (str, t) {
  let pattern = []
  let args = []
  let delim = /[-−—⁃\s]+|$/i
  let s = str
  let match

  while (match = delim.exec(s)) {
    // get chunk
    let chunk = s.slice(0, match.index)

    if (!chunk) break

    // put chunk type to pattern
    let type = detectType(chunk, t)

    pattern.push(type[0])
    args.push(type[1])

    pattern.push(/[-−—⁃]/.test(match[0]) ? '-' : ' ')

    // leave rest of string only
    s = s.slice(match.index + match[0].length)
  }

  return [pattern.join('').trim(), args]
}


// return numeral type from the string
function detectType(str, t) {
  let num = parseFloat(str)

  // 28.93
  if (!isNaN(num)) {
    for (let suffix in t.ordinal.suffix) {
      if (str.slice(-suffix.length) === suffix) return ['N', num]
      else return ['n', num]
    }
  }

  // third
  if (t.ordinal.unit[str] != null) return ['U', t.ordinal.unit[str]]

  // tenth
  if (t.ordinal.ten[str]) return ['T', t.ordinal.ten[str]]

  // thousandth
  if (t.ordinal.magnitude[str]) return ['M', t.ordinal.magnitude[str]]

  // three
  if (t.cardinal.unit[str] != null) return ['u', t.cardinal.unit[str]]

  // fourty
  if (t.cardinal.ten[str]) return ['t', t.cardinal.ten[str]]

  // thousand
  if (t.cardinal.magnitude[str]) return ['m', t.cardinal.magnitude[str]]

  throw Error('Unknown part `' + str + '`')
}
