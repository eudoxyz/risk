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


const KONTITENTI = {

  'northAmerica': [...Array(9).keys()].slice(0),
  'southAmerica': [...Array(13).keys()].slice(9),
  'europe': [...Array(20).keys()].slice(13),
  'africa': [...Array(26).keys()].slice(20),
  'africa': [...Array(38).keys()].slice(26),
  'asia': [...Array(42).keys()].slice(38)

}


const GRAF = [

  /* 00 */ [1, 5, 31],
  /* 01 */ [0, 5, 6, 8],
  /* 02 */ [3, 8, 12],
  /* 03 */ [2, 6, 7, 8],
  /* 04 */ [5, 6, 7, 14],
  /* 05 */ [0, 1, 4, 6],
  /* 06 */ [1, 3, 4, 5, 7, 8],
  /* 07 */ [3, 4, 6],
  /* 08 */ [1, 2, 3, 6],

  /* 09 */ [10, 11],
  /* 10 */ [9, 11, 12, 24],
  /* 11 */ [9, 10, 12],
  /* 12 */ [2, 10, 11],

  /* 13 */ [14, 15, 16, 19],
  /* 14 */ [4, 13, 16],
  /* 15 */ [13, 16, 17, 18, 19],
  /* 16 */ [13, 14, 15, 18],
  /* 17 */ [15, 18, 19, 22, 24, 32],
  /* 18 */ [15, 16, 17, 26, 32, 36],
  /* 19 */ [13, 15, 17, 24],

  /* 20 */ [21, 24, 25],
  /* 21 */ [20, 22, 23, 24, 25],
  /* 22 */ [17, 21, 24, 32],
  /* 23 */ [21, 25],
  /* 24 */ [10, 17, 19, 20, 21, 22],
  /* 25 */ [20, 21, 23],

];


const KOORDINATE = [

  /* 00 */ [55, 155],
  /* 01 */ [136, 194],
  /* 02 */ [177, 321],
  /* 03 */ [224, 274],
  /* 04 */ [374, 101],
  /* 05 */ [189, 161],
  /* 06 */ [219, 198],
  /* 07 */ [292, 199],
  /* 08 */ [177, 254],

  /* 09 */ [229, 553],
  /* 10 */ [299, 451],
  /* 11 */ [235, 476],
  /* 12 */ [203, 391],

  /* 13 */ [420, 230],
  /* 14 */ [407, 168],
  /* 15 */ [475, 240],
  /* 16 */ [456, 175],
  /* 17 */ [487, 292],
  /* 18 */ [550, 194],
  /* 19 */ [408, 300],

  /* 20 */ [479, 464],
  /* 21 */ [537, 431],
  /* 22 */ [492, 354],
  /* 23 */ [586, 546],
  /* 24 */ [412, 371],
  /* 25 */ [476, 543],

  /* 26 */ [620, 277],
  /* 27 */ [727, 297],
  /* 28 */ [654, 355],
  /* 29 */ [780, 200],
  /* 30 */ [875, 300],
  /* 31 */ [887, 154],
  /* 32 */ [553, 330],
  /* 33 */ [818, 254],
  /* 34 */ [739, 377],
  /* 35 */ [708, 168],
  /* 36 */ [643, 185],
  /* 37 */ [818, 143],

  /* 38 */ [845, 554],
  /* 39 */ [765, 440],
  /* 40 */ [860, 460],
  /* 41 */ [768, 521]

]
