import {getRandomInt} from './utils.js';

const listFilters = [
  {id: `all`, count: getRandomInt(0, 255), isChecked: true},
  {id: `overdue`, count: getRandomInt(0, 255)},
  {id: `today`, count: getRandomInt(0, 255)},
  {id: `favorites`, count: getRandomInt(0, 255)},
  {id: `repeating`, count: getRandomInt(0, 255)},
  {id: `tags`, count: getRandomInt(0, 255)},
  {id: `archive`, count: getRandomInt(0, 255)},
];
const listColorBarCard = [`yellow`, `pink`, `blue`];

export {listFilters, listColorBarCard};
