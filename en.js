'use strict'

const extend = require('object-assign')

let t = {
	point: /-?point-?(?!$)|\./,
	over: /-?over-?|-?of-?|[\\\/÷]/,
	junction: /-?\band\b-?|\&/,
	delim: /\,?[-−—⁃\s]+/i,

	percent: /%|-?percent/,
	perdime: /-?perdime|-?perdecime/,
	permille: /‰|-?permille|-?permil/,
	permyriad: /‱|-?myriadth|-?permyriad?|-?bps|-?basis\spoints?$/,
	perlakh: /-?lakhth|-?perlakh/,
	perion: /-?perion|-?ppm/,
	percrore: /-?percrore/,
	perawk: /-?perawk/,
	ppb: /-?ppb/,

	minute: /-?minutes?|-?mins?/,
	second: /-?seconds?|-?secs?/,

	constant: {
		tau: Math.PI * 2,
		turn: Math.PI * 2,
		τ: Math.PI * 2,

		pi: Math.PI,
		π: Math.PI,

		φ: (1 + Math.sqrt(5)) / 2,
		phi: (1 + Math.sqrt(5)) / 2,
		golden: (1 + Math.sqrt(5)) / 2
	},

	cardinal: {
		unit: {
			zero: 0,
			naught: 0,
			nought: 0,
			aught: 0,
			nil: 0,
			oh: 0,
			o: 0,
			first: 1,
			one: 1,
			a: 1,
			second: 2,
			two: 2,
			three: 3,
			four: 4,
			five: 5,
			six: 6,
			seven: 7,
			eight: 8,
			nine: 9,
			ten: 10,
			eleven: 11,
			twelve: 12,
			dozen: 12,
			thirteen: 13,
			fourteen: 14,
			fifteen: 15,
			sixteen: 16,
			seventeen: 17,
			eighteen: 18,
			nineteen: 19
		},

		ten: {
			twenty: 20,
			score: 20,
			thirty: 30,
			forty: 40,
			fifty: 50,
			sixty: 60,
			seventy: 70,
			eighty: 80,
			ninety: 90
		},

		magnitude: {
			hundred: 100,
			hundreds: 100,
			thousand: 1000,
			thousands: 1000,
			million: 1000000,
			millions: 1000000,
			billion: 1000000000,
			billions: 1000000000,
			trillion: 1000000000000,
			trillions: 1000000000000,
			quadrillion: 1000000000000000,
			quadrillions: 1000000000000000,
			quintillion: 1000000000000000000,
			quintillions: 1000000000000000000,
			sextillion: 1000000000000000000000,
			sextillions: 1000000000000000000000,
			septillion: 1000000000000000000000000,
			septillions: 1000000000000000000000000,
			octillion: 1000000000000000000000000000,
			octillions: 1000000000000000000000000000,
			nonillion: 1000000000000000000000000000000,
			nonillions: 1000000000000000000000000000000,
			decillion: 1000000000000000000000000000000000,
			decillions: 1000000000000000000000000000000000
		}
	},

	ordinal: {
		unit: {
			zeroth: 0,
			noughth: 0,
			whole: 1,
			first: 1,
			full: 1,
			unity: 1,
			half: 2,
			halves: 2,
			second: 2,
			third: 3,
			thirds: 3,
			quarter: 4,
			quarters: 4,
			fourth: 4,
			fourths: 4,
			fifth: 5,
			fifths: 5,
			sixth: 6,
			sixths: 6,
			sevenths: 7,
			seventh: 7,
			eighth: 8,
			eighths: 8,
			ninths: 9,
			ninth: 9,
			tenths: 10,
			tenth: 10,
			elevenths: 11,
			eleventh: 11,
			twelfths: 12,
			twelfth: 12,
			thirteenth: 13,
			thirteenths: 13,
			fourteenth: 14,
			fourteenths: 14,
			fifteenth: 15,
			fifteenths: 15,
			sixteenth: 16,
			sixteenths: 16,
			seventeenths: 17,
			seventeenth: 17,
			eighteenths: 18,
			eighteenth: 18,
			nineteenths: 19,
			nineteenth: 19
		},

		ten: {
			twentieth: 20,
			twentieths: 20,
			thirtieth: 30,
			thirtieths: 30,
			fortieth: 40,
			fortieths: 40,
			fiftieth: 50,
			fiftieths: 50,
			sixtieth: 60,
			sixtieths: 60,
			seventieth: 70,
			seventieths: 70,
			eightieth: 80,
			eightieths: 80,
			ninetieth: 90,
			ninetieths: 90
		},

		magnitude: {
			hundredth: 100,
			hundredths: 100,
			thousandth: 1000,
			thousandths: 1000,
			millionth: 1000000,
			millionths: 1000000,
			crorth: 10000000,
			crorths: 10000000,
			awkth: 100000000,
			awkths: 100000000,
			billionth: 1000000000,
			billionths: 1000000000,
			trillionth: 1000000000000,
			trillionths: 1000000000000,
			quadrillionth: 1000000000000000,
			quadrillionths: 1000000000000000,
			quintillionth: 1000000000000000000,
			quintillionths: 1000000000000000000,
			sextillionth: 1000000000000000000000,
			sextillionths: 1000000000000000000000,
			septillionth: 1000000000000000000000000,
			septillionths: 1000000000000000000000000,
			octillionth: 1000000000000000000000000000,
			octillionths: 1000000000000000000000000000,
			nonillionth: 1000000000000000000000000000000,
			nonillionths: 1000000000000000000000000000000,
			decillionth: 1000000000000000000000000000000000,
			decillionths: 1000000000000000000000000000000000
		},

		suffix: {
			th: 0,
			st: 1,
			d: [2, 3],
			nd: 2,
			rd: 3,
			th: [4, 5, 6, 7, 8, 9]
		}
	},

	multiplier: {
		once: 1,
		solitary: 1,
		singular: 1,
		'one-off': 1,
		twice: 2,
		double: 2,
		twofold: 2,
		duplicate: 2,
		thrice: 3,
		threefold: 3,
		triplicate: 3,
		quadruple: 4,
		fourfold: 4,
		quintuple: 5,
		fivefold: 5,
		sextuple: 6,
		hextuple: 6,
		sixfold: 6,
		septuple: 7,
		heptuple: 7,
		sevenfold: 7,
		hundredfold: 100
	},

	// u - cardinal unit, t - cardinal ten, m - cardinal mag
	// U - ordinal unit, T - ordinal ten, M - ordinal mag
	// n - number
	pattern: {}
}

