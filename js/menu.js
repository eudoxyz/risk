const menuState = {

  create: function() {

    const form = document.createElement('form');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'name-input';
    nameInput.autofocus = true;
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.querySelector('.name-input').value
      Client.socket.emit('playerEntered', name, function(isOK) {
        if (isOK) {
          Client.name = name;
          event.target.remove();
          game.state.start('lobby');
        } else alert('Name already exists.');
      });
    });
    form.appendChild(nameInput);
    document.getElementById('root').appendChild(form);

  }

}
