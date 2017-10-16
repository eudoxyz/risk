const Client = {};
Client.socket = io();

Client.socket.on('connect', function() {
  if (!localStorage.getItem('persistentID'))
    localStorage.setItem('persistentID', Client.socket.id);
  Client.socket.emit('tokenReady', localStorage.getItem('persistentID'));
});

function newElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  for (let key in attributes)
    element[key] = attributes[key];
  return element;
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

function drawTriangle(graphicsObj) {
  const side = VERTICE_DIAMETER + 10;
  graphicsObj.lineTo(side, 0);
  graphicsObj.lineTo(side / 2, -Math.sin(Math.PI / 3) * side);
  graphicsObj.pivot.x = side / 2;
  graphicsObj.pivot.y = -1/3 * side;
}

function drawPentagon(graphicsObj) {
  const side = VERTICE_DIAMETER - 8;
  graphicsObj.lineTo(side, 0);
  graphicsObj.lineTo(side + Math.cos(degToRad(72)) * side, -Math.sin(degToRad(72)) * side);
  graphicsObj.lineTo(side / 2, -(Math.sqrt(5 + 2 * Math.sqrt(5)) / 2) * side);
  graphicsObj.lineTo(-Math.cos(degToRad(72)) * side, -Math.sin(degToRad(72)) * side);
  graphicsObj.pivot.x = side / 2;
  graphicsObj.pivot.y = -(Math.sqrt(5 + 2 * Math.sqrt(5)) / 2) * side / 2 + 2;
}

const WIDTH = 960;
const HEIGHT = 640;
let MULTIPLIER, VERTICE_DIAMETER, KOORDINATE;


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


const KOORDINATE_ORIGINAL = [

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
  /* 22 */ [488, 359],
  /* 23 */ [586, 546],
  /* 24 */ [408, 371],
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

const bootState = {

  create: function() {

    game.canvas.oncontextmenu = e => e.preventDefault();
    game.stage.backgroundColor = "#1291ee";
    game.stage.disableVisibilityChange = true;

    window.addEventListener('load', this.setDimensions);
    window.addEventListener('resize', this.setDimensions);

    game.state.start('load');

  },

  setDimensions: function() {

    MULTIPLIER = Math.min(window.innerWidth / WIDTH, window.innerHeight / HEIGHT);
    VERTICE_DIAMETER = 32 * MULTIPLIER;
    KOORDINATE = KOORDINATE_ORIGINAL.map(koordinata => [koordinata[0] * MULTIPLIER, koordinata[1] * MULTIPLIER]);

  }

}

const loadState = {

  preload: function() {

    //game.load.audio('nightRain', ['snd/airtone_-_nightRain.ogg']);

    game.load.spritesheet('zvuk', 'img/zvuk.png', 48, 48,2);
    game.load.image('sound', 'img/sound.png');
    game.load.image('mute', 'img/mute.png');

  },

  create: function() {

    game.state.start('menu');

  }

}

const menuState = {

  create: function() {

    const form = newElement('form');
    const nameInput = newElement('input', {
      className: 'name-input',
      type: 'text',
      autofocus: true
    });
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.querySelector('.name-input').value
      Client.socket.emit('playerEntered', name, function(isOK) {
        if (isOK) {
          Client.name = name;
          event.target.remove();
          game.state.start('lobby');
        } else alert('Name already exists.');
      });
    });
    form.appendChild(nameInput);
    document.getElementById('root').appendChild(form);

  }

}

