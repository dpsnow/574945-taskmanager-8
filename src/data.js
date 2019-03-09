import {getRandomInt, getRandomValueArray} from './utils.js';

const listFilters = [
  {id: `all`, count: getRandomInt(0, 255), isChecked: true},
  {id: `overdue`, count: getRandomInt(0, 255)},
  {id: `today`, count: getRandomInt(0, 255)},
  {id: `favorites`, count: getRandomInt(0, 255)},
  {id: `repeating`, count: getRandomInt(0, 255)},
  {id: `tags`, count: getRandomInt(0, 255)},
  {id: `archive`, count: getRandomInt(0, 255)},
];

const hashtags = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `js2`,
  `hard`,
  `i<3frontend`,
];

const getHashtags = () => {
  const randomTags = new Array(getRandomInt(0, 4)).fill(``).map(() => {
    return getRandomValueArray(hashtags);
  });
  return randomTags;
};

const getTask = () => ({
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ][Math.floor(Math.random() * 3)],

  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,

  tags: new Set(getHashtags()),

  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`
  ][Math.floor(Math.random() * 5)],

  picture: (Math.round(Math.random())) ? `//picsum.photos/100/100?r=${Math.random()}` : ``,

  repeatingDays: {
    'mo': !!Math.round(Math.random()),
    'tu': !!Math.round(Math.random()),
    'we': !!Math.round(Math.random()),
    'th': !!Math.round(Math.random()),
    'fr': !!Math.round(Math.random()),
    'sa': !!Math.round(Math.random()),
    'su': !!Math.round(Math.random()),
  },

  // isRepeating: Object.values(repeatingDays).includes(true),
  isFavorite: !!Math.round(Math.random()),

  isDone: !!Math.round(Math.random()),
});

export {listFilters, getTask};
