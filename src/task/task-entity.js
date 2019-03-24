import {formatDate, updateTime} from '../utils.js';

class TaskEntity {
  constructor(data) {
    // console.log(data);
    this.title = data.title || data.text || ``;
    this.color = data.color || ``;
    this.picture = data.picture || ``;
    this.dueDate = data.dueDate || (data.date || data.time) && updateTime(formatDate(data.date || [], `x`), data.time);
    this.tags = data.tags || new Set();
    this.repeatingDays = data.repeatingDays || {
      'mo': false,
      'tu': false,
      'we': false,
      'th': false,
      'fr': false,
      'sa': false,
      'su': false,
    };

    if (data.hashtag) {
      const newTags = data.hashtag.split(` `);
      newTags.map((tag) => this.tags.add(tag));
    }

    if (data[`hashtag-input`]) {
      const newTags = data[`hashtag-input`].trim().split(` `);
      newTags.map((tag) => this.tags.add(tag));
    }

    if (data.repeat) {
      data.repeat.split(` `).forEach((day) => {
        this.repeatingDays[day] = true;
      });
    }
  }

  get isRepeated() {
    return Object.values(this.repeatingDays).includes(true);
  }

  get isDate() {
    return Boolean(this.dueDate);
  }
}

export {TaskEntity};