const lobbyState = {

  create: function() {

    this.populateDOM();

    Client.socket.on('updateLobby', function(data) {
      const list = document.querySelector('.player-list');
      list.innerHTML = '';
      data.players.forEach(function(player) {
        const listItem = newElement('li', {
          innerHTML: player.name
        });
        if (player.name === Client.name) listItem.className = 'myself';
        if (player.ready === true) listItem.className += ' ready';
        list.appendChild(listItem);
      });
    });

    Client.socket.on('allReady', function() {
      const countDownDiv = newElement('div', {
        className: 'countdown',
        innerHTML: 'Play starting in 3'
      });
      document.querySelector('.lobby-wrapper').appendChild(countDownDiv);
      document.querySelector('input[type=checkbox]').disabled = true;
      let counter = 3;
      const countDownFn = setInterval(function() {
        countDownDiv.innerHTML = 'Play starting in ' + --counter;
        if (counter === 0) {
          clearInterval(countDownFn);
          document.querySelector('.lobby-wrapper').remove();
          game.state.start('play');
        }
      }, 1000);
    });

    Client.socket.emit('lobbyCreated');

  },

  populateDOM: function() {

    const lobbyWrapper = newElement('div', {
      className: 'lobby-wrapper'
    });
    const list = newElement('ul', {
      className: 'player-list'
    });
    const joinCheckbox = newElement('input', {
      type: 'checkbox',
      autofocus: true
    });
    joinCheckbox.addEventListener('click', function() {
      if (this.checked) Client.socket.emit('ready', true);
      else Client.socket.emit('ready', false);
    });
    const joinLabel = newElement('label', {
      innerHTML: 'Ready?'
    });

    lobbyWrapper.appendChild(list);
    lobbyWrapper.appendChild(joinLabel);
    lobbyWrapper.appendChild(joinCheckbox);
    document.getElementById('root').appendChild(lobbyWrapper);

  }

}

