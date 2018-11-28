import './DotsWrapper.css';
import Component from '../../Component';
import { appendChildren } from '../../helpers/dom-helpers';
import Dot from '../Dot/Dot';

class DotsWrapper extends Component {
  constructor(mainDotText, onSetActiveVideo) {
    super('div', 'dots');
    this.onSetActiveVideo = onSetActiveVideo;
    const goBackDots = this.createGoBackDots();
    goBackDots.forEach(dot => dot.hide());
    this.dots = [
      ...goBackDots,
      this.createMainDot(mainDotText),
      ...this.createGoForwardDots(),
    ];
    appendChildren(this.element, Component.getElements(this.dots));
  }

  createDotsWithValues(options) {
    const dots = [];
    options.forEach(option => dots.push(new Dot(option.text)));
    dots.forEach((dot, index) => dot.element.addEventListener('click', () => {
      this.onSetActiveVideo(options[index].actionOffset);
    }));
    return dots;
  }

  createGoBackDots() {
    const options = [
      {
        text: '<<', actionOffset: -2,
      },
      {
        text: '<',
        actionOffset: -1,
      },
    ];
    return this.createDotsWithValues(options);
  }

  createMainDot(text) {
    this.mainDot = new Dot(text);
    this.mainDot.setActive();
    return this.mainDot;
  }

  createGoForwardDots() {
    const options = [
      {
        text: '>',
        actionOffset: 1,
      },
      {
        text: '>>',
        actionOffset: 2,
      },
    ];
    return this.createDotsWithValues(options);
  }

  hideDots(...indexes) {
    indexes.forEach(index => this.dots[index].hide());
  }

  showDots(...indexes) {
    indexes.forEach(index => this.dots[index].show());
  }

  setMainDotText(value) {
    this.mainDot.setText(value);
  }
}

export default DotsWrapper;
