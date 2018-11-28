import Component from '../Component';
import './Dot.css';

const MAIN_CLASS = 'dot';
const ACTIVE_CLASS = 'dot--active';
const HIDDEN_CLASS = 'hidden';

class Dot extends Component {
  constructor(text) {
    super('span', MAIN_CLASS);
    this.setText(text);
    this.active = false;
    this.hidden = false;
  }

  setText(value) {
    this.element.innerText = String(value);
  }

  setActive() {
    this.element.classList.add(ACTIVE_CLASS);
    this.active = true;
  }

  setInactive() {
    this.element.classList.remove(ACTIVE_CLASS);
    this.active = false;
  }

  hide() {
    if (this.hidden) return;
    this.element.classList.add(HIDDEN_CLASS);
    this.hidden = true;
  }

  show() {
    if (!this.hidden) return;
    this.element.classList.remove(HIDDEN_CLASS);
    this.hidden = false;
  }
}

export default Dot;
