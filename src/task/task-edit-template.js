import {formatDate} from '../utils.js';

const makeHashtags = (task) => {
  return Array.from(task._tags).map((hashtag) => {
    return `
    <span class="card__hashtag-inner">
      <input type="hidden" name="hashtag" value="${hashtag}" class="card__hashtag-hidden-input" />
      <button type="button" class="card__hashtag-name">#${hashtag}</button>
      <button type="button" class="card__hashtag-delete">delete</button>
    </span>`;
  }).join(``);
};

const makeRepeatingDays = (task) => {
  return Object.entries(task._repeatingDays).map((day) => {
    return `
    <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day[0]}-${task._uniqueNumber}" name="repeat" value="${day[0]}" ${day[1] ? `checked` : ``}/>
    <label class="card__repeat-day" for="repeat-${day[0]}-${task._uniqueNumber}">${day[0]}</label>`;
  }).join(``);
};

const taskTemplate = (task) => {
  // console.log(`render TaskEdit`, task);
  return `
    <article class="card card--edit card--${task._color} ${task._isRepeated ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">edit</button>
            <button type="button" class="card__btn card__btn--archive">archive</button>
            <button type="button" class="card__btn card__btn--favorites ${task._isFavorite ? `` : `card__btn--disabled`}">favorites</button>
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
                <button class="card__date-deadline-toggle" type="button">date:
                  <span class="card__date-status">${task._isDate ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline" ${task._isDate ? `` : `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input class="card__date" type="text" placeholder="${formatDate([], `D MMMM`)}" name="date" ${task._isDate ? `value="${task._dueDate}"` : ``} />
                  </label>
                  <label class="card__input-deadline-wrap">
                    <input class="card__time" type="text" placeholder="${formatDate([], `h:mm A`)}" name="time" ${task._isDate ? `value="${task._dueDate}"` : ``}/>
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">repeat:
                  <span class="card__repeat-status">${task._isRepeated ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days" ${task._isRepeated ? `` : `disabled`}>
                  <div class="card__repeat-days-inner">
                  ${makeRepeatingDays(task)}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                ${makeHashtags(task)}
                </div>
                <label>
                  <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />
                </label>
              </div>
            </div>

            <label class="card__img-wrap${task._picture ? `` : ` card__img-wrap--empty`}">
              <input type="file" class="card__img-input visually-hidden" name="img" />
              ${task._picture ? `<img src="${task._picture}" alt="task picture" class="card__img"/>` : ``}
            </label>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input type="radio" id="color-black-${task._uniqueNumber}" class="card__color-input card__color-input--black visually-hidden"
                  name="color" value="black" ${task._color === `black` ? `checked` : ``}/>
                <label for="color-black-${task._uniqueNumber}" class="card__color card__color--black">black</label>
                <input type="radio" id="color-yellow-${task._uniqueNumber}" class="card__color-input card__color-input--yellow visually-hidden"
                  name="color" value="yellow" ${task._color === `yellow` ? `checked` : ``}/>
                <label for="color-yellow-${task._uniqueNumber}" class="card__color card__color--yellow">yellow</label>
                <input type="radio" id="color-blue-${task._uniqueNumber}" class="card__color-input card__color-input--blue visually-hidden"
                  name="color" value="blue" ${task._color === `blue` ? `checked` : ``}/>
                <label for="color-blue-${task._uniqueNumber}" class="card__color card__color--blue">blue</label>
                <input type="radio" id="color-green-${task._uniqueNumber}" class="card__color-input card__color-input--green visually-hidden"
                  name="color" value="green" ${task._color === `green` ? `checked` : ``}/>
                <label for="color-green-${task._uniqueNumber}" class="card__color card__color--green">green</label>
                <input type="radio" id="color-pink-${task._uniqueNumber}" class="card__color-input card__color-input--pink visually-hidden"
                  name="color" value="pink" ${task._color === `pink` ? `checked` : ``}/>
                <label for="color-pink-${task._uniqueNumber}" class="card__color card__color--pink">pink</label>
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`;
};

export {taskTemplate};
