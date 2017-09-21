const loadState = {

  preload: function() {

    game.load.audio('nightRain', ['assets/audio/airtone_-_nightRain.ogg']);
    game.load.audio('tick', ['assets/audio/tick.mp3']);

  },

  create: function() {

    game.state.start('menu');

  }

}