const playState = {

  create: function() {

    this.setAudio();

    Client.socket.emit('playStarted', null, function(mapData, initTroops) {
      this.drawMap(mapData);
      this.drawHUD(initTroops);
    }.bind(this));

    Client.socket.on('updateTroops', function(data) {
      const vertice = this.vertices.children[data.num];
      vertice.label.text = data.troops;
    }.bind(this));
    Client.socket.on('updateMyTroops', function(troops) {
      this.armyInfo.text = 'Troops remaining: ' + troops;
    }.bind(this));
    Client.socket.on('connectionEvent', function(isConnected) {
      this.setConnectionStatus(isConnected);
    });


    window.addEventListener('resize', function() {
      this.vertices.destroy();
      this.edges.destroy();
      game.scale.setGameSize(WIDTH * MULTIPLIER, HEIGHT * MULTIPLIER);
      this.drawMap(this.data);
    }.bind(this));

  },

  update: function() {

    //

  },


  // ================ //
  // HELPER FUNCTIONS //
  // ================ //

  drawMap: function(data) {

    this.drawEdges.call(this);
    this.drawVertices.call(this, data);

  },


  drawEdge: function(src, dst, pair) {

    const edge = game.add.graphics();
    edge.lineStyle(2, 0xF3F3F3, 1);

    // grana od aljaske do kamcatke
    if (pair[0] === 0 && pair[1] === 31) {

      const CURVATURE = 650 * MULTIPLIER;
      const MIDDLE_X = (src[0] + dst[0]) / 2;
      const MIDDLE_Y = src[1]; // y-koordinata im je ista
      const DISTANCE = dst[0] - src[0];
      const RADIUS = Math.sqrt(Math.pow(CURVATURE, 2) + Math.pow(DISTANCE / 2, 2));

       edge.arc(MIDDLE_X, MIDDLE_Y + CURVATURE, RADIUS, - Math.asin(CURVATURE / RADIUS), Math.PI + Math.asin(CURVATURE / RADIUS), true, 96);

    // sve ostale grane
    } else {

       edge.moveTo(src[0], src[1]);
       edge.lineTo(dst[0], dst[1]);

    }

    return edge;

  },


  drawEdges: function() {

    this.edges = game.add.group();

    const drawn = [...Array(42).keys()].map(i => Array(42)); // 42 x 42 niz
    for (let i = 0; i < GRAF.length; i++) {
      for (let j = 0; j < GRAF[i].length; j++) {
        if (!drawn[i][GRAF[i][j]]) {
          this.edges.add(this.drawEdge(KOORDINATE[i], KOORDINATE[GRAF[i][j]], [i, GRAF[i][j]]));
          drawn[i][GRAF[i][j]] = drawn[GRAF[i][j]][i] = true;
        }
      }
    }

  },


  drawVertices: function(data) {

    this.vertices = game.add.group();

    for (let i = 0; i < KOORDINATE.length; i++) {

      const vertice = game.add.graphics(KOORDINATE[i][0], KOORDINATE[i][1]);
      vertice.name = data[i].name;
      vertice.inputEnabled = true;
      if (vertice.name === Client.name) vertice.input.useHandCursor = true;

      vertice.lineStyle(4, 0xffffff, 1);
      vertice.beginFill(data[i].color, 1);

      if (i < 9) vertice.drawCircle(0, 0, VERTICE_DIAMETER);
      else if (i < 13)
        drawPentagon(vertice);
      else if (i < 20) {
        vertice.drawRect(0, 0, VERTICE_DIAMETER, VERTICE_DIAMETER);
        vertice.pivot.x = VERTICE_DIAMETER / 2;
        vertice.pivot.y = VERTICE_DIAMETER / 2;
      } else if (i < 26) {
        drawTriangle(vertice);
      } else if (i < 38)
        vertice.drawCircle(0, 0, VERTICE_DIAMETER);
      else
        drawPentagon(vertice);

      vertice.endFill();
      vertice.label = game.add.text(KOORDINATE[i][0], KOORDINATE[i][1], '', { font: '16px Arial', fill: '#ffffff' });
      vertice.label.anchor.setTo(0.5, 0.4);

      vertice.events.onInputDown.add(function clickVerticeHandler(vertice, click) {
        if (click.leftButton.isDown) {
          // play sound
          Client.socket.emit('addTroop', i, true);
        }
        if (click.rightButton.isDown) {
          // play sound
          Client.socket.emit('addTroop', i, false);
        }
      }, this);

      vertice.events.onInputOver.add(function(vertice) {
        if (vertice.name !== Client.name) return;

        game.add.tween(vertice.scale).to({ x: 1.5, y: 1.5 }, 100).start();
        this.territoryLabel.text = TERITORIJE[this.vertices.getChildIndex(vertice)];

        vertice.events.onInputOut.add(function(vertice) {
          game.add.tween(vertice.scale).to({ x: 1, y: 1 }, 200).start();
          this.territoryLabel.text = '';
        }, this);

      }, this);

      this.vertices.add(vertice);
    }

  },


  setAudio: function() {

    //this.backgroundMusic = game.add.audio('nightRain');
    //this.backgroundMusic.loop = true;
    // this.backgroundMusic.play();

  },


  setConnectionStatus: function(isConnected) {
    if (isConnected) this.playerLabel.text = 'Drugi igrač je prisutan';
    else this.playerLabel.text = 'Drugi igrač je odsutan';
  },


  toggleSound: function() {
    // Switch the Phaser sound variable from true to false, or false to true
    // When 'game.sound.mute = true', Phaser will mute the game
    game.sound.mute = ! game.sound.mute;
    // Change the frame of the button
    this.muteButton.frame = game.sound.mute ? 0 : 1;
  },

  drawHUD : function (initTroops) {
    
    this.muteButton = game.add.button(20, 20, 'zvuk', this.toggleSound, this);
    this.muteButton.frame = 1;

    this.territoryLabel = game.add.text(game.world.width - 20, game.world.top + 20, '',
      { font: '16px Arial', fill: '#F3F3F3', boundsAlignH: 'right' }
     );

    this.territoryLabel.anchor.setTo(1, 0);
    this.playerLabel = game.add.text(20, game.world.height - 20, 'Drugi igrač je odsutan',
      { font: '16px Arial', fill: '#F3F3F3', boundsAlignH: 'right' }
     );
    this.playerLabel.anchor.setTo(0, 1);
    this.armyInfo = game.add.text(game.world.width - 300, game.world.height - 20, "Troops remaining: " + initTroops,
      { font: '16px Arial', fill: '#F3F3F3', boundsAlignH: 'right' });
     this.armyInfo.anchor.setTo(0, 1);
  }

};

// const game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'root');
const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'root');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('lobby', lobbyState);
game.state.add('play', playState);

game.state.start('boot');
