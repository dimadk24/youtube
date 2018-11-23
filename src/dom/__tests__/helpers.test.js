import {
  appendChildren,
  createDivWithClasses,
  createElementWithClasses,
  createIcon, setAttributes,
} from '../helpers';

describe('createElementWithClasses', () => {
  it('should return instance of node', () => {
    const elem = createElementWithClasses('p');
    expect(elem instanceof Node).toBeTruthy();
  });

  it('should return element with given name', () => {
    const elem = createElementWithClasses('p');
    expect(elem.tagName.toLowerCase()).toBe('p');
  });

  it('should set classes on created node', () => {
    const elem = createElementWithClasses('p', 'first', 'second');
    expect(elem.classList.contains('first')).toBeTruthy();
    expect(elem.classList.contains('second')).toBeTruthy();
  });

  it('should raise error if element name is bad', () => {
    expect(createElementWithClasses).toThrow();
  });
});

describe('createDivWithClasses', () => {
  it('should create div', () => {
    const elem = createDivWithClasses();
    expect(elem.tagName.toLowerCase()).toBe('div');
  });
});

describe('createIcon', () => {
  it('should create icon', () => {
    const elem = createIcon('icon-test');
    expect(elem.tagName.toLowerCase()).toBe('i');
  });
});

describe('appendChildren', () => {
  it('shouldn\'t append 0 children', () => {
    const elem = document.createElement('div');
    appendChildren(elem, []);
    expect(elem.childElementCount).toBe(0);
  });

  it('should append 5 children', () => {
    const elem = document.createElement('div');
    const children = [];
    const childrenCount = 5;
    for (let i = 0; i < childrenCount; i += 1) children.push(document.createElement('p'));
    appendChildren(elem, children);
    expect(elem.childElementCount).toBe(childrenCount);
    for (let i = 0; i < childrenCount; i += 1) expect(elem.children[i]).toBe(children[i]);
  });
});

describe('setAttributes', () => {
  it('should set 0 attributes', () => {
    const elem = document.createElement('p');
    setAttributes(elem, []);
    expect(elem.getAttributeNames()).toHaveLength(0);
  });

  it('should set attributes', () => {
    const elem = document.createElement('input');
    const attributes = { type: 'text', placeholder: 'test', maxlength: '10' };
    setAttributes(elem, attributes);

    expect(elem.getAttributeNames()).toHaveLength(3);
    expect(elem.getAttributeNames()).toContain('type');
    expect(elem.getAttributeNames()).toContain('placeholder');
    expect(elem.getAttributeNames()).toContain('maxlength');
    expect(elem.getAttribute('type')).toBe('text');
    expect(elem.getAttribute('placeholder')).toBe('test');
    expect(elem.getAttribute('maxlength')).toBe('10');
  });
});
