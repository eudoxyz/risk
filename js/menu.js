const menuState = {

  create: function() {

    /*
    const message = game.add.text(
      game.world.centerX,
      game.world.centerY,
      'Klikni mišem za test',
      { font: '48px Arial', fill: '#F3F3F3' }
    );
    message.anchor.setTo(.5, .5);
    */

    const form = document.createElement('form');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'name-input';
    nameInput.autofocus = true;
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      game.state.start('lobby');
      socket.emit('playerEntered', document.querySelector('.name-input').value);
      event.target.remove();
    });
    form.appendChild(nameInput);
    document.getElementById('root').appendChild(form);

    /*
    const click = game.input.mousePointer.leftButton;
    click.onDown.addOnce(function() {
      game.state.start('play');
    });
    */

  }

}
