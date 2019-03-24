import moment from 'moment';

const parser = new DOMParser();

const getRandomBoolean = () => !!(Math.random() > 0.5);

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const isFunction = (value) => {
  return typeof value === `function`;
};

const formatDate = (date, format) => {
  // console.log(`---------formatDate:, date = ${date} typeof ${typeof date},  format = ${format} typeof ${typeof format}`);
  return moment(date).format(format);
};

const updateTime = (date, time = `00:00`) => {
  // console.log(`---------updateTime:, date = ${date} typeof ${typeof date},  format = ${time} typeof ${typeof time}`);
  const [hours, minutes] = time.split(`:`);
  return moment(date, `x`).hours(+hours).minutes(+minutes).format(`x`);
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

export {getRandomInt, getRandomValueFromArray, getRandomArray, getRandomBoolean, createElement, isFunction, formatDate, updateTime};
