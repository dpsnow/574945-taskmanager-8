import {getFillterHtml} from './template-filter.js';
import {getRandomInt, createElement} from './utils.js';
import {listFilters, getTask} from './data.js';
import {Task} from './task.js';
import {TaskEdit} from './task-edit.js';

import '../node_modules/flatpickr/dist/flatpickr.min.css';
import '../node_modules/flatpickr/dist/themes/material_green.css';

const QTY_CARD = 7;
const containerForFilters = document.querySelector(`.main__filter`);
const containerForCards = document.querySelector(`.board__tasks`);
let countCards = getRandomInt(0, 1500);


const renderTasks = (qty) => {
  containerForCards.innerHTML = ``;
  const fragment = document.createDocumentFragment();
  const tasks = new Array(qty).fill(``).map(getTask);

  tasks.forEach((task) => {
    ++countCards;
    const taskHtml = new Task(task, countCards);
    const editTaskHtml = new TaskEdit(task, countCards);

    taskHtml.onEdit = () => {
      editTaskHtml.render();
      containerForCards.replaceChild(editTaskHtml.element, taskHtml.element);
      taskHtml.unrender();
    };

    taskHtml.onChangeTitle = (evt) => {
      task.title = evt.target.value;
      taskHtml.update(task);
      editTaskHtml.update(task);
    };

    editTaskHtml.onSubmit = ({title, tags, color, repeatingDays, dueDate}) => {
      task.title = title;
      task.tags = tags;
      task.color = color;
      task.repeatingDays = repeatingDays;
      task.dueDate = dueDate;
      taskHtml.update(task);

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
