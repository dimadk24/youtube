import {
  appendChildren,
  createDivWithClasses,
  createElementWithClasses,
  createIcon, setAttributes, toPx, toNumber,
} from './dom-helpers';

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
    expect(elem.classList).toContain('first');
    expect(elem.classList).toContain('second');
  });

  it('should raise error if element name is undefined', () => {
    expect(createElementWithClasses).toThrow();
  });

  it('should raise error if element name is not string', () => {
    expect(() => {
      createElementWithClasses(123);
    }).toThrow();
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

  it('should raise nice error with debug text if undefined passed as children', () => {
    const elem = document.createElement('p');
    expect(() => {
      appendChildren(elem, [undefined]);
    }).toThrow('undefined');
  });

  it('should raise nice error with debug text if int passed as children', () => {
    const elem = document.createElement('p');
    expect(() => {
      appendChildren(elem, [123]);
    }).toThrow('123');
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

describe('toPx', () => {
  it('should convert js px length to css', () => {
    const number = 300;
    const css = toPx(number);
    expect(css).toBe('300px');
  });
});

describe('toNumber', () => {
  it('should convert css px length to js length and type', () => {
    const cssLength = '320px';
    const length = toNumber(cssLength);
    expect(length).toBe(320);
  });
});
