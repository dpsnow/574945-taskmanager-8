import {createElement} from './utils.js';

class Task {
  constructor(data) {
    this._title = data.title;
    this._color = data.color;
    this._tags = data.tags;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;

    // this._onEditButtonClick = this._onEditButtonClick.bind(this);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).includes(true);
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  _onEditButtonClick() {
    // this._onEdit();
    typeof this._onEdit === `function` && this._onEdit();

    // if (typeof this._onEdit === `function`) {
    //   this._onEdit();
    // } else {
    //   throw new Error('this._onEdit not function');
    // }

  }

  get template() {
    return `
      <article class="card card--${this._color} ${this._isRepeated() ? `card--repeat` : ``}">
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
                    date: <span class="card__date-status">${this._dueDate ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__date-deadline" ${this._dueDate ? `` : `disabled`}>
                    <label class="card__input-deadline-wrap">
                      <input class="card__date" type="text" placeholder="${new Date(this._dueDate).toLocaleDateString(`en-GB`, {day: `numeric`, month: `long`})}" name="date" />
                    </label>
                    <label class="card__input-deadline-wrap">
                      <input class="card__time" type="text" placeholder="${new Date(this._dueDate).toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`, hour12: true})}" name="time" />
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${this._isRepeated() ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__repeat-days" ${this._isRepeated() ? `` : `disabled`}>
                    <div class="card__repeat-days-inner">
                    ${Object.entries(this._repeatingDays).map((day) => {
                      return `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day[0]}-3" name="repeat"
                      value="${day[0]}" ${day[1] ? `checked` : ``}/>
                      <label class="card__repeat-day" for="repeat-${day[0]}-3">${day[0]}</label>`.trim();
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

  get element() {
    return this._element;
  }

  render() {
    this._element = createElement(this.template)[0];
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  // можно ли заменить на addHandlers ?
  bind() {
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  // можно ли заменить на removeHandlers ?
  unbind() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }
}

export {Task};