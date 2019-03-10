import {getFillterHtml} from './template-filter.js';
import {getTaskElement} from './template-card.js';
import {getRandomInt, insertElementFromHtml} from './utils.js';
import {listFilters, getTask} from './data.js';

const QTY_CARD = 7;
const containerForFilters = document.querySelector(`.main__filter`);
const containerForCards = document.querySelector(`.board__tasks`);

const renderTasks = (qty) => {
  containerForCards.innerHTML = ``;
  const fragment = document.createDocumentFragment();
  const tasks = new Array(qty).fill(``).map(getTask);

  tasks.forEach((task) => {
    const cardHtml = getTaskElement(task);
    insertElementFromHtml(cardHtml, fragment);
  });
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
renderTasks(QTY_CARD);

containerForFilters.addEventListener(`click`, (evt) => {
  if (evt.target.nodeName === `INPUT`) {
    renderTasks(getRandomInt(1, QTY_CARD));
  }
});
