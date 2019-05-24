import { createElementWithClasses } from './helpers/dom-helpers';

class Component {
  constructor(elementName, ...classes) {
    this.element = createElementWithClasses(elementName, ...classes);
  }

  static getElements(components) {
    return components.map(component => component.element);
  }
}

export default Component;
