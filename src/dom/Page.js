import { appendChildren, createDivWithClasses } from './helpers';
import SearchBar from './SearchBar';
import Slider from './Slider';


class Page {
  constructor(videos) {
    const wrapper = createDivWithClasses('container');
    const searchBar = new SearchBar();
    const slider = new Slider(videos);
    appendChildren(wrapper, [searchBar.element, slider.element]);
    document.body.appendChild(wrapper);
  }
}

export default Page;
