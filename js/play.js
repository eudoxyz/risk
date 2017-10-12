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


    Client.socket.emit('playStarted', null, function(data) {
      this.drawEdges();
      this.drawVertices(data);
      this.setAudio();
    }.bind(this));


    Client.socket.on('connectionEvent', function(isConnected) {
      this.setConnectionStatus(isConnected);
    });

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


  drawVertices: function(data) {

    const cvorovi = game.add.group();
    cvorovi.inputEnableChildren = true;

    for (let i = 0; i < KOORDINATE.length; i++) {

      const cvor = game.add.graphics(KOORDINATE[i][0], KOORDINATE[i][1]);

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
      cvor.lineStyle(4, color, 1);

      cvor.beginFill(data.boje[data.teritorije[i].igrac], 1);

      cvor.drawCircle(0, 0, VERTICE_DIAMETER);
      cvor.endFill();
      cvor.data.tenkici = game.add.text(KOORDINATE[i][0], KOORDINATE[i][1], '0', { font: '16px Arial', fill: '#ffffff' });
      cvor.data.tenkici.anchor.setTo(0.5, 0.4);

      cvor.events.onInputDown.add(function(cvor, pointer) {
        if (pointer.leftButton.isDown) {
          cvor.data.tenkici.text = String(++game.global.tenkici[cvorovi.getChildIndex(cvor)]);
          this.tickSound.play();
        }
      }, this);

      cvor.events.onInputOver.add(function(cvor) {
        game.add.tween(cvor.scale).to({ x: 1.5, y: 1.5 }, 100).start();
        this.territoryLabel.text = TERITORIJE[cvorovi.getChildIndex(cvor)];
      }, this);

      cvor.events.onInputOut.add(function(cvor) {
        game.add.tween(cvor.scale).to({ x: 1, y: 1 }, 200).start();
        this.territoryLabel.text = '';
      }, this);

      cvorovi.add(cvor);
    }

    cvorovi.setAll('input.useHandCursor', true);

  },


  setAudio: function() {

    this.backgroundMusic = game.add.audio('nightRain');
    this.backgroundMusic.loop = true;
    // this.backgroundMusic.play();

    this.tickSound = game.add.audio('tick');

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
