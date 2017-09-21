const bootState = {

  create: function() {

    game.canvas.oncontextmenu = e => e.preventDefault();
    game.stage.backgroundColor = "#1291ee";
    game.stage.disableVisibilityChange = true;

    game.state.start('load');

  }

}
