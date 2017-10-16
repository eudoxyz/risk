const playState = {

  create: function() {

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

    this.setAudio();

    Client.socket.emit('playStarted', null, function(data) {
      this.drawMap(data);
    }.bind(this));


    Client.socket.on('updateTroops', function(data) {
      const vertice = this.vertices.children[data.num];
      vertice.label.text = data.troops;
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
      else if (i < 13) drawPentagon(vertice);
      else if (i < 20) {
        vertice.drawRect(0, 0, VERTICE_DIAMETER, VERTICE_DIAMETER);
        vertice.pivot.x = VERTICE_DIAMETER / 2;
        vertice.pivot.y = VERTICE_DIAMETER / 2; }
      else if (i < 26) drawTriangle(vertice);
      else if (i < 38) vertice.drawCircle(0, 0, VERTICE_DIAMETER);
      else drawPentagon(vertice);

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

    this.backgroundMusic = game.add.audio('nightRain');
    this.backgroundMusic.loop = true;
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


};
