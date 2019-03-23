import {formatDate} from '../utils.js';

const taskTemplate = (task) => {
  return `
  <article class="card card--${task._color} ${task._isRepeated ? `card--repeat` : ``} ${task._isDeadline ? `card--deadline` : ``}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button type="button" class="card__btn card__btn--favorites ${task._isFavorite ? `` : `card__btn--disabled`}">
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
            <textarea class="card__text" placeholder="Start typing your text here..." name="text">${task._title}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <fieldset class="card__date-deadline" ${task._isDate ? `` : `disabled`}>
                <label class="card__input-deadline-wrap">
                  <input class="card__date" type="text" placeholder="${formatDate([], `Do MMMM`)}" name="date" ${task._isDate ? `value="${task._dayDueDate}"` : ``} />
                </label>
                <label class="card__input-deadline-wrap">
                  <input class="card__time" type="text" placeholder="${formatDate([], `h:mm A`)}" name="time" ${task._isDate ? `value="${task._timeDueDate}"` : ``}/>
                </label>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
  ${Array.from(task._tags).map((hashtag) => {
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
          <label class="card__img-wrap${task._picture ? `` : ` card__img-wrap--empty`}">
            <input type="file" class="card__img-input visually-hidden" name="img" />
            ${task._picture ? `<img src="${task._picture}" alt="task picture" class="card__img"/>` : ``}
          </label>
      </div>
    </form>
  </article>`.trim();
};

export {taskTemplate};
