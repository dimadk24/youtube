import Component from '../Component';

describe('Component', () => {
  it('should create node', () => {
    const component = new Component('p', 'test');
    expect(component.element instanceof Node).toBeTruthy();
  });

  it('should create node with given elementName', () => {
    const component = new Component('p', 'test');
    expect(component.element.tagName.toLowerCase()).toBe('p');
  });

  it('should create node with given classes', () => {
    const component = new Component('p', 'first', 'second');
    expect(component.element.classList).toContain('first');
    expect(component.element.classList).toContain('second');
  });

  it('should provide static method for getting elements from array of components', () => {
    const components = [];
    for (let i = 0; i < 10; i += 1) {
      components.push(new Component('p', `class-${i}`));
    }
    const expected = components.map(component => component.element);
    expect(Component.getElements(components)).toEqual(expect.arrayContaining(expected));
  });
});
