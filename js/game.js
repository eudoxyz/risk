MULTIPLIER = Math.min(window.innerWidth / WIDTH, window.innerHeight / HEIGHT);
VERTICE_DIAMETER = 32 * MULTIPLIER;
KOORDINATE = KOORDINATE_ORIGINAL.map(koordinata => [koordinata[0] * MULTIPLIER, koordinata[1] * MULTIPLIER]);

const game = new Phaser.Game(WIDTH * MULTIPLIER, HEIGHT * MULTIPLIER, Phaser.AUTO, 'root');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('lobby', lobbyState);
game.state.add('setup', setupState);

game.state.start('boot');
