function newElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  for (let key in attributes)
    element[key] = attributes[key];
  return element;
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
}
