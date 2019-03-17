import {getFillterHtml} from './template-filter.js';
// import {getTaskElement} from './template-card.js';
import {getRandomInt, createElement} from './utils.js';
import {listFilters, getTask} from './data.js';
import {Task} from './task.js';
import {TaskEdit} from './task-edit.js';

const QTY_CARD = 7;
const containerForFilters = document.querySelector(`.main__filter`);
const containerForCards = document.querySelector(`.board__tasks`);
let countCards = getRandomInt(0, 1500);


const renderTasks = (qty) => {
  containerForCards.innerHTML = ``;
  const fragment = document.createDocumentFragment();
  const tasks = new Array(qty).fill(``).map(getTask);

  // if (!uniqueNumbers.includes(uniqueNumber)) {
  //   uniqueNumbers.push(uniqueNumber);
  // }

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
      console.log(evt);
      task.title = evt.target.value;
      taskHtml.update(task);
      editTaskHtml.update(task);
    };

    editTaskHtml.onSubmit = (newObject) => {
      task.title = newObject.title;
      task.tags = newObject.tags;
      task.color = newObject.color;
      task.repeatingDays = newObject.repeatingDays;
      task.dueDate = newObject.dueDate;

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
