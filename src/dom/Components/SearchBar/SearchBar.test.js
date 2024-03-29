import SearchBar, { createSearchLabel } from './SearchBar';

describe('createSearchLabel', () => {
  it('should create hidden search label', () => {
    const label = createSearchLabel();
    expect(label.tagName.toLowerCase()).toBe('label');
    expect(label.classList).toContain('visually-hidden');
    expect(label.getAttributeNames()).toContain('for');
  });

  it('should have "for" attribute', () => {
    const label = createSearchLabel();
    expect(label.getAttributeNames()).toContain('for');
  });

  it('should have some inner text', () => {
    const label = createSearchLabel();
    expect(label.innerText.length).toBeTruthy();
  });
});

describe('SearchBar', () => {
  it('should create wrapper', () => {
    const bar = new SearchBar();
    expect(bar.element.tagName.toLowerCase()).toBe('form');
  });

  it('should create children', () => {
    const bar = new SearchBar();
    expect(bar.element.children[0].tagName.toLowerCase()).toBe('i');
    expect(bar.element.children[1].tagName.toLowerCase()).toBe('label');
    expect(bar.element.children[2].tagName.toLowerCase()).toBe('input');
    expect(bar.element.children[3].tagName.toLowerCase()).toBe('input');
  });

  it('should have search input', () => {
    const bar = new SearchBar();
    expect(bar.searchInput.tagName.toLowerCase()).toBe('input');
  });

  it('should have search button', () => {
    const bar = new SearchBar();
    expect(bar.searchButton.tagName.toLowerCase()).toBe('input');
  });

  function submit(searchBar) {
    searchBar.element.dispatchEvent(new Event('submit'));
  }

  it('should be submittable and callback when is submitted', () => {
    const onStartSearch = jest.fn();
    const bar = new SearchBar(onStartSearch);
    submit(bar);
    expect(onStartSearch).toBeCalled();
  });

  it('should pass search value into callback', () => {
    const onStartSearch = jest.fn();
    const bar = new SearchBar(onStartSearch);
    bar.searchInput.value = 'test query';
    submit(bar);
    expect(onStartSearch).toBeCalledWith('test query');
  });
});
