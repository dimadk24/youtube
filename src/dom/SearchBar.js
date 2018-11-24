import {
  appendChildren,
  createElementWithClasses,
  createIcon,
  setAttributes,
} from './helpers';
import Component from './Component';

function createSearchLabel() {
  const label = createElementWithClasses('label', 'hidden');
  label.setAttribute('for', 'search');
  label.innerText = 'Enter your search text';
  return label;
}

class SearchBar extends Component {
  constructor() {
    super('div', 'search-bar');
    const icon = createIcon('icon-search');
    const label = createSearchLabel();
    const input = this.createSearchInput();
    const button = this.createSearchButton();
    appendChildren(this.element, [icon, label, input, button]);
  }

  createSearchInput() {
    this.searchInput = createElementWithClasses('input');
    setAttributes(this.searchInput, {
      type: 'text',
      id: 'search',
      placeholder: 'find your video here!',
    });
    return this.searchInput;
  }

  createSearchButton() {
    this.searchButton = createElementWithClasses('button', 'search-button');
    this.searchButton.innerText = 'Go!';
    return this.searchButton;
  }
}

export default SearchBar;
export { createSearchLabel };
