let loadState = {

  preload: function() {

    game.load.audio('nightRain', ['assets/airtone_-_nightRain.ogg']);

  },

  create: function() {

    game.state.start('menu');

  }

}
