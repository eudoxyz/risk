const loadState = {

  preload: function() {

    //game.load.audio('nightRain', ['snd/airtone_-_nightRain.ogg']);

    game.load.spritesheet('zvuk', 'img/zvuk.png', 48, 48,2);
    game.load.image('sound', 'img/sound.png');
    game.load.image('mute', 'img/mute.png');

  },

  create: function() {

    game.state.start('menu');

  }

}
