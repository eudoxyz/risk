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
  /* 13 */
  /* 13 */
  /* 13 */
  /* 13 */
  /* 13 */
  /* 13 */
  /* 13 */
  /* 13 */
  /* 13 */
  /* 13 */
  /* 13 */
  /* 13 */
  /* 13 */

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

]
