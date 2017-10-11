const game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'root');

game.global = {

  tenkici: new Array(42).fill(0)

};

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('lobby', lobbyState);
game.state.add('play', playState);

game.state.start('boot');
