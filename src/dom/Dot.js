import Component from './Component';
import './Dot.css';

const CLASS = 'dot';
const ACTIVE_CLASS = 'dot--active';

class Dot extends Component {
  constructor(dotNumber) {
    super('span', CLASS);
    this.element.innerText = String(dotNumber);
  }

  setActive() {
    this.element.classList.add(ACTIVE_CLASS);
  }

  setInactive() {
    this.element.classList.remove(ACTIVE_CLASS);
  }
}

export default Dot;
