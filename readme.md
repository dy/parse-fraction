# parse-fraction [![experimental](https://img.shields.io/badge/stability-unstable-green.svg)](http://github.com/badges/stability-badges)

Parse numerator and denominator from a string.

[![npm install parse-fraction](https://nodei.co/npm/parse-fraction.png?mini=true)](https://npmjs.org/package/parse-fraction/)

```js
const parseFract = require('parse-fraction')

parseFract('half') // [1, 2]
parseFract('one third') // [1, 3]
parseFract('¼') // [1, 4]
parseFract('13 / 15') // [13, 45]
parseFract('19 ÷ 21') // [19, 21]
parseFract('seven eighths') // [7, 8]
parseFract('full') // [1, 1]
parseFract('one hundred twenty-three thousand four hundred fifty-six one hundred twenty-three thousand four hundred fifty-sixths') // [123456, 123456]
parseFract('thirty two hundredths') // [30, 200]
parseFract('thirty-two hundredths') // [32, 100]
parseFract('one millionth') // [1 / 1000000]

parseFract(123) // null
```

## parseFraction(str, locale?)

Return `[numerator, denominator]` couple from string. Optionally pass locale object for other than `en` locales, see [example](./en.json).

## License

(c) 2017 Dima Yv. MIT License
