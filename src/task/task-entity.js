import {formatDate, updateTime} from '../utils.js';

class TaskEntity {
  constructor(data) {
    this.title = data.text || ``;
    this.color = data.color || ``;
    this.picture = data.picture || ``;
    this.dueDate = data.date && formatDate(data.date, `x`);
    this.tags = new Set();

    this.repeatingDays = {
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

    if (data.time) {
      // console.log(`data.time = ${data.time}; dueDate= ${this.dueDate}`);
      this.dueDate = this.dueDate || formatDate([], `x`);
      this.dueDate = updateTime(this.dueDate, data.time);
    }

  }
}

export {TaskEntity};
