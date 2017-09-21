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

const bootState = {

  create: function() {

    game.canvas.oncontextmenu = e => e.preventDefault();
    game.stage.backgroundColor = "#1291ee";
    game.stage.disableVisibilityChange = true;

    game.state.start('load');

  }

}

const loadState = {

  preload: function() {

    game.load.audio('nightRain', ['assets/audio/airtone_-_nightRain.ogg']);
    game.load.audio('tick', ['assets/audio/tick.mp3']);

  },

  create: function() {

    game.state.start('menu');

  }

}

const menuState = {

  create: function() {

    const message = game.add.text(
      game.world.centerX,
      game.world.centerY,
      'Klikni mišem za početak',
      { font: '48px Arial', fill: '#F3F3F3' }
    );
    message.anchor.setTo(.5, .5);

    const click = game.input.mousePointer.leftButton;
    click.onDown.addOnce(function() {
      game.state.start('play');
    });

  }

}

const playState = {

  create: function() {

    game.add.audio('nightRain').play();
    this.tickSound = game.add.audio('tick');

    this.drawEdges();
    this.drawVertices();

  },

  update: function() {

    //

  },

  // ================ //
  // HELPER FUNCTIONS //
  // ================ //

  drawEdge: function(src, dst, pair) {
    const grane = game.add.graphics();
    grane.lineStyle(2, 0xF3F3F3, 1);

    // grana od aljaske do kamcatke
    if (pair[0] === 0 && pair[1] === 31) {

      const CURVATURE = 650;
      const MIDDLE_X = (src[0] + dst[0]) / 2;
      const MIDDLE_Y = src[1]; // y-koordinata im je ista
      const DISTANCE = dst[0] - src[0];
      const RADIUS = Math.sqrt(Math.pow(CURVATURE, 2) + Math.pow(DISTANCE / 2, 2));

      grane.arc(MIDDLE_X, MIDDLE_Y + CURVATURE, RADIUS, - Math.asin(CURVATURE / RADIUS), Math.PI + Math.asin(CURVATURE / RADIUS), true, 96);

    // sve ostale grane
    } else {

      grane.moveTo(src[0], src[1]);
      grane.lineTo(dst[0], dst[1]);

    }
  },


  drawEdges: function() {
    const drawn = [...Array(42).keys()].map(i => Array(42)); // 42 x 42 niz
    for (let i = 0; i < GRAF.length; i++) {
      for (let j = 0; j < GRAF[i].length; j++) {
        if (!drawn[i][GRAF[i][j]]) {
          this.drawEdge(KOORDINATE[i], KOORDINATE[GRAF[i][j]], [i, GRAF[i][j]]);
          drawn[i][GRAF[i][j]] = drawn[GRAF[i][j]][i] = true;
        }
      }
    }
  },


  drawVertices: function() {
    const cvorovi = game.add.group();
    cvorovi.inputEnableChildren = true;

    for (let i = 0; i < KOORDINATE.length; i++) {

      const cvor = game.add.graphics();
      cvor.lineStyle(4, 0xF3F3F3, 1);

      let color;
      if (i < 9){
        color = 0xFF0000;
      } else if (i < 13) {
        color = 0x006600;
      } else if (i < 20) {
        color = 0x0033cc;
      } else if (i < 26) {
        color = 0x000000;
      } else if (i < 38) {
        color = 0xffcc00;
      } else {
        color = 0xcc00cc;
      }
      cvor.beginFill(color, 1);

      cvor.drawCircle(KOORDINATE[i][0], KOORDINATE[i][1], VERTICE_DIAMETER);
      cvor.endFill();
      cvor.data.tenkici = game.add.text(KOORDINATE[i][0], KOORDINATE[i][1], '0', { font: '16px Arial', fill: '#ffffff' });
      cvor.data.tenkici.anchor.setTo(0.5, 0.4);
      cvor.events.onInputDown.add(function(cvor, pointer) {
        if (pointer.leftButton.isDown) {
          cvor.data.tenkici.text = String(++game.global.tenkici[cvorovi.getChildIndex(cvor)]);
          this.tickSound.play();
        }
      }, this);
      cvorovi.add(cvor);
    }

  },

};

const game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'root');

game.global = {

  tenkici: new Array(42).fill(0)

};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('boot');
