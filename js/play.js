let playState = {

  create: function() {

    game.add.audio('nightRain').play();
    drawEdges();
    drawVertices();

  },

  update: function() {

  },

};


// FUNCTIONS

function drawEdge(src, dst, pair) {
  let grane = game.add.graphics();
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
}


function drawEdges() {
  let drawn = [...Array(42).keys()].map(i => Array(42)); // 42 x 42 niz
  for (let i = 0; i < GRAF.length; i++) {
    for (let j = 0; j < GRAF[i].length; j++) {
      if (!drawn[i][GRAF[i][j]]) {
        this.drawEdge(KOORDINATE[i], KOORDINATE[GRAF[i][j]], [i, GRAF[i][j]]);
        drawn[i][GRAF[i][j]] = drawn[GRAF[i][j]][i] = true;
      }
    }
  }
}


function drawVertices() {
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
    cvor.tenkici = game.add.text(KOORDINATE[i][0], KOORDINATE[i][1], '0', { font: '16px Arial', fill: '#ffffff' });
    cvor.tenkici.anchor.setTo(0.5, 0.4);
    cvor.events.onInputDown.add(function(cvor) {
      cvor.tenkici.text = String(++game.global.tenkici[cvorovi.getChildIndex(cvor)]);
    });
    cvorovi.add(cvor);
  }
}
