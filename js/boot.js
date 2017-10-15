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