generatePatternsBySuffix(t.pattern, '', () => 1)
generatePatternsBySuffix(t.pattern, ' M', M => M)
generatePatternsBySuffix(t.pattern, ' m-M', (m, M) => m * M)
generatePatternsBySuffix(t.pattern, ' T', T => T)
generatePatternsBySuffix(t.pattern, ' u m t-U', (U, M, T, U2) => U * M + T + U2)
generatePatternsBySuffix(t.pattern, ' u m t U', (U, M, T, U2) => U * M + T + U2)
generatePatternsBySuffix(t.pattern, ' u m T', (U, M, T) => U * M + T)
generatePatternsBySuffix(t.pattern, ' u m U', (U, M, U2) => U * M + U2)
generatePatternsBySuffix(t.pattern, ' u M', (U, M) => U * M)
generatePatternsBySuffix(t.pattern, ' u-M', (U, M) => U * M)
generatePatternsBySuffix(t.pattern, ' t-U', (T, U) => T + U)
generatePatternsBySuffix(t.pattern, ' t U', (T, U) => T + U)
generatePatternsBySuffix(t.pattern, ' N', N => N)
generatePatternsBySuffix(t.pattern, ' U', U => U)

function generatePatternsBySuffix(obj, N, f) {
	obj['u' + N] =
	obj['t' + N] =
	obj['m' + N] =
	obj['c' + N] =
	obj['n' + N] = (n, ...args) => [n, f(...args)]
	obj['t-u' + N] = (t, u, ...args) => [t + u, f(...args)]
	obj['t m' + N] =
	obj['u m' + N] =
	obj['u-m' + N] =
	obj['n m' + N] =
	obj['u c' + N] =
	obj['t c' + N] = (u, c, ...args) => [u * c, f(...args)]
	obj['t m u' + N] =
	obj['u m u' + N] =
	obj['u-m u' + N] =
	obj['u-m-u' + N] = (u, m, u2, ...args) => [u * m + u2, f(...args)]
	obj['u m t' + N] =
	obj['u-m t' + N] =
	obj['u-m-t' + N] = (u, m, t, ...args) => [u * m + t, f(...args)]
	obj['u m t-u' + N] =
	obj['u-m t-u' + N] =
	obj['u m t u' + N] =
	obj['u-m-t-u' + N] =
	obj['u-m t u' + N] = (u, m, t, u2, ...args) => [u * m + t + u2, f(...args)]

	// FIXME: remove duplicate
	obj['t m u m' + N] =
	obj['u m u m' + N] =
	obj['u m u-m' + N] =
	obj['u m n m' + N] =
	obj['u m u c' + N] =
	obj['u m t c' + N] = (u0, m0, u, m, ...args) => m0 > m ? [u0 * m0 + u * m, f(...args)] : [u0 * m0, u * m + f(...args)]
	obj['t m u m u' + N] =
	obj['u m u m u' + N] =
	obj['u m u-m u' + N] =
	obj['u m u-m-u' + N] = (u0, m0, u, m, u2, ...args) => [u0 * m0 + u * m + u2, f(...args)]
	obj['t m u m t' + N] =
	obj['u m u m t' + N] =
	obj['u m u-m t' + N] =
	obj['u m u-m-t' + N] = (u0, m0, u, m, t, ...args) => [u0 * m0 + u * m + t, f(...args)]
	obj['t m u m t u' + N] =
	obj['u m u m t u' + N] =
	obj['u m u m t-u' + N] =
	obj['u m u-m t-u' + N] =
	obj['u m u-m-t-u' + N] =
	obj['u m u-m t u' + N] = (u0, m0, u, m, t, u2, ...args) => [u0 * m0 + u * m + t + u2, f(...args)]

	//FIXME: sort this out/extend properly
	obj['u m t-u m u m t-u' + N] = (u1, m1, t1, u11, m11, u2, m2, t2, u22, ...args) => [(u1 * m1 + t1 + u11) * m11 + (u2 * m2 + t2 + u22), f(...args)]
	obj['u m t-u m t-u' + N] = (u1, m1, t1, u11, m11, t2, u22, ...args) => [(u1 * m1 + t1 + u11) * m11 + (t2 + u22), f(...args)]
	obj['t-u m u m t-u' + N] = (t1, u11, m11, u2, m2, t2, u22, ...args) => [(t1 + u11) * m11 + (u2 * m2 + t2 + u22), f(...args)]
	obj['u m t m u m t-u' + N] = (u1, m1, t1, m11, u2, m2, t2, u22, ...args) => [(u1 * m1 + t1) * m11 + (u2 * m2 + t2 + u22), f(...args)]
	obj['u m t-u m u m t' + N] = (u1, m1, t1, u11, m11, u2, m2, t2, ...args) => [(u1 * m1 + t1 + u11) * m11 + (u2 * m2 + t2), f(...args)]
	obj['u m t m u m t' + N] = (u1, m1, t1, m11, u2, m2, t2, ...args) => [(u1 * m1 + t1) * m11 + (u2 * m2 + t2), f(...args)]
	obj['u m t m u m' + N] = (u1, m1, t1, m11, u2, m2, ...args) => [(u1 * m1 + t1) * m11 + (u2 * m2), f(...args)]
	obj['u m m u m t' + N] = (u1, m1, m11, u2, m2, t2, ...args) => [(u1 * m1) * m11 + (u2 * m2 + t2), f(...args)]
	obj['u m m u m' + N] = (u1, m1, m11, u2, m2, ...args) => [(u1 * m1) * m11 + (u2 * m2), f(...args)]
	obj['t-u m u m' + N] = (t1, u11, m11, u2, m2, ...args) => [(t1 + u11) * m11 + (u2 * m2), f(...args)]

	obj['u u' + N] =
	obj['u-u' + N] = (u1, u2, ...args) => [parseInt('' + u1 + u2), f(...args)]
	obj['t u-u' + N] =
	obj['t u u' + N] =
	obj['u u u' + N] =
	obj['u-u-u' + N] =
	obj['u-u u' + N] =
	obj['u u-u' + N] = (u1, u2, u3, ...args) => [parseInt('' + u1 + u2 + u3), f(...args)]
	obj['u-u-u-u' + N] =
	obj['u u u u' + N] = (u1, u2, u3, u4, ...args) => [parseInt('' + u1 + u2 + u3 + u4), f(...args)]
	obj['u u u u u' + N] =
	obj['u-u-u-u-u' + N] = (u1, u2, u3, u4, u5, ...args) => [parseInt('' + u1 + u2 + u3 + u4 + u5), f(...args)]
	obj['u u u u u u' + N] =
	obj['u-u-u-u-u-u' + N] = (u1, u2, u3, u4, u5, u6, ...args) => [parseInt('' + u1 + u2 + u3 + u4 + u5 + u6), f(...args)]
}


// pattern exceptions
extend(t.pattern, {
	N: N => [1, N],
	U: U => [1, U],

	'n': n => [n, 1],
	'u': u => [u, 1],
	'c': u => [c, 1],

	'u t-u M': (u1, t, u2, M) => [u1, (t + u2) * M],
	'u t-u': (u, T, U) => [u, T + U],

	't u m': (t, u, m) => [(t + u) * m, 1],
	't u m': (t, u, m) => [(t + u) * m, 1],
	't-t': (t1, t2) => [t1, t2],
	't t': (t1, t2) => [t1, t2],
	't m': (t1, m) => [t1, m],
	'u u': (u1, u2) => [u1, u2],
	'u-u': (u1, u2) => [u1, u2],
	'u t': (u, t) => [u, t],
	't u': (t, u) => [t, u],
	'u m u m': (u1, m1, u2, m2) => [u1 * m1, u2 * m2],
	't-u t-u': (t1, u1, t2, u2) => [t1 + u1, t2 + u2],
})


module.exports = t
