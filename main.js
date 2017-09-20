let mainState = {

  preload: function() {

  },

  create: function() {

    this.graphics = game.add.graphics();
    this.graphics.lineStyle(4, 0xF3F3F3, 1);

    KOORDINATE.forEach(function(k) {
      this.graphics.drawCircle(k[0], k[1], VERTICE_DIAMETER);
    }, this);

    for (let i = 0; i < GRAF.length; i++) {
      for (let j = 0; j < GRAF[i].length; j++) {
        this.drawEdge(KOORDINATE[i], KOORDINATE[GRAF[i][j]]);
      }
    }

  },

  update: function() {

  },

  drawEdge: function(src, dst) {

    this.graphics.lineStyle(2, 0xF3F3F3, 1);

    const ADJ = dst[0] - src[0]; // nalegla strana
    const OPP = -(dst[1] - src[1]); // suprotna strana
    let angle = Math.atan(Math.abs(OPP) / Math.abs(ADJ));

    if (ADJ >= 0 && OPP >= 0) ; // prvi kvadrant
    else if (ADJ < 0 && OPP >= 0) angle = Math.PI - angle; // drugi kvadrant
    else if (ADJ < 0 && OPP < 0) angle = Math.PI + angle; // treci kvadrant
    else angle = 2 * Math.PI - angle; // cetvrti kvadrant

    const SRC_X = src[0] + Math.cos(angle) * (VERTICE_DIAMETER / 2);
    const SRC_Y = src[1] - Math.sin(angle) * (VERTICE_DIAMETER / 2);

    const DST_X = dst[0] + Math.cos(Math.PI + angle) * (VERTICE_DIAMETER / 2);
    const DST_Y = dst[1] - Math.sin(Math.PI + angle) * (VERTICE_DIAMETER / 2);

    this.graphics.moveTo(SRC_X, SRC_Y);
    this.graphics.lineTo(DST_X, DST_Y);

  }

};

const game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'root');
game.state.add('main', mainState);
game.state.start('main');
