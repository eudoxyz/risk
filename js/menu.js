const menuState = {

  create: function() {

    const form = newElement('form');
    const nameInput = newElement('input', {
      className: 'name-input',
      type: 'text',
      value: 'Me',
      autofocus: true
    });
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
