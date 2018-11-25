import Dot from '../Dot';

describe('Dot', () => {
  it('should create span element', () => {
    const dot = new Dot(1);
    expect(dot.element.tagName.toLowerCase()).toBe('span');
  });

  it('should have 1 class', () => {
    const dot = new Dot(1);
    expect(dot.element.classList).toHaveLength(1);
  });

  it('should contain dot number as innerText 1', () => {
    const dot = new Dot(1);
    expect(dot.element.innerText).toBe('1');
  });

  it('should contain dot number as innerText 2', () => {
    const dot = new Dot(2);
    expect(dot.element.innerText).toBe('2');
  });

  it('should be active and have 2 classes', () => {
    const dot = new Dot(1);
    dot.setActive();
    expect(dot.element.classList).toHaveLength(2);
  });

  it('should be inactive and have 1 class (the same it has before activeness)', () => {
    const dot = new Dot(1);
    const classBeforeSettingActive = dot.element.classList.item(0);
    dot.setActive();
    dot.setInactive();
    expect(dot.element.classList).toHaveLength(1);
    expect(dot.element.classList.item(0)).toBe(classBeforeSettingActive);
  });

  it('should be hidden and have 2 classes and field', () => {
    const dot = new Dot(2);
    expect(dot.hidden).toBeFalsy();
    dot.hide();
    expect(dot.hidden).toBeTruthy();
    expect(dot.element.classList).toHaveLength(2);
  });

  it('should be visible and have 1 class (the same it has before hide)', () => {
    const dot = new Dot(1);
    const classBeforeHide = dot.element.classList.item(0);
    dot.hide();
    dot.show();
    expect(dot.hidden).toBeFalsy();
    expect(dot.element.classList).toHaveLength(1);
    expect(dot.element.classList.item(0)).toBe(classBeforeHide);
  });
});