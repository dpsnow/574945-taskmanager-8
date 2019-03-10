const parser = new DOMParser();

const getRandomBoolean = () => !!(Math.random() > 0.5);

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomValueFromArray = (array) => {
  return array[getRandomInt(0, array.length)];
};

const getRandomArray = (array, maxQty, minQty = 0) => {
  return new Array(getRandomInt(minQty, maxQty)).fill(``).map(() => getRandomValueFromArray(array));
};

const insertElementFromHtml = (html, container) => {
  const element = parser.parseFromString(html, `text/html`);
  const cardChildren = element.body.childNodes;
  cardChildren.forEach((childNode) => container.appendChild(childNode));
};

export {getRandomInt, getRandomValueFromArray, getRandomArray, getRandomBoolean, insertElementFromHtml};
