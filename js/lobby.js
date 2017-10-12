const lobbyState = {

  create: function() {

    this.setClient();
    this.populateDOM();

  },

  setClient: function() {

    socket.on('updateLobby', function(igraci) {
      const list = document.querySelector('.players-list');
      list.innerHTML = '';
      igraci.forEach(function(igrac) {
        const listItem = document.createElement('li');
        listItem.innerHTML = igrac.name;
        if (igrac.id === socket.id) listItem.className = 'myself';
        if (igrac.ready === true) listItem.className += ' ready';
        list.appendChild(listItem);
      });
      document.querySelector('.lobby-wrapper').appendChild(list);
    });

    socket.on('allReady', function() {
      const countDownDiv = document.createElement('div');
      countDownDiv.className = 'count-down';
      document.querySelector('.lobby-wrapper').appendChild(countDownDiv);
      countDownDiv.innerHTML = 'Play starting in 3';
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

    socket.emit('lobbyCreated');

  },

  populateDOM: function() {

    const lobbyWrapper = document.createElement('div');
    lobbyWrapper.className = 'lobby-wrapper';

    const list = document.createElement('ul');
    list.className = 'players-list';

    const joinCheckbox = document.createElement('input');
    joinCheckbox.type = 'checkbox';
    joinCheckbox.addEventListener('click', function() {
      if (this.checked) socket.emit('ready', true);
      else socket.emit('ready', false);
    });

    const joinLabel = document.createElement('label');
    joinLabel.innerHTML = 'Ready?';

    lobbyWrapper.appendChild(list);
    lobbyWrapper.appendChild(joinLabel);
    lobbyWrapper.appendChild(joinCheckbox);
    document.getElementById('root').appendChild(lobbyWrapper);

  }

}
