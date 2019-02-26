import {getFillterHtml} from './templateFilter.js';
import {getCardElement} from './templateCard.js';
import {getRandomInt, getRandomValueArray, insertElementFromHtml} from './utils.js';
import {listFilters, listColorBarCard} from './data';

const COUNT_CARD = 7;
const containerForFilters = document.querySelector(`.main__filter`);
const containerForCards = document.querySelector(`.board__tasks`);

const renderCards = (count) => {
  const fragment = document.createDocumentFragment();
  containerForCards.innerHTML = ``;
  for (let index = 0; index < count; index++) {
    const cardHtml = getCardElement(getRandomValueArray(listColorBarCard), !!Math.round(Math.random()));
    insertElementFromHtml(cardHtml, fragment);
  }
  containerForCards.appendChild(fragment);
};

const renderFilters = (arrayFilters) => {
  const fragment = document.createDocumentFragment();
  arrayFilters.forEach((filterParams) => {
    const filterHtml = getFillterHtml(filterParams.id, filterParams.count, filterParams.isChecked);
    insertElementFromHtml(filterHtml, fragment);
  });
  containerForFilters.appendChild(fragment);
};

renderFilters(listFilters);
renderCards(COUNT_CARD);

containerForFilters.addEventListener(`click`, (evt) => {
  if (evt.target.nodeName === `INPUT`) {
    renderCards(getRandomInt(1, COUNT_CARD));
  }
});
