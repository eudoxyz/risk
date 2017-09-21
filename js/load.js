const loadState = {

  preload: function() {

    game.load.audio('nightRain', ['assets/audio/airtone_-_nightRain.ogg']);
    game.load.audio('tick', ['assets/audio/tick.mp3']);
    game.load.image('sound', 'assets/graphics/sound.png');
    game.load.image('mute', 'assets/graphics/mute.png');   

  },

  create: function() {

    game.state.start('menu');

  }

}
