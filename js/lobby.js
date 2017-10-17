const lobbyState = {

  create: function() {

    this.populateDOM();

    Client.socket.on('updateLobby', function(data) {
      const list = document.querySelector('.player-list');
      list.innerHTML = '';
      data.players.forEach(function(player) {
        const listItem = newElement('li', {
          innerHTML: player.name
        });
        if (player.name === Client.name) listItem.className = 'myself';
        if (player.ready === true) listItem.className += ' ready';
        list.appendChild(listItem);
      });
    });

    Client.socket.on('allReady', function() {
      const countDownDiv = newElement('div', {
        className: 'countdown',
        innerHTML: 'Play starting in 3'
      });
      document.querySelector('.lobby-wrapper').appendChild(countDownDiv);
      document.querySelector('input[type=checkbox]').disabled = true;
      /*
      let counter = 3;
      const countDownFn = setInterval(function() {
        countDownDiv.innerHTML = 'Play starting in ' + --counter;
        if (counter === 0) {
          clearInterval(countDownFn);
          document.querySelector('.lobby-wrapper').remove();
          game.state.start('setup');
        }
      }, 1000);
      */
      document.querySelector('.lobby-wrapper').remove();
      game.state.start('setup');
    });

    Client.socket.emit('lobbyCreated');

  },

  populateDOM: function() {

    const lobbyWrapper = newElement('div', {
      className: 'lobby-wrapper'
    });
    const list = newElement('ul', {
      className: 'player-list'
    });
    const joinCheckbox = newElement('input', {
      type: 'checkbox',
    });
    joinCheckbox.addEventListener('click', function() {
      if (this.checked) Client.socket.emit('ready', true);
      else Client.socket.emit('ready', false);
    });
    const joinLabel = newElement('label', {
      innerHTML: 'Ready?'
    });

    lobbyWrapper.appendChild(list);
    lobbyWrapper.appendChild(joinLabel);
    lobbyWrapper.appendChild(joinCheckbox);
    document.getElementById('root').appendChild(lobbyWrapper);
    joinCheckbox.focus();

  }

}
