import flatpickr from 'flatpickr';
import {isFunction, formatDate} from '../utils.js';
import {Component} from '../component.js';
import {Statuses} from './task-constants.js';
import {taskTemplate} from './task-edit-template.js';
import {TaskEntity} from './task-entity.js';


class TaskEdit extends Component {
  constructor(data, uniqueNumber) {
    super();
    this._uniqueNumber = uniqueNumber;
    this._title = data.title;
    this._color = data.color;
    this._tags = data.tags;
    this._picture = data.picture;
    this._dueDate = data.dueDate ? data.dueDate : null;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;

    this._isDate = data.isDate;
    this._isRepeated = data.isRepeated;

    // this._isDate = !!this._dueDate;
    // this._isRepeated = Object.values(this._repeatingDays).includes(true);

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onResetBtnClick = this._onResetBtnClick.bind(this);
    this._onToggleDate = this._onToggleDate.bind(this);
    this._onToggleRepeated = this._onToggleRepeated.bind(this);
    this._onDeleteHashtag = this._onDeleteHashtag.bind(this);
    this._onChangeColor = this._onChangeColor.bind(this);
  }

  get template() {
    return taskTemplate(this);
  }

  // get _checkIsRepeated() {
  //   return Object.values(this._repeatingDays).includes(true);
  // }

  // get _checkIsDate() {
  //   return !!this._dueDate;
  // }

  get _dayDueDate() {
    return this._dueDate && formatDate(this._dueDate, `D MMMM`);
  }

  get _timeDueDate() {
    return this._dueDate && formatDate(this._dueDate, `h:mm A`);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _onToggleDate() {
    const deadlineStatus = this._element.querySelector(`.card__date-status`);
    const dateDeadline = this._element.querySelector(`.card__date-deadline`);
    this._isDate = !this._isDate;
    deadlineStatus.textContent = this._isDate ? Statuses.YES : Statuses.NO;
    dateDeadline.disabled = !dateDeadline.disabled;
  }

  _onToggleRepeated() {
    const repeatStatus = this._element.querySelector(`.card__repeat-status`);
    const repeatDays = this._element.querySelector(`.card__repeat-days`);
    this._isRepeated = !this._isRepeated;
    repeatStatus.textContent = this._isRepeated ? Statuses.YES : Statuses.NO;
    repeatDays.disabled = !repeatDays.disabled;

    this._element.classList.toggle(`card--repeat`);
  }

  _onChangeColor(evt) {
    this._element.classList.remove(`card--${this._color}`);
    this._color = evt.target.value;
    this._element.classList.add(`card--${this._color}`);
  }

  _onDeleteHashtag(evt) {
    const tag = evt.target.previousElementSibling.textContent.substring(1);
    this._tags.delete(tag);
    evt.target.parentElement.remove();
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const newData = this._convertData(formData);
    if (isFunction(this._onSubmit)) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }

  _onResetBtnClick(evt) {
    evt.preventDefault();
    this.unrender();
  }

  _initFlatpickr() {
    flatpickr(this._element.querySelector(`.card__date`), {
      defaultDate: this._dueDate,
      altInput: true,
      altFormat: `j F`,
      // dateFormat: `Z`
      dateFormat: `U`
    });

    flatpickr(this._element.querySelector(`.card__time`), {
      defaultDate: this._dueDate,
      enableTime: true,
      noCalendar: true,
      altInput: true,
      altFormat: `h:i K`,
      dateFormat: `H:i`
    });
  }

  createListeners() {
    this._initFlatpickr();

    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__delete`).addEventListener(`click`, this._onResetBtnClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onToggleDate);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onToggleRepeated);

    [...this._element.querySelectorAll(`.card__hashtag-delete`)].forEach((elem) => {
      elem.addEventListener(`click`, this._onDeleteHashtag);
    });

    [...this._element.querySelectorAll(`.card__color-input`)].forEach((elem) => {
      elem.addEventListener(`change`, this._onChangeColor);
    });
  }

  removeListeners() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__delete`).removeEventListener(`click`, this._onResetBtnClick);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onToggleDate);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onToggleRepeated);

    [...this._element.querySelectorAll(`.card__color-input`)].forEach((elem) => {
      elem.removeEventListener(`click`, this._onChangeColor);
    });
  }

  _convertData(formData) {
    const newData = {};

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      // console.log('[property, value] = ', pair);
      if (!value) {
        continue;
      }
      // console.log(`newData[_${property}_] = ${value}`);

      if (newData[property]) {
        newData[property] = [].concat(newData[property]).concat(value);
      } else {
        newData[property] = value;
      }

    }
    return new TaskEntity(newData);
  }

  update({title, tags, color, repeatingDays, dueDate, isDate, isRepeated}) {
    this._title = title;
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._dueDate = +dueDate;
    this._isDate = isDate;
    this._isRepeated = isRepeated;
  }
}

export {TaskEdit};
