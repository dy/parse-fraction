'use strict'

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
	pattern: {
		'n': n => [n, 1],
		'u': u => [u, 1],
		'c': u => [c, 1],
		't T': (t, T) => [t, T],
		'u m u M': (u, m, U, M) => [u * m, U * M],
		'u m u T': (u, m, u2, T) => [u * m + u2, T],
		'u m u m T': (u, m, U, M, T) => [u * m, U * M + T],
		'u m T': (u, m, T) => [u * m, T],
		'u m t T': (u, m, t, T) => [u * m + t, T],
		'u m t u M': (u, m, t, u2, M) => [u * m + t, u2 * M],
		't-u T': (t, u, T) => [t + u, T],
		't u m T': (t, u, m, T) => [t, u * m + T],

		't-u M': (t, u, M) => [t + u, M],
		't u-M': (t, u, M) => [t, u * M],
		't u M': (t, u, M) => [t, u * M],
		't u m': (t, u, m) => [(t + u) * m, 1],
		'u m-M': (u, m, M) => [u, m * M],
		'u u-M': (u1, u2, M) => [u1, u2 * M],
		'u t-u M': (u1, t, u2, M) => [u1, (t + u2) * M],
		'u T': (u, T) => [u, T],
		'u M': (u, M) => [u, M],
		't-u u-M': (t, u1, u2, M) => [t + u1, u2 * M],
		'u-m-t-u M': (u1, m, t, u2, M) => [u1 * m + t + u2, M],
		'u-m-t-u M': (u1, m, t, u2, M) => [u1 * m + t + u2, M],
		't-t': (t1, t2) => [t1, t2],
		't t': (t1, t2) => [t1, t2],
		't-u t-u': (t1, u1, t2, u2) => [t1 + u1, t2 + u2],

		//FIXME: generate this part
		'u m t u m U': (u, m, t, U, M, U2) => [u * m + t, U * M + U2],
		'u m t u m t-U': (u, m, t, U, M, T, U2) => [u * m + t, U * M + T + U2],
		'u m u m U': (u, m, U, M, U2) => [u * m, U * M + U2],
		'u m u m t-U': (u, m, U, M, T, U2) => [u * m, U * M + T + U2],
		't u m U': (t, u, m, U) => [t, u * m + U],
		't u m t-U': (t, u, m, T, U) => [t, u * m + T + U],

		'u m t-u T': (u1, m1, t1, u2, T) => [(u1 * m1 + t1 + u2), T],
		'u m t u T': (u, m, t, u2, T) => [u * m + t + u2, T],
		'u m t u m T': (u, m, t, U, M, T) => [u * m + t, U * M + T]
	}
}

seq(t.pattern, 'N')
seq(t.pattern, 'U')

