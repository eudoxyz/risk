const lobbyState = {

  create: function() {

    const lobbyWrapper = document.createElement('div');
    lobbyWrapper.className = 'lobby-wrapper';
    const list = document.createElement('ul');
    list.className = 'players-list';
    lobbyWrapper.appendChild(list);
    document.getElementById('root').appendChild(lobbyWrapper);

    this.setClient();

  },

  setClient: function() {

    socket.on('updateLobby', function(igraci) {
      const list = document.querySelector('.players-list');
      list.innerHTML = '';
      igraci.forEach(function(igrac) {
        const listItem = document.createElement('li');
        listItem.innerHTML = igrac.name;
        if (igrac.id === socket.id) listItem.className = 'highlight';
        list.appendChild(listItem);
      });
      document.querySelector('.lobby-wrapper').appendChild(list);
    });

    socket.emit('lobbyCreated');

  }

}
