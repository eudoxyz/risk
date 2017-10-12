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
        const listItem = newElement('li');
        listItem.innerHTML = igrac.name;
        if (igrac.id === socket.id) listItem.className = 'myself';
        if (igrac.ready === true) listItem.className += ' ready';
        list.appendChild(listItem);
      });
    });

    socket.on('allReady', function() {
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

    socket.emit('lobbyCreated');

  },

  populateDOM: function() {

    const lobbyWrapper = newElement('div', 'lobby-wrapper');
    const list = newElement('ul', 'players-list');
    const joinCheckbox = newElement('input');
    joinCheckbox.type = 'checkbox';
    joinCheckbox.addEventListener('click', function() {
      if (this.checked) socket.emit('ready', true);
      else socket.emit('ready', false);
    });
    const joinLabel = newElement('label');
    joinLabel.innerHTML = 'Ready?';

    lobbyWrapper.appendChild(list);
    lobbyWrapper.appendChild(joinLabel);
    lobbyWrapper.appendChild(joinCheckbox);
    document.getElementById('root').appendChild(lobbyWrapper);

  }

}
