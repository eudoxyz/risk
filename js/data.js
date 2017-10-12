const WIDTH = 960;
const HEIGHT = 640;
const VERTICE_DIAMETER = 32;

const TERITORIJE = [

  // North America
  //
  /* 00 */ 'Alaska',
  /* 01 */ 'Alberta',
  /* 02 */ 'Central America',
  /* 03 */ 'Eastern United States',
  /* 04 */ 'Greenland',
  /* 05 */ 'Northwest Territory',
  /* 06 */ 'Ontario',
  /* 07 */ 'Quebec',
  /* 08 */ 'Western United States',

  // South America
  //
  /* 09 */ 'Argentina',
  /* 10 */ 'Brazil',
  /* 11 */ 'Peru',
  /* 12 */ 'Venezuela',

  // Europe
  //
  /* 13 */ 'Great Britain',
  /* 14 */ 'Iceland',
  /* 15 */ 'Northern Europe',
  /* 16 */ 'Scandinavia',
  /* 17 */ 'Southern Europe',
  /* 18 */ 'Ukraine',
  /* 19 */ 'Western Europe',

  // Africa
  //
  /* 20 */ 'Congo',
  /* 21 */ 'East Africa',
  /* 22 */ 'Egypt',
  /* 23 */ 'Madagascar',
  /* 24 */ 'North Africa',
  /* 25 */ 'South Africa',

  // Asia
  //
  /* 26 */ 'Afghanistan',
  /* 27 */ 'China',
  /* 28 */ 'India',
  /* 29 */ 'Irkutsk',
  /* 30 */ 'Japan',
  /* 31 */ 'Kamchatka',
  /* 32 */ 'Middle East',
  /* 33 */ 'Mongolia',
  /* 34 */ 'Siam',
  /* 35 */ 'Siberia',
  /* 36 */ 'Ural',
  /* 37 */ 'Yakutsk',

  // Australia
  //
  /* 38 */ 'Eastern Australia',
  /* 39 */ 'Indonesia',
  /* 40 */ 'New Guinea',
  /* 41 */ 'Western Australia'

];


const KONTINENTI = {

  'northAmerica': [...Array(9).keys()].slice(0),
  'southAmerica': [...Array(13).keys()].slice(9),
  'europe': [...Array(20).keys()].slice(13),
  'africa': [...Array(26).keys()].slice(20),
  'asia': [...Array(38).keys()].slice(26),
  'australia': [...Array(42).keys()].slice(38)

}


const GRAF = [

  // North America
  //
  /* 00 */ [1, 5, 31],
  /* 01 */ [0, 5, 6, 8],
  /* 02 */ [3, 8, 12],
  /* 03 */ [2, 6, 7, 8],
  /* 04 */ [5, 6, 7, 14],
  /* 05 */ [0, 1, 4, 6],
  /* 06 */ [1, 3, 4, 5, 7, 8],
  /* 07 */ [3, 4, 6],
  /* 08 */ [1, 2, 3, 6],

  // South America
  //
  /* 09 */ [10, 11],
  /* 10 */ [9, 11, 12, 24],
  /* 11 */ [9, 10, 12],
  /* 12 */ [2, 10, 11],

  // Europe
  //
  /* 13 */ [14, 15, 16, 19],
  /* 14 */ [4, 13, 16],
  /* 15 */ [13, 16, 17, 18, 19],
  /* 16 */ [13, 14, 15, 18],
  /* 17 */ [15, 18, 19, 22, 24, 32],
  /* 18 */ [15, 16, 17, 26, 32, 36],
  /* 19 */ [13, 15, 17, 24],

  // Africa
  //
  /* 20 */ [21, 24, 25],
  /* 21 */ [20, 22, 23, 24, 25],
  /* 22 */ [17, 21, 24, 32],
  /* 23 */ [21, 25],
  /* 24 */ [10, 17, 19, 20, 21, 22],
  /* 25 */ [20, 21, 23],

  // Asia
  //
  /* 26 */ [18, 27, 28, 32, 36],
  /* 27 */ [26, 28, 33, 34, 35, 36],
  /* 28 */ [26, 27, 32, 34],
  /* 29 */ [31, 33, 35, 37],
  /* 30 */ [33, 31],
  /* 31 */ [29, 30, 33, 37, 0],
  /* 32 */ [17, 18, 22, 26, 28],
  /* 33 */ [27, 29, 30, 31, 35],
  /* 34 */ [27, 28, 39],
  /* 35 */ [27, 29, 33, 36, 37],
  /* 36 */ [18, 26, 27, 35],
  /* 37 */ [29, 31, 35],

  // Australia
  //
  /* 38 */ [40, 41],
  /* 39 */ [34, 40, 41],
  /* 40 */ [38, 39, 41],
  /* 41 */ [38, 39, 40],

];


