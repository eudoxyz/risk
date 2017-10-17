// const game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'root');
const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'root');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('lobby', lobbyState);
game.state.add('setup', setupState);

game.state.start('boot');
