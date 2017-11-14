'use strict'

const t = require('tape')
const parseFract = require('./')

t('numbers', t => {
	t.deepEqual(parseFract('13 / 15'), [13, 15])
	t.deepEqual(parseFract('19 ÷ 21'), [19, 21])

	t.deepEqual(parseFract('6,000,000 / 5'), [6000000, 5])

	t.end()
})

t('unicodes', t => {
	t.deepEqual(parseFract('¼'), [1, 4])
	t.deepEqual(parseFract('½'), [1, 2])
	t.deepEqual(parseFract('⅓'), [1, 3])
	t.deepEqual(parseFract('⅔'), [2, 3])
	t.deepEqual(parseFract('¼'), [1, 4])
	t.deepEqual(parseFract('¾'), [3, 4])
	t.deepEqual(parseFract('⅕'), [1, 5])
	t.deepEqual(parseFract('⅖'), [2, 5])
	t.deepEqual(parseFract('⅗'), [3, 5])
	t.deepEqual(parseFract('⅘'), [4, 5])
	t.deepEqual(parseFract('⅙'), [1, 6])
	t.deepEqual(parseFract('⅚'), [5, 6])
	t.deepEqual(parseFract('⅐'), [1, 7])
	t.deepEqual(parseFract('⅛'), [1, 8])
	t.deepEqual(parseFract('⅜'), [3, 8])
	t.deepEqual(parseFract('⅝'), [5, 8])
	t.deepEqual(parseFract('⅞'), [7, 8])
	t.deepEqual(parseFract('⅑'), [1, 9])
	t.deepEqual(parseFract('⅒'), [1, 10])

	t.end()
})

t('reserved words', t => {
	t.deepEqual(parseFract('half'), [1, 2])
	t.deepEqual(parseFract('full'), [1, 1])
	t.deepEqual(parseFract('whole'), [1, 1])
	t.deepEqual(parseFract('unity'), [1, 1])

	t.end()
})

t('.12', t => {
	t.deepEqual(parseFract('zero-point-one-two'), [12, 100])
	t.deepEqual(parseFract('Twelve percent'), [12, 100])
	t.deepEqual(parseFract('12%'), [12, 100])
	t.deepEqual(parseFract('.12'), [12, 100])
	t.deepEqual(parseFract('three twenty-fifths'), [3, 25])
	t.deepEqual(parseFract('nine seventy-fifths'), [9, 75])
	t.deepEqual(parseFract('six fiftieths'), [6, 50])
	t.deepEqual(parseFract('twelve hundredths'), [12, 100])
	t.deepEqual(parseFract('12/100'), [12, 100])
	t.deepEqual(parseFract('twelve over hundred'), [12, 100])
	t.deepEqual(parseFract('twenty-four two-hundredths'), [24, 200])

	t.end()
})

t('point', t => {
	t.deepEqual(parseFract('.9'), [9, 10])
	t.deepEqual(parseFract('0.9'), [9, 10])
	t.deepEqual(parseFract('point 9'), [9, 10])
	t.deepEqual(parseFract('point nine'), [9, 10])

	t.end()
})

t('pairs', t => {
	t.deepEqual(parseFract('fifty-fifty'), [50, 50])
	t.deepEqual(parseFract('50/50'), [50, 50])
	t.deepEqual(parseFract('twenty-five seventy-five'), [25, 75])
	t.deepEqual(parseFract('fifteen/eighty-five'), [15, 85])
	t.deepEqual(parseFract('twenty eighty'), [20, 80])

	t.end()
})


