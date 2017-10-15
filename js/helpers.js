function newElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  for (let key in attributes)
    element[key] = attributes[key];
  return element;
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

function drawTriangle(graphicsObj) {
  const side = VERTICE_DIAMETER + 10;
  graphicsObj.lineTo(side, 0);
  graphicsObj.lineTo(side / 2, -Math.sin(Math.PI / 3) * side);
  graphicsObj.pivot.x = side / 2;
  graphicsObj.pivot.y = -1/3 * side;
}
