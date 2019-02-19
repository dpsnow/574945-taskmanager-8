(function() {
  const containerForFilters = document.querySelector(`.main__filter`);
  const containerForCards = document.querySelector(`.board__tasks`);
  const listFilters = [
    {caption: 'ALL', id:'all', count: 15, isChecked:true},
    {caption: 'OVERDUE', id:'overdue', count: 0},
    {caption: 'TODAY', id:'today', count: 0},
    {caption: 'FAVORITES', id:'favorites', count: 7},
    {caption: 'Repeating', id:'repeating', count: 2},
    {caption: 'Tags', id:'tags', count: 6},
    {caption: 'ARCHIVE', id:'archive', count: 115},
  ];


  /**
   *
   *
   * @param {string} caption
   * @param {string} id
   * @param {number} count default value = 0
   * @param {boolean} isChecked default value = false
   * @returns {html}
   */
  const getFillterElement = (caption, id, count = 0, isChecked = false) => {
    return `<input
        type="radio"
        id="filter__${id}"
        class="filter__input visually-hidden"
        name="filter"
        ${!Boolean(count) ? 'disabled' : ''}
        ${isChecked === true ? 'checked' : ''} />
      <label for="filter__${id}" class="filter__label">
        ${caption}
        <span class="filter__${id}-count">${count}</span>
      </label> `
  }

  listFilters.forEach((filterParams) => {
    containerForFilters.insertAdjacentHTML('beforeend', getFillterElement(
      filterParams.caption,
      filterParams.id,
      filterParams.count,
      filterParams.isChecked
    ));
  });

})();
