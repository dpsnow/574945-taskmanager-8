import {formatDate, updateTime} from '../utils.js';
import moment from 'moment';

class TaskEntity {
  constructor(data) {
    // console.log('TaskEntity', data);
    this._dueDate = data.dueDate || undefined;
    this._date = data.date && moment(data.date, `X`).valueOf() || undefined;
    this._time = data.time || undefined;

    this.title = data.title || ``;
    this.color = data.color || ``;
    this.picture = data.picture || ``;

    this.tags = data.tags && new Set([].concat(data.tags)) || [];
    this.repeatingDays = data.repeatingDays || {
      'mo': false,
      'tu': false,
      'we': false,
      'th': false,
      'fr': false,
      'sa': false,
      'su': false,
    };

    if (data.newTags) {
      data.newTags.trim().split(` `).forEach((tag) => this.tags.add(tag));
    }

    if (data.repeat) {
      [].concat(data.repeat).forEach((day) => {
        this.repeatingDays[day] = true;
      });
    }
  }

  get dueDate() {
    return Number(this._dueDate || (this._date || this._time) && updateTime(formatDate(this._date || Date.now(), `x`), this._time));
  }

  get isRepeated() {
    return Object.values(this.repeatingDays).includes(true);
  }

  get isDate() {
    return Boolean(this.dueDate);
  }
}

export {TaskEntity};