const KOORDINATE = [

  /* 00 */ [55, 155],
  /* 01 */ [136, 194],
  /* 02 */ [177, 321],
  /* 03 */ [245, 274],
  /* 04 */ [374, 101],
  /* 05 */ [184, 148],
  /* 06 */ [219, 198],
  /* 07 */ [292, 199],
  /* 08 */ [177, 254],

  /* 09 */ [229, 553],
  /* 10 */ [299, 451],
  /* 11 */ [225, 476],
  /* 12 */ [203, 391],

  /* 13 */ [420, 230],
  /* 14 */ [407, 168],
  /* 15 */ [475, 240],
  /* 16 */ [469, 166],
  /* 17 */ [487, 292],
  /* 18 */ [550, 209],
  /* 19 */ [408, 300],

  /* 20 */ [465, 465],
  /* 21 */ [547, 431],
  /* 22 */ [492, 354],
  /* 23 */ [586, 546],
  /* 24 */ [412, 371],
  /* 25 */ [476, 543],

  /* 26 */ [620, 277],
  /* 27 */ [751, 306],
  /* 28 */ [654, 355],
  /* 29 */ [797, 190],
  /* 30 */ [875, 300],
  /* 31 */ [887, 155],
  /* 32 */ [565, 335],
  /* 33 */ [818, 254],
  /* 34 */ [739, 377],
  /* 35 */ [708, 168],
  /* 36 */ [643, 185],
  /* 37 */ [810, 143],

  /* 38 */ [845, 554],
  /* 39 */ [765, 440],
  /* 40 */ [860, 460],
  /* 41 */ [768, 521]

]

const kartice = [
  // 1 - infantry
  // 2 - cavalry
  // 3 - artillery

  // North America
  //
  /* 00 Alaska */ 1,
  /* 01 Alberta */ 2,
  /* 02 Central America */ 1,
  /* 03 Eastern United States */ 3,
  /* 04 Greenland*/ 2,
  /* 05 Northwest Territory */ 3,
  /* 06 Ontario */ 2,
  /* 07 Quebec*/ 3,
  /* 08 Western United States */ 3,

  // South America
  //
  /* 09 Argentina */ 1,
  /* 10 Brazil */ 1,
  /* 11 Peru */ 2,
  /* 12 Venezuela */ 2,

  // Europe
  //
  /* 13 Great Britain */ 1,
  /* 14 Iceland */ 2,
  /* 15 Northern Europe */ 2,
  /* 16 Scandinavia */ 1,
  /* 17 Southern Europe */ 1,
  /* 18 Ukraine */ 1,
  /* 19 Western Europe */ 1,

  // Africa
  //
  /* 20 Congo */ 3,
  /* 21 East Africa */ 1,
  /* 22 Egypt */ 2,
  /* 23 Madagascar */ 2,
  /* 24 North Africa */ 1,
  /* 25 South Africa */ 3,

  // Asia
  //
  /* 26 Afghanistan */ 1,
  /* 27 China */ 3,
  /* 28 India */ 2,
  /* 29 Irkutsk */ 3,
  /* 30 Japan */ 2,
  /* 31 Kamchatka */ 3,
  /* 32 Middle East*/ 3,
  /* 33 Mongolia */ 2,
  /* 34 Siam */ 2,
  /* 35 Siberia */ 1,
  /* 36 Ural */ 1,
  /* 37 Yakutsk */ 3,

  // Australia
  //
  /* 38 Eastern Australia */ 2,
  /* 39 Indonesia */ 1,
  /* 40 New Guinea */ 2,
  /* 41 Western Australia */ 3

]
