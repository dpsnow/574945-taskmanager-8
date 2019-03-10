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

const createElement = (html) => {
  const element = parser.parseFromString(html, `text/html`);
  const nodes = element.body.childNodes;
  return nodes;
};

export {getRandomInt, getRandomValueFromArray, getRandomArray, getRandomBoolean, createElement};