t('wiki fractional numbers', t => {
	// https://en.wikipedia.org/wiki/List_of_numbers#Fractional_numbers
	t.deepEqual(parseFract('1'), [1, 1])
	t.deepEqual(parseFract('1/1'), [1, 1])
	t.deepEqual(parseFract('one'), [1, 1])
	t.deepEqual(parseFract('unity'), [1, 1])

	t.deepEqual(parseFract('.9'), [9, 10])
	t.deepEqual(parseFract('0.9'), [9, 10])
	t.deepEqual(parseFract('nine tenths'), [9, 10])
	t.deepEqual(parseFract('zero point nine'), [9, 10])
	t.deepEqual(parseFract('point nine'), [9, 10])

	t.deepEqual(parseFract('four fifths'), [4, 5])
	t.deepEqual(parseFract('eight tenths'), [8, 10])
	t.deepEqual(parseFract('zero point eight'), [8, 10])
	t.deepEqual(parseFract('point eight'), [8, 10])

	t.deepEqual(parseFract('Seven tenths'), [7, 10])
	t.deepEqual(parseFract('point seven'), [7, 10])

	t.deepEqual(parseFract('Three fifths'), [3, 5])
	t.deepEqual(parseFract('point six'), [6, 10])
	t.deepEqual(parseFract('six tenths'), [6, 10])

	t.deepEqual(parseFract('One quarter'), [1, 4])
	t.deepEqual(parseFract('one fourth'), [1, 4])
	t.deepEqual(parseFract('twenty-five hundredths'), [25, 100])
	t.deepEqual(parseFract('point two five'), [25, 100])

	t.deepEqual(parseFract('one-hundred-twenty-five thousandths'), [125, 1000])
	t.deepEqual(parseFract('one-hundred-and-twenty-five thousandths'), [125, 1000])

	t.deepEqual(parseFract('point one'), [1, 10])
	t.deepEqual(parseFract('one tenth'), [1, 10])
	t.deepEqual(parseFract('One perdecime'), [1, 10])
	t.deepEqual(parseFract('one perdime'), [1, 10])

	t.deepEqual(parseFract('One minute'), [1, 60])
	t.deepEqual(parseFract('One sixtieth'), [1, 60])

	t.deepEqual(parseFract('One percent'), [1, 100])
	t.deepEqual(parseFract('point zero one'), [1, 100])

	t.deepEqual(parseFract('one permille'), [1, 1000])
	t.deepEqual(parseFract('point zero zero one'), [1, 1000])

	t.deepEqual(parseFract('one second'), [1, 3600])
	t.deepEqual(parseFract('a thirty-six hundredth'), [1, 3600])

	t.deepEqual(parseFract('One myriadth'), [1, 10000])
	t.deepEqual(parseFract('one permyria'), [1, 10000])
	t.deepEqual(parseFract('one permyriad'), [1, 10000])
	t.deepEqual(parseFract('one basis point'), [1, 10000])
	t.deepEqual(parseFract('point zero zero zero one'), [1, 10000])

	t.deepEqual(parseFract('One hundred-thousandth'), [1, 100000])
	t.deepEqual(parseFract('One lakhth'), [1, 100000])
	t.deepEqual(parseFract('one perlakh'), [1, 100000])

	t.deepEqual(parseFract('One millionth'), [1, 1e6])
	t.deepEqual(parseFract('One perion'), [1, 1e6])
	t.deepEqual(parseFract('one ppm'), [1, 1e6])

	t.deepEqual(parseFract('One ten-millionth'), [1, 1e7])
	t.deepEqual(parseFract('One crorth'), [1, 1e7])
	t.deepEqual(parseFract('one percrore'), [1, 1e7])

	t.deepEqual(parseFract('One hundred-millionth'), [1, 1e8])
	t.deepEqual(parseFract('One awkth'), [1, 1e8])
	t.deepEqual(parseFract('one perawk'), [1, 1e8])

	t.deepEqual(parseFract('One billionth'), [1, 1e9])
	t.deepEqual(parseFract('One ppb'), [1, 1e9])

	t.deepEqual(parseFract('zero'), [0, 1])
	t.deepEqual(parseFract('nil'), [0, 1])

	t.end()
})

t('decimals', t => {
	// https://en.wikipedia.org/wiki/English_numerals#Fractions_and_decimals
	parseFract('one over two')

	parseFract('two thousandths')
	parseFract('nought point zero zero two')

	parseFract('three point one four one six')

	parseFract('ninety-nine and three tenths')
	parseFract('ninety-nine point three')

	parseFract('one and a half')

	parseFract('six and a quarter')

	parseFract('seven and five eighths')

	parseFract('9 1/2')
	parseFract('9½')
})

t('constant', t => {
	// [sqrt(5) + 1, 2]
	parseFract('golden')
	parseFract('phi')
	parseFract('φ')

	// [pi, 1]
	parseFract('pi')

	// [2 * pi]
	parseFract('tau')
})

t('number-word', t => {
	parseFract('one 21st')
	parseFract('3 / 32nd')
	parseFract('1.2 million 21st')
	parseFract('twenty-three point three eight billion 79th')
	parseFract('9,311th')

	t.end()
})

