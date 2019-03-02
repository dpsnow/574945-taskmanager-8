const parser = new DOMParser();

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomValueArray = (array) => {
  return array[getRandomInt(0, array.length)];
};

const insertElementFromHtml = (html, container) => {
  const element = parser.parseFromString(html, `text/html`);
  const cardChildren = element.body.childNodes;
  cardChildren.forEach((childNode) => container.appendChild(childNode));
};

export {getRandomInt, getRandomValueArray, insertElementFromHtml};
