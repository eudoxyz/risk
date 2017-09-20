let bootState = {

  create: function() {

    game.canvas.oncontextmenu = e => e.preventDefault();
    game.stage.backgroundColor = "#1291ee";

    game.state.start('load');

  }

}
