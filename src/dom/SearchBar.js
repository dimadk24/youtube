import {
  appendChildren,
  createElementWithClasses,
  createIcon,
  setAttributes,
} from './helpers';
import Component from './Component';
import '../utils.css';
import '../fontello/css/fontello.css';

function createSearchLabel() {
  const label = createElementWithClasses('label', 'visually-hidden');
  label.setAttribute('for', 'search');
  label.innerText = 'Enter your search text';
  return label;
}

class SearchBar extends Component {
  constructor(onStartSearch) {
    super('form', 'search-bar');
    const icon = createIcon('icon-search');
    const label = createSearchLabel();
    const input = this.createSearchInput();
    const button = this.createSearchButton();
    appendChildren(this.element, [icon, label, input, button]);
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      onStartSearch(this.searchInput.value);
    });
  }

  createSearchInput() {
    this.searchInput = createElementWithClasses('input', 'search-input');
    setAttributes(this.searchInput, {
      type: 'text',
      id: 'search',
      placeholder: 'find your video here!',
    });
    return this.searchInput;
  }

  createSearchButton() {
    this.searchButton = createElementWithClasses('input', 'search-button');
    setAttributes(this.searchButton, {
      type: 'submit',
      value: 'Go!',
    });
    return this.searchButton;
  }
}

export default SearchBar;
export { createSearchLabel };
