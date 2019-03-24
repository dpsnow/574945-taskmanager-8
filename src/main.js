import {getFillterHtml} from './template-filter.js';
import {getRandomInt, createElement} from './utils.js';
import {listFilters, dataForTask} from './data.js';
import {TaskEntity} from './task/task-entity.js';
import {Task} from './task/task.js';
import {TaskEdit} from './task/task-edit.js';

import '../node_modules/flatpickr/dist/flatpickr.min.css';
import '../node_modules/flatpickr/dist/themes/material_green.css';

const QTY_CARD = 7;
const containerForFilters = document.querySelector(`.main__filter`);
const containerForCards = document.querySelector(`.board__tasks`);
let countCards = getRandomInt(0, 1500);


const renderTasks = (qty) => {
  containerForCards.innerHTML = ``;
  const fragment = document.createDocumentFragment();
  // const tasks = new Array(qty).fill(``).map(getTask);

  const tasks = new Array(qty).fill(``).map(() => new TaskEntity(dataForTask()));


  // const tasks = new Array(qty).fill(``).map(() => {
  //   const a = dataForTask();
  //   // console.log('В TaskEntity вoшло - ', a);
  //   const b = new TaskEntity(a);
  //   // console.log('Из TaskEntity вышло - ', b);
  //   return b;
  // });


  // console.log(`tasks=`, tasks);

  tasks.forEach((task) => {
    ++countCards;
    const taskComponent = new Task(task, countCards);
    const editTaskComponent = new TaskEdit(task, countCards);

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      containerForCards.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    taskComponent.onChangeTitle = (evt) => {
      task.title = evt.target.value;
      taskComponent.update(task);
      editTaskComponent.update(task);
    };

    editTaskComponent.onSubmit = (updateDate) => {
      taskComponent.update(updateDate);

      taskComponent.render();
      containerForCards.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    fragment.appendChild(taskComponent.render());
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
