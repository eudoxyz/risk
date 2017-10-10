const menuState = {

  create: function() {

    const message = game.add.text(
      game.world.centerX,
      game.world.centerY,
      'Klikni mišem za test',
      { font: '48px Arial', fill: '#F3F3F3' }
    );
    message.anchor.setTo(.5, .5);

    const click = game.input.mousePointer.leftButton;
    click.onDown.addOnce(function() {
      game.state.start('play');
    });

  }

}
