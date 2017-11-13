# parse-fraction [![experimental](https://img.shields.io/badge/stability-unstable-green.svg)](http://github.com/badges/stability-badges) [![Build Status](https://travis-ci.org/dfcreative/parse-fraction.png)](https://travis-ci.org/dfcreative/parse-fraction)

Parse numerator and denominator from a string.

[![npm install parse-fraction](https://nodei.co/npm/parse-fraction.png?mini=true)](https://npmjs.org/package/parse-fraction/)

```js
const parseFract = require('parse-fraction')

parseFract('half') // [1, 2]
parseFract('one third') // [1, 3]
parseFract('seven eighths') // [7, 8]
parseFract('¼') // [1, 4]
parseFract('13 / 15') // [13, 45]
parseFract('19 ÷ 21') // [19, 21]
parseFract('full') // [1, 1]
parseFract('one millionth') // [1 , 1000000]
parseFract('five over six') // [5, 6]
parseFract('zero-point-one-two') // [12, 100]
parseFract('.12') // [12, 100]
parseFract('12%') // [12, 100]
parseFract('one hundred twenty-three thousand four hundred fifty-six one hundred twenty-three thousand four hundred fifty-sixths') // [123456, 123456]
parseFract('fifty-fifty') // [50, 50]
```

## parseFraction(str, locale?)

Return `[numerator, denominator]` couple from string. Optionally pass locale object for other than `en` locales, see [en locale](./en.json) example.

## License

(c) 2017 Dima Yv. MIT License
