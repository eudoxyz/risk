const Client = {};
Client.socket = io();

Client.socket.on('updateLobby', function(data) {
  const list = document.querySelector('.players-list');
  list.innerHTML = '';
  data.igraci.forEach(function(igrac) {
    const listItem = newElement('li');
    listItem.innerHTML = igrac.name;
    if (igrac.name === Client.name) listItem.className = 'myself';
    if (igrac.ready === true) listItem.className += ' ready';
    list.appendChild(listItem);
  });
});
