export default function getFillterHtml(id, count = 0, isChecked = false) {
  return `<input
      type="radio"
      id="filter__${id}"
      class="filter__input visually-hidden"
      name="filter"
      ${count ? `` : `disabled`}
      ${isChecked === true ? `checked` : ``} />
    <label for="filter__${id}" class="filter__label">
      ${id.toUpperCase()}
      <span class="filter__${id}-count">${count}</span>
    </label> `;
}
