import {getFillterHtml} from './template-filter.js';
// import {getTaskElement} from './template-card.js';
import {getRandomInt, createElement} from './utils.js';
import {listFilters, getTask} from './data.js';
import {Task} from './task.js';
import {TaskEdit} from './task-edit.js';

const QTY_CARD = 7;
const containerForFilters = document.querySelector(`.main__filter`);
const containerForCards = document.querySelector(`.board__tasks`);

const renderTasks = (qty) => {
  containerForCards.innerHTML = ``;
  const fragment = document.createDocumentFragment();
  const tasks = new Array(qty).fill(``).map(getTask);

  tasks.forEach((task) => {
    const taskHtml = new Task(task);
    const editTaskHtml = new TaskEdit(task);

    taskHtml.onEdit = () => {
      editTaskHtml.render();
      containerForCards.replaceChild(editTaskHtml.element, taskHtml.element);
      taskHtml.unrender();
    };

    editTaskHtml.onSubmit = () => {
      taskHtml.render();
      containerForCards.replaceChild(taskHtml.element, editTaskHtml.element);
      editTaskHtml.unrender();
    };

    fragment.appendChild(taskHtml.render());
  });
  containerForCards.appendChild(fragment);
};

const renderFilters = (arrayFilters) => {
  const fragment = document.createDocumentFragment();
  arrayFilters.forEach((filterParams) => {
    const filterHtml = getFillterHtml(filterParams.id, filterParams.count, filterParams.isChecked);
    const elements = createElement(filterHtml);
    elements.forEach((childNode) => fragment.appendChild(childNode));
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
