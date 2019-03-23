import {isFunction, formatDate, updateTime} from './utils.js';
import {Component} from './component.js';
import flatpickr from 'flatpickr';

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

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onResetBtnClick = this._onResetBtnClick.bind(this);
    this._onToggleDate = this._onToggleDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._onChangeColor = this._onChangeColor.bind(this);
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

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  _onToggleDate() {
    const deadlineStatus = this._element.querySelector(`.card__date-status`);
    const dateDeadline = this._element.querySelector(`.card__date-deadline`);

    deadlineStatus.textContent = !this._isDate ? `yes` : `no`;
    dateDeadline.disabled = !dateDeadline.disabled;
  }

  _onChangeRepeated() {
    const repeatStatus = this._element.querySelector(`.card__repeat-status`);
    const repeatDays = this._element.querySelector(`.card__repeat-days`);

    repeatStatus.textContent = !this._isRepeated ? `yes` : `no`;
    repeatDays.disabled = !repeatDays.disabled;

    this._element.classList.toggle(`card--repeat`);
  }

  _onChangeColor(evt) {
    this._element.classList.remove(`card--${this._color}`);
    this._color = evt.target.value;
    this._element.classList.add(`card--${this._color}`);
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

  get template() {
    return `
      <article class="card card--edit card--${this._color} ${this._isRepeated ? `card--repeat` : ``}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--edit">
                edit
              </button>
              <button type="button" class="card__btn card__btn--archive">
                archive
              </button>
              <button type="button" class="card__btn card__btn--favorites ${this._isFavorite ? `` : `card__btn--disabled`}">
                favorites
              </button>
            </div>

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${this._isDate ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__date-deadline" ${this._isDate ? `` : `disabled`}>
                    <label class="card__input-deadline-wrap">
                      <input class="card__date" type="text" placeholder="${formatDate([], `D MMMM`)}" name="date" ${this._isDate ? `value="${this._dueDate}"` : ``} />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input class="card__time" type="text" placeholder="${formatDate([], `h:mm A`)}" name="time" ${this._isDate ? `value="${this._dueDate}"` : ``}/>
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${this._isRepeated ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__repeat-days" ${this._isRepeated ? `` : `disabled`}>
                    <div class="card__repeat-days-inner">
  ${Object.entries(this._repeatingDays).map((day) => {
    return `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day[0]}-${this._uniqueNumber}" name="repeat"
                      value="${day[0]}" ${day[1] ? `checked` : ``}/>
                      <label class="card__repeat-day" for="repeat-${day[0]}-${this._uniqueNumber}">${day[0]}</label>`.trim();
  }).join(``)}
                    </div>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list">
  ${Array.from(this._tags).map((hashtag) => {
    return `
          <span class="card__hashtag-inner">
            <input type="hidden" name="hashtag" value="${hashtag}" class="card__hashtag-hidden-input" />
            <button type="button" class="card__hashtag-name">
              #${hashtag}
            </button>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>`.trim();
  }).join(``)}
                  </div>

                  <label>
                    <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />
                  </label>
                </div>
              </div>

              <label class="card__img-wrap${this._picture ? `` : ` card__img-wrap--empty`}">
                <input type="file" class="card__img-input visually-hidden" name="img" />
                ${this._picture ? `<img src="${this._picture}" alt="task picture" class="card__img"/>` : ``}
              </label>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  <input type="radio" id="color-black-${this._uniqueNumber}" class="card__color-input card__color-input--black visually-hidden"
                    name="color" value="black" ${this._color === `black` ? `checked` : ``}/>
                  <label for="color-black-${this._uniqueNumber}" class="card__color card__color--black">black</label>
                  <input type="radio" id="color-yellow-${this._uniqueNumber}" class="card__color-input card__color-input--yellow visually-hidden"
                    name="color" value="yellow" ${this._color === `yellow` ? `checked` : ``}/>
                  <label for="color-yellow-${this._uniqueNumber}" class="card__color card__color--yellow">yellow</label>
                  <input type="radio" id="color-blue-${this._uniqueNumber}" class="card__color-input card__color-input--blue visually-hidden"
                    name="color" value="blue" ${this._color === `blue` ? `checked` : ``}/>
                  <label for="color-blue-${this._uniqueNumber}" class="card__color card__color--blue">blue</label>
                  <input type="radio" id="color-green-${this._uniqueNumber}" class="card__color-input card__color-input--green visually-hidden"
                    name="color" value="green" ${this._color === `green` ? `checked` : ``}/>
                  <label for="color-green-${this._uniqueNumber}" class="card__color card__color--green">green</label>
                  <input type="radio" id="color-pink-${this._uniqueNumber}" class="card__color-input card__color-input--pink visually-hidden"
                    name="color" value="pink" ${this._color === `pink` ? `checked` : ``}/>
                  <label for="color-pink-${this._uniqueNumber}" class="card__color card__color--pink">pink</label>
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`.trim();
  }

  _initFlatpickr() {
    flatpickr(this._element.querySelector(`.card__date`), {
      defaultDate: this._dueDate,
      altInput: true,
      altFormat: `j F`,
      dateFormat: `Z`
      // dateFormat: `Y-m-d H:i`
    });

    flatpickr(this._element.querySelector(`.card__time`), {
      defaultDate: this._dueDate,
      enableTime: true,
      noCalendar: true,
      altInput: true,
      altFormat: `h:i K`,
      // dateFormat: `Z`
      dateFormat: `H:i`
    });
  }

  createListeners() {
    this._initFlatpickr();

    this._element.querySelector(`.card__form`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__delete`).addEventListener(`click`, this._onResetBtnClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onToggleDate);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeated);

    [...this._element.querySelectorAll(`.card__color-input`)].forEach((elem) => {
      elem.addEventListener(`change`, this._onChangeColor);
    });
  }

  removeListeners() {
    this._element.querySelector(`.card__form`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__delete`).removeEventListener(`click`, this._onResetBtnClick);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onToggleDate);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeated);

    [...this._element.querySelectorAll(`.card__color-input`)].forEach((elem) => {
      elem.removeEventListener(`click`, this._onChangeColor);
    });
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => (target.title = value),
      color: (value) => (target.color = value),
      repeat: (value) => (target.repeatingDays[value] = true),
      date: (value) => (target.dueDate = formatDate(value, `x`)),
      time: (value) => (target.dueDate = updateTime(target.dueDate, value)),
    };
  }

  _convertData(formData) {
    const entry = {
      title: ``,
      color: ``,
      picture: ``,
      tags: new Set(),
      dueDate: null,
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskEditMapper = TaskEdit.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property] && taskEditMapper[property](value)) {
        taskEditMapper[property](value);
      }
    }
    return entry;
  }

  update({title, tags, color, repeatingDays, dueDate}) {
    this._title = title;
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._dueDate = +dueDate;
  }
}

export {TaskEdit};
