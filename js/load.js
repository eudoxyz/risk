const loadState = {

  preload: function() {

    game.load.audio('nightRain', ['assets/audio/airtone_-_nightRain.ogg']);
    game.load.audio('tick', ['assets/audio/tick.ogg']);
    game.load.spritesheet('zvuk', 'assets/graphics/zvuk.png', 48, 48,2);
    
    game.load.image('sound', 'assets/graphics/sound.png');
    game.load.image('mute', 'assets/graphics/mute.png');   

  },

  create: function() {

    game.state.start('menu');

  }

}
