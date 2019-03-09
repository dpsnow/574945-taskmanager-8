const parser = new DOMParser();

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomValueArray = (array) => {
  return array[getRandomInt(0, array.length)];
};

const createElement = (html) => {
  const element = parser.parseFromString(html, `text/html`);
  const nodes = element.body.childNodes;
  return nodes;
};

export {getRandomInt, getRandomValueArray, createElement};
