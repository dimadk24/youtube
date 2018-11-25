import Component from './Component';
import './Dot.css';

const MAIN_CLASS = 'dot';
const ACTIVE_CLASS = 'dot--active';
const HIDDEN_CLASS = 'hidden';

class Dot extends Component {
  constructor(dotNumber) {
    super('span', MAIN_CLASS);
    this.element.innerText = String(dotNumber);
    this.active = false;
    this.hidden = false;
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
    this.element.classList.add(HIDDEN_CLASS);
    this.hidden = true;
  }

  show() {
    this.element.classList.remove(HIDDEN_CLASS);
    this.hidden = false;
  }
}

export default Dot;