function seq(obj, N) {
	obj[N] = (N) => [1, N]

	obj['u ' + N] =
	obj['t ' + N] =
	obj['m ' + N] =
	obj['n ' + N] = (n, N) => [n, N]
	obj['t-u ' + N] = (t, u, N) => [t + u, N]
	obj['u m ' + N] = (u, m, N) => [u * m, N]
	obj['u m u ' + N] = (u, m, u2, N) => [u * m + u2, N]
	obj['u m t ' + N] = (u, m, t, N) => [u * m + t, N]
	obj['u m t-u ' + N] = (u, m, t, u2, N) => [u * m + t + u2, N]
	obj['u m t u ' + N] = (u, m, t, u2, N) => [u * m + t + u2, N]
	obj['n m ' + N] = (n, m, N) => [n * m, N]
	obj['c ' + N] = (c, N) => [c, N]
	obj['u c ' + N] = (u, c, N) => [u * c, N]
	obj['t c ' + N] = (u, c, N) => [u * c, N]

	obj['u t-' + N] = (u, T, N) => [u, T + N]
	obj['t t-' + N] = (t, T, N) => [t, T + N]
	obj['m t-' + N] = (m, T, N) => [m, T + N]
	obj['n t-' + N] = (n, T, N) => [n, T + N]
	obj['t-u t-' + N] = (t, u, T, N) => [t + u, T + N]
	obj['u m t-' + N] = (u, m, T, N) => [u * m, T + N]
	obj['u m u t-' + N] = (u, m, u2, T, N) => [u * m + u2, T + N]
	obj['u m t t-' + N] = (u, m, t, T, N) => [u * m + t, T + N]
	obj['u m t-u t-' + N] = (u, m, t, u2, T, N) => [u * m + t + u2, T + N]
	obj['u m t u t-' + N] = (u, m, t, u2, T, N) => [u * m + t + u2, T + N]
	obj['n m t-' + N] = (n, m, N) => [n * m, T + N]
	obj['c t-' + N] = (c, N) => [c, T + N]
	obj['u c t-' + N] = (u, c, N) => [u * c, T + N]
	obj['t c t-' + N] = (u, c, N) => [u * c, T + N]

	obj['u t t ' + N] = (u, T, N) => [u, T + N]
	obj['t t t ' + N] = (t, T, N) => [t, T + N]
	obj['m t t ' + N] = (m, T, N) => [m, T + N]
	obj['n t t ' + N] = (n, T, N) => [n, T + N]
	obj['t-u t t ' + N] = (t, u, T, N) => [t + u, T + N]
	obj['u m t t ' + N] = (u, m, T, N) => [u * m, T + N]
	obj['u m u t t ' + N] = (u, m, u2, T, N) => [u * m + u2, T + N]
	obj['u m t t t ' + N] = (u, m, t, T, N) => [u * m + t, T + N]
	obj['u m t-u t t ' + N] = (u, m, t, u2, T, N) => [u * m + t + u2, T + N]
	obj['u m t u t t ' + N] = (u, m, t, u2, T, N) => [u * m + t + u2, T + N]
	obj['n m t t ' + N] = (n, m, N) => [n * m, T + N]
	obj['c t t ' + N] = (c, N) => [c, T + N]
	obj['u c t t ' + N] = (u, c, N) => [u * c, T + N]
	obj['t c t t ' + N] = (u, c, N) => [u * c, T + N]

	//FIXME: sort this out
	obj['u m t-u m u m t-u ' + N] = (u1, m1, t1, u11, m11, u2, m2, t2, u22, N) => [(u1 * m1 + t1 + u11) * m11 + (u2 * m2 + t2 + u22), N]
	obj['u m t-u m t-u ' + N] = (u1, m1, t1, u11, m11, t2, u22, N) => [(u1 * m1 + t1 + u11) * m11 + (t2 + u22), N]
	obj['t-u m u m t-u ' + N] = (t1, u11, m11, u2, m2, t2, u22, N) => [(t1 + u11) * m11 + (u2 * m2 + t2 + u22), N]
	obj['u m t m u m t-u ' + N] = (u1, m1, t1, m11, u2, m2, t2, u22, N) => [(u1 * m1 + t1) * m11 + (u2 * m2 + t2 + u22), N]
	obj['u m t-u m u m t ' + N] = (u1, m1, t1, u11, m11, u2, m2, t2, N) => [(u1 * m1 + t1 + u11) * m11 + (u2 * m2 + t2), N]
	obj['u m t m u m t ' + N] = (u1, m1, t1, m11, u2, m2, t2, N) => [(u1 * m1 + t1) * m11 + (u2 * m2 + t2), N]
	obj['u m t m u m ' + N] = (u1, m1, t1, m11, u2, m2, N) => [(u1 * m1 + t1) * m11 + (u2 * m2), N]
	obj['u m m u m t ' + N] = (u1, m1, m11, u2, m2, t2, N) => [(u1 * m1) * m11 + (u2 * m2 + t2), N]
	obj['u m m u m ' + N] = (u1, m1, m11, u2, m2, N) => [(u1 * m1) * m11 + (u2 * m2), N]
	obj['t-u m u m ' + N] = (t1, u11, m11, u2, m2, N) => [(t1 + u11) * m11 + (u2 * m2), N]

	obj['u u ' + N] = (u1, u2, N) => [parseInt('' + u1 + u2), N]
	obj['u-u ' + N] = (u1, u2, N) => [parseInt('' + u1 + u2), N]
	obj['u u u ' + N] = (u1, u2, u3, N) => [parseInt('' + u1 + u2 + u3), N]
	obj['u-u-u ' + N] = (u1, u2, u3, N) => [parseInt('' + u1 + u2 + u3), N]
	obj['u-u u ' + N] = (u1, u2, u3, N) => [parseInt('' + u1 + u2 + u3), N]
	obj['u u-u ' + N] = (u1, u2, u3, N) => [parseInt('' + u1 + u2 + u3), N]
	obj['u-u-u-u ' + N] = (u1, u2, u3, u4, N) => [parseInt('' + u1 + u2 + u3 + u4), N]
	obj['u u u u ' + N] = (u1, u2, u3, u4, N) => [parseInt('' + u1 + u2 + u3 + u4), N]
	obj['u u u u u ' + N] = (u1, u2, u3, u4, u5, N) => [parseInt('' + u1 + u2 + u3 + u4 + u5), N]
	obj['u-u-u-u-u ' + N] = (u1, u2, u3, u4, u5, N) => [parseInt('' + u1 + u2 + u3 + u4 + u5), N]
	obj['u u u u u u ' + N] = (u1, u2, u3, u4, u5, u6, N) => [parseInt('' + u1 + u2 + u3 + u4 + u5 + u6), N]
	obj['u-u-u-u-u-u ' + N] = (u1, u2, u3, u4, u5, u6, N) => [parseInt('' + u1 + u2 + u3 + u4 + u5 + u6), N]
}


module.exports = t
