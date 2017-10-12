const lobbyState = {

  create: function() {

    this.setClient();
    this.populateDOM();

  },

  setClient: function() {

    Client.socket.on('allReady', function() {
      const countDownDiv = newElement('div', 'count-down');
      countDownDiv.innerHTML = 'Play starting in 3';
      document.querySelector('.lobby-wrapper').appendChild(countDownDiv);
      document.querySelector('input[type=checkbox]').disabled = true;
      let counter = 3;
      const countDownFn = setInterval(function() {
        countDownDiv.innerHTML = 'Play starting in ' + --counter;
        if (counter === 0) {
          clearInterval(countDownFn);
          document.querySelector('.lobby-wrapper').remove();
          game.state.start('play');
        }
      }, 1000);
    });

    Client.socket.emit('lobbyCreated');

  },

  populateDOM: function() {

    const lobbyWrapper = newElement('div', 'lobby-wrapper');
    const list = newElement('ul', 'players-list');
    const joinCheckbox = newElement('input');
    joinCheckbox.type = 'checkbox';
    joinCheckbox.addEventListener('click', function() {
      if (this.checked) Client.socket.emit('ready', true);
      else Client.socket.emit('ready', false);
    });
    const joinLabel = newElement('label');
    joinLabel.innerHTML = 'Ready?';

    lobbyWrapper.appendChild(list);
    lobbyWrapper.appendChild(joinLabel);
    lobbyWrapper.appendChild(joinCheckbox);
    document.getElementById('root').appendChild(lobbyWrapper);

  }

}
