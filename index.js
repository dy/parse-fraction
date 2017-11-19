'use strict'

const en = require('./en')
const unicode = require('./unicode')

module.exports = parseFraction


function parseFraction (str, t) {
  if (typeof str !== 'string') throw Error('Argument should be a string')
  str = str.trim().toLowerCase()

  // 9½ etc
  if (unicode[str[str.length - 1]]) {
    let n = parseInt(str.slice(0, -1))

    let fract = unicode[str.slice(-1)]

    if (!isNaN(n)) {
      fract[0] += n * fract[1]
    }

    return fract
  }

  if (!t) t = en

  let match

  // 1 over 2
  if (match = t.over.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let right = str.slice(match.index + match[0].length).trim()

    let denom = parseNumber(right, t)

    // test if last value is numeric for `9 1/2` cases
    let last = left.split(' ').pop()
    let lastN = parseInt(last.replace(/[\,\.]/ig, ''))

    if (!isNaN(lastN)) {
      left = left.slice(0, -last.length)
      let num = left ? parseNumber(left, t) : 0
      return [num * denom + lastN, denom]
    }

    let num = parseNumber(left, t)

    return [num, denom]
  }

  // N and a half
  if (match = t.junction.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let right = str.slice(match.index + match[0].length).trim()

    let int = parseNumber(left, t)
    let fract = parseFraction(right, t)

    return [int * fract[1] + fract[0], fract[1]]
  }

  // one point two
  if (match = t.point.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let right = str.slice(match.index + match[0].length).trim()
    let unit = left ? parseNumber(left, t) : 0

    // fraction part
    let [pattern, args, zeros] = detectPattern(right, t)
    args.push(0)

    if (!t.pattern[pattern + ' U']) {
      throw Error('Unknown pattern `' + pattern + '` for string `' + str + '`')
    }

    let fract = t.pattern[pattern + ' U'].apply(t, args)[0]

    let mag = Math.pow(10, Math.floor(Math.log(fract) / Math.LN10) + 1)
    let zeroAdjust = Math.pow(10, zeros)

    return [unit * mag + fract, mag * zeroAdjust]
  }

  // hundred percent
  if (match = t.percent.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let unit = parseNumber(left, t)
    return [unit, 100]
  }
  // hundred perdime
  if (match = t.perdime.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let unit = parseNumber(left, t)
    return [unit, 10]
  }
  // hundred permille
  if (match = t.permille.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let unit = parseNumber(left, t)
    return [unit, 1000]
  }
  // hundred permyriad
  if (match = t.permyriad.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let unit = parseNumber(left, t)
    return [unit, 10000]
  }
  // hundred perlakh
  if (match = t.perlakh.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let unit = parseNumber(left, t)
    return [unit, 100000]
  }
  // hundred perion
  if (match = t.perion.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let unit = parseNumber(left, t)
    return [unit, 1e6]
  }
  // hundred percrore
  if (match = t.percrore.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let unit = parseNumber(left, t)
    return [unit, 1e7]
  }
  // hundred perawk
  if (match = t.perawk.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let unit = parseNumber(left, t)
    return [unit, 1e8]
  }
  // hundred ppb
  if (match = t.ppb.exec(str)) {
    let left = str.slice(0, match.index).trim()
    let unit = parseNumber(left, t)
    return [unit, 1e9]
  }

  // hundred minutes
  // if (match = t.minute.exec(str)) {
  //   let left = str.slice(0, match.index).trim()
  //   let unit = parseNumber(left, t)
  //   return [unit, 60]
  // }
  // hundred seconds
  // if (match = t.second.exec(str)) {
  //   let left = str.slice(0, match.index).trim()
  //   let unit = parseNumber(left, t)
  //   return [unit, 3600]
  // }


  // any generic sort of pattern
  let [patternStr, args] = detectPattern(str, t)

  if (t.pattern[patternStr]) return t.pattern[patternStr].apply(t, args)


  // too complex pattern - detect num/denom middle

  // u | u
  if (match = /u[\s]+u/.exec(patternStr)) {
    let leftStr = patternStr.slice(0, match.index + 1)
    let left = leftStr + ' U'
    let rightStr = patternStr.slice(match.index + match[0].length - 1)
    let right = rightStr.toLowerCase() + ' U'

    let middleIdx = left.split(t.delim).length - 1
    let num, denom

    if (t.pattern[left]) {
      num = t.pattern[left].apply(t, args.slice(0, middleIdx))[0]
    }
    else {
      throw Error('Unknown pattern `' + left + '` for string `' + leftStr + '`')
    }

    if (t.pattern[right]) {
      denom = t.pattern[right].apply(t, args.slice(middleIdx))[0]
    }
    else {
      throw Error('Unknown pattern `' + right + '` for string `' + rightStr + '`')
    }

    return [num, denom]
  }

  // TODO: handle special cases of long numbers
  // remove subpatterns
  // /(u[\s-]m[\s-])?(t[\s-])?(u[\s-])?(m[\s-])?u?/

  throw Error('Unknown pattern `' + patternStr + '` for string `' + str + '`')
}


// return number representation of a word
function parseNumber (str, t) {
  str = str.trim()

  let [pattern, args] = detectPattern(str, t)

  let patternStr = pattern.toLowerCase() + ' U'
  args.push(0)

  if (t.pattern[patternStr]) return t.pattern[patternStr].apply(t, args)[0]

  throw Error('Unknown pattern `' + patternStr + '` for string `' + str + '`')
  return NaN
}


// get pattern/arguments out of a string
function detectPattern (str, t) {
  let pattern = []
  let args = []
  let delim = t.delim
  let s = str
  let match = delim.exec(s)
  let zeros = 0

  if (!match) match = /$/.exec(s)

  while (match) {
    // get chunk
    let chunk = s.slice(0, match.index)

    if (!chunk) break

    if (!t.junction.test(chunk)) {
      // put chunk type to pattern
      let type = detectType(chunk, t)

      // count leading zeros
      if (type[1] === 0 && zeros === args.length) {
        zeros++
      }

      pattern.push(type[0])
      args.push(type[1])
      pattern.push(/[-−—⁃]/.test(match[0]) ? '-' : ' ')
    }


    // leave rest of string only
    s = s.slice(match.index + match[0].length)

    match = delim.exec(s)
    if (!match) {
      match = /$/.exec(s)
    }
  }

  return [pattern.join('').trim(), args, zeros]
}


// return numeral type from the string
function detectType(str, t) {
  str = str.replace(/[\,]/ig, '')

  let num = parseFloat(str)

  // 28.93
  if (!isNaN(num)) {
    for (let suffix in t.ordinal.suffix) {
      if (str.slice(-suffix.length) === suffix) return ['N', num]
    }
    return ['n', num]
  }

  // third
  if (t.ordinal.unit[str] != null) return ['U', t.ordinal.unit[str]]

  // tenth
  if (t.ordinal.ten[str]) return ['T', t.ordinal.ten[str]]

  // thousandth
  if (t.ordinal.magnitude[str]) return ['M', t.ordinal.magnitude[str]]

  // fourty
  if (t.cardinal.ten[str]) return ['t', t.cardinal.ten[str]]

  // three
  if (t.cardinal.unit[str] != null) return ['u', t.cardinal.unit[str]]

  // thousand
  if (t.cardinal.magnitude[str]) return ['m', t.cardinal.magnitude[str]]

  // PI etc
  if (t.constant[str]) return ['c', t.constant[str]]

  throw Error('Unknown part `' + str + '`')
}
