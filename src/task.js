import {isFunction, formatDate} from './utils.js';
import {Component} from './component.js';

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

  get _isRepeated() {
    return Object.values(this._repeatingDays).includes(true);
  }

  get _isDate() {
    return this._dueDate ? true : false;
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

  get template() {
    return `
      <article class="card card--${this._color} ${this._isRepeated ? `card--repeat` : ``} ${this._isDeadline ? `card--deadline` : ``}">
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
                  <fieldset class="card__date-deadline" ${this._isDate ? `` : `disabled`}>
                    <label class="card__input-deadline-wrap">
                      <input class="card__date" type="text" placeholder="${formatDate([], `Do MMMM`)}" name="date" ${this._isDate ? `value="${this._dayDueDate}"` : ``} />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input class="card__time" type="text" placeholder="${formatDate([], `h:mm A`)}" name="time" ${this._isDate ? `value="${this._timeDueDate}"` : ``}/>
                    </label>
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

                </div>
              </div>
              <label class="card__img-wrap${this._picture ? `` : ` card__img-wrap--empty`}">
                <input type="file" class="card__img-input visually-hidden" name="img" />
                ${this._picture ? `<img src="${this._picture}" alt="task picture" class="card__img"/>` : ``}
              </label>
          </div>
        </form>
      </article>`.trim();
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
