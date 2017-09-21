const playState = {

  create: function() {

    game.add.audio('nightRain').play();
    this.tickSound = game.add.audio('tick');
    var s = game.add.sprite(80, 0, 'sound');

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
