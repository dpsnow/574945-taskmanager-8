import {getRandomInt, getRandomValueFromArray, getRandomArray, getRandomBoolean} from './utils.js';

const listFilters = [
  {id: `all`, count: getRandomInt(0, 255), isChecked: true},
  {id: `overdue`, count: getRandomInt(0, 255)},
  {id: `today`, count: getRandomInt(0, 255)},
  {id: `favorites`, count: getRandomInt(0, 255)},
  {id: `repeating`, count: getRandomInt(0, 255)},
  {id: `tags`, count: getRandomInt(0, 255)},
  {id: `archive`, count: getRandomInt(0, 255)},
];

const getTask = () => ({
  title: getRandomValueFromArray([
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ]),

  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,

  tags: new Set(getRandomArray([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
    `js2`,
    `hard`,
    `i❤frontend`], 4)),

  color: getRandomValueFromArray([
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`
  ]),

  picture: (Math.round(Math.random())) ? `//picsum.photos/100/100?r=${Math.random()}` : ``,

  repeatingDays: {
    'mo': getRandomBoolean(),
    'tu': getRandomBoolean(),
    'we': getRandomBoolean(),
    'th': getRandomBoolean(),
    'fr': getRandomBoolean(),
    'sa': getRandomBoolean(),
    'su': getRandomBoolean(),
  },

  // isRepeating: Object.values(repeatingDays).includes(true),

  isFavorite: getRandomBoolean(),
  isDone: getRandomBoolean(),
});

export {listFilters, getTask};
