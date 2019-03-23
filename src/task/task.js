import {isFunction, formatDate} from '../utils.js';
import {Component} from '../component.js';
import {taskTemplate} from './task-template.js';

class Task extends Component {
  constructor(data, uniqueNumber) {
    super();
    this._uniqueNumber = uniqueNumber;
    this._title = data.title;
    this._color = data.color;
    this._tags = data.tags;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;

    this._onEditButtonClick = this._onEditButtonClick.bind(this);
    this._onChangeTitle = this._onChangeTitle.bind(this);
  }
  get template() {
    return taskTemplate(this);
  }

  get _isRepeated() {
    return Object.values(this._repeatingDays).includes(true);
  }

  get _isDate() {
    return !!this._dueDate;
  }

  get _dayDueDate() {
    return this._dueDate && formatDate(this._dueDate, `D MMMM`);
  }

  get _timeDueDate() {
    return this._dueDate && formatDate(this._dueDate, `h:mm A`);
  }

  get _isDeadline() {
    return (this._dueDate && this._dueDate < Date.now());
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _onEditButtonClick() {
    if (isFunction(this._onEdit)) {
      this._onEdit();
    }
  }

  set onChangeTitle(fn) {
    this._onChangeTitle = fn;
  }

  _onChangeTitle() {
    if (isFunction(this._onChangeTitle)) {
      this._onChangeTitle();
    }
  }

  createListeners() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButtonClick);
    this._element.querySelector(`.card__text`).addEventListener(`change`, this._onChangeTitle);
  }

  removeListeners() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditButtonClick);
    this._element.querySelector(`.card__text`).removeEventListener(`change`, this._onChangeTitle);
  }

  update({title, tags, color, repeatingDays, dueDate}) {
    this._title = title;
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._dueDate = +dueDate;
  }
}

export {Task};