t('dates', t => {
	parseFract('Two thirty-five') //235
	parseFract('Two-three-five') //235
	parseFract('Two hundred thirty-five') //235
	parseFract('Two hundred and thirty-five') //235

	parseFract('Nine eleven') //911
	parseFract('Nine-one-one') //911
	parseFract('Nine hundred eleven') //911
	parseFract('Nine hundred (and) eleven') //911

	parseFract('Nine ninety-nine') //999
	parseFract('Nine-nine-nine') //999
	parseFract('Nine hundred ninety-nine') //999
	parseFract('Nine hundred and ninety-nine') //999

	parseFract('One thousand') //1000
	parseFract('1K') //1000
	parseFract('Ten hundred') //1000

	parseFract('Ten oh-four') //1004
	parseFract('One thousand four') //1004
	parseFract('One thousand and four') //1004

	parseFract('Ten ten') //1010
	parseFract('One thousand ten') //1010
	parseFract('One thousand (and) ten') //1010

	parseFract('Ten fifty') //1050

	parseFract('Twelve twenty-five') //1225
	parseFract('One-two-two-five') //1225
	parseFract('One thousand, two hundred (and) twenty-five') //1225
	parseFract('Twelve-two-five') //1225

	parseFract('Nineteen hundred') //1900
	parseFract('One thousand, nine hundred') //1900
	parseFract('Nineteen aught') //1900

	parseFract('Nineteen oh-one') //1901
	parseFract('One thousand, nine hundred one') //1901
	parseFract('One thousand, nine hundred and one') //1901
	parseFract('Nineteen aught one') //1901

	parseFract('Nineteen nineteen') //1919

	parseFract('Two thousand') //2000
	parseFract('Two triple-oh') //2000
	parseFract('2K') //2000

	parseFract('Twenty oh-one') //2001
	parseFract('Twenty hundred one') //2001
	parseFract('Twenty hundred and one') //2001
	parseFract('Two double-oh-one') //2001
	parseFract('Two oh-oh-one') //2001

	parseFract('Two thousand and nine') //2009
	parseFract('Twenty hundred nine') //2009
	parseFract('Twenty hundred and nine') //2009
	parseFract('Two double-oh-nine') //2009
	parseFract('Two oh-oh-nine') //2009

	parseFract('Twenty ten') //2010
	parseFract('two-oh-one-oh') //2010
	parseFract('Two thousand ten') //2010
	parseFract('Twenty hundred ten') //2010
	parseFract('Twenty hundred and ten') //2010
	parseFract('Two thousand and ten') //2010
})

t('numerals', t => {
	// t.deepEqual(parseFract('one third'), [1, 3])
	// t.deepEqual(parseFract('seven eighths'), [7, 8])

	t.deepEqual(parseFract('seventy two-hundredth'), [70, 200])
	t.deepEqual(parseFract('one seventy-two hundredth'), [1, 7200])
	t.deepEqual(parseFract('seventy two hundredth'), [70, 200])
	t.deepEqual(parseFract('seventy two hundred'), [70, 200])
	t.deepEqual(parseFract('seventy-two hundredth'), [72, 100])

	t.deepEqual(parseFract('one hundred twenty-three thousand four hundred fifty-six one hundred twenty-three thousand four hundred fifty-sixths'), [123456, 123456])
	t.deepEqual(parseFract('one hundred twenty thousand four hundred fifty one hundred twenty thousand four hundred fiftieths'), [120450, 120450])
	t.deepEqual(parseFract('one hundred thousand four hundred one hundred thousand four hundredths'), [100400, 100400])
	t.deepEqual(parseFract('twenty-three thousand four hundred three thousand sixths'), [23400, 3006])
	t.deepEqual(parseFract('twenty-three thousand four hundred three thousand fifty-sixths'), [23400, 3056])
	t.deepEqual(parseFract('one hundredth'), [1, 100])


	t.deepEqual(parseFract('thirty two hundredths'), [30, 200])
	t.deepEqual(parseFract('thirty-two hundredths'), [32, 100])
	t.deepEqual(parseFract('seventeen hundredths'), [1, 1700])
	t.deepEqual(parseFract('seventy hundredth'), [1, 7000])

	t.deepEqual(parseFract('thirty two hundred thousand'), [3200000, 1])
	t.deepEqual(parseFract('forty-hundredth'), [1, 4000])
	t.deepEqual(parseFract('forty hundredths'), [40, 100])
	t.deepEqual(parseFract('hundred hundredths'), [100, 100])
	t.deepEqual(parseFract('thousand millions'), [1000000000, 1])

	t.deepEqual(parseFract('one millionth'), [1 / 1000000])
	t.deepEqual(parseFract('twenty-one millionth'), [21 / 1000000])

	t.end()
})

t('ru locale', t => {

	t.end()
})

t('edge cases', t => {
	t.throws(() => parseFract(123))

	t.end()
})

