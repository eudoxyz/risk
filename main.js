let mainState = {

  preload: function() {

  },

  create: function() {

    game.stage.backgroundColor = "#1291ee";

    let cvorovi = game.add.group();
    cvorovi.inputEnableChildren = true;

    for (let i = 0; i < KOORDINATE.length; i++) {
      let cvor = game.add.graphics();
      cvor.lineStyle(4, 0xF3F3F3, 1);
      if (i < 9){
        cvor.beginFill(0xFF0000, 1);
      } else if (i < 13) {
        cvor.beginFill(0x006600, 1);
      } else if (i < 20) {
        cvor.beginFill(0x0033cc, 1);
      } else if (i < 26) {
        cvor.beginFill(0x000000, 1);
      } else if (i < 38) {
        cvor.beginFill(0xffcc00, 1);
      } else {
        cvor.beginFill(0xcc00cc, 1);
      }
      cvor.drawCircle(KOORDINATE[i][0], KOORDINATE[i][1], VERTICE_DIAMETER);
      cvor.endFill();
      cvor.value = 0;
      cvor.valueText = game.add.text(KOORDINATE[i][0], KOORDINATE[i][1], '0', { font: '16px Arial', fill: '#ffffff' });
      cvor.valueText.anchor.setTo(0.5, 0.4);
      cvor.events.onInputDown.add(function(cvor) {
        cvor.valueText.text = String(++cvor.value);
      });
      cvorovi.add(cvor);
    }

    let drawn = [...Array(42).keys()].map(i => Array(42)); // 42x42 niz
    for (let i = 0; i < GRAF.length; i++) {
      for (let j = 0; j < GRAF[i].length; j++) {
        if (!drawn[i][GRAF[i][j]]) {
          this.drawEdge(KOORDINATE[i], KOORDINATE[GRAF[i][j]], [i, GRAF[i][j]]);
          drawn[i][GRAF[i][j]] = drawn[GRAF[i][j]][i] = true;
        }
      }
    }

  },

  update: function() {

  },

  drawEdge: function(src, dst, pair) {

    let grane = game.add.graphics();
    grane.lineStyle(2, 0xF3F3F3, 1);

    // posmatramo pravougli trougao u kojem centar prvog i centar drugog cvora obrazuju hipotenuzu
    // interesuje nas ugao nad x-osom koji zaklapa hipotenuza
    const ADJ = dst[0] - src[0]; // nalegla strana
    const OPP = -(dst[1] - src[1]); // suprotna strana
    let angle = Math.atan(Math.abs(OPP) / Math.abs(ADJ)); // ugao

    if (ADJ >= 0 && OPP >= 0) ; // prvi kvadrant
    else if (ADJ < 0 && OPP >= 0) angle = Math.PI - angle; // drugi kvadrant
    else if (ADJ < 0 && OPP < 0) angle = Math.PI + angle; // treci kvadrant
    else angle = 2 * Math.PI - angle; // cetvrti kvadrant

    // offsetujemo polaznu i krajnju tacku da bi grana pocinjala i zavrsavala se na ivicama cvorova (a ne u sredinama)
    const SRC_X = src[0] + Math.cos(angle) * (VERTICE_DIAMETER / 2);
    const SRC_Y = src[1] - Math.sin(angle) * (VERTICE_DIAMETER / 2);
    const DST_X = dst[0] + Math.cos(Math.PI + angle) * (VERTICE_DIAMETER / 2);
    const DST_Y = dst[1] - Math.sin(Math.PI + angle) * (VERTICE_DIAMETER / 2);

    // izuzetak: grana od aljaske do kamcatke (luk)
    if (pair[0] === 0 && pair[1] === 31) {

      const CURVATURE = 650; // zakrivljenost luka; veca vrednost - manja zakrivljenost
      const MIDDLE_X = (src[0] + dst[0]) / 2;
      const MIDDLE_Y = (src[1] + dst[1]) / 2;
      const DISTANCE = Math.sqrt(Math.pow(Math.abs(src[0] - dst[0]), 2) + Math.pow(Math.abs(src[1] - dst[1]), 2));
      const CENTER_X = MIDDLE_X + Math.sin(angle) * CURVATURE;
      const CENTER_Y = MIDDLE_Y + Math.cos(angle) * CURVATURE;
      const RADIUS = Math.sqrt(Math.pow(CURVATURE, 2) + Math.pow(DISTANCE / 2, 2));

      // 0.02 je hardcoded offset za luk da bi pocinjao i zavrsavao se na ivicama cvorova
      // vrednost je pronadjena trial & error postupkom
      // nema potrebe da se generalizuje jer se pojavljuje samo na ovom mestu
      grane.arc(CENTER_X, CENTER_Y, RADIUS, - Math.asin(CURVATURE / RADIUS) - 0.02, Math.PI + Math.asin(CURVATURE / RADIUS) + 0.02, true, 96);

    // sve ostale grane
    } else {

      grane.moveTo(SRC_X, SRC_Y);
      grane.lineTo(DST_X, DST_Y);

    }

  },

  drawArc: function(src, dst, curvature = 0) {

    const MIDDLE_X = (src[0] + dst[0]) / 2;
    const MIDDLE_Y = (src[1] + dst[1]) / 2;
    const CENTER =

    this.graphics.arc(MIDDLE_X, MIDDLE_Y)

  }

};

const game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'root');
game.state.add('main', mainState);
game.state.start('main');
