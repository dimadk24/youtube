import SearchBar from '../SearchBar/SearchBar';
import Slider from '../../Slider';
import loadVideos from '../../../logic/loaders';
import Component from '../../Component';
import './Container.css';

class Container extends Component {
  constructor() {
    super('div', 'container');
    const searchBar = new SearchBar(this.onStartSearch.bind(this));
    this.element.appendChild(searchBar.element);
    document.body.appendChild(this.element);
    this.loading = false;
  }

  createSlider(videos) {
    this.slider = new Slider(videos, this.onNeedNewVideos.bind(this));
    this.element.appendChild(this.slider.element);
  }

  async onStartSearch(query) {
    if (this.slider) this.slider.clear();
    const videos = await this.loadVideosWithViews(query);
    if (this.slider) this.slider.addVideos(videos);
    else this.createSlider(videos);
  }

  async loadVideosWithViews(query) {
    this.loading = true;
    const videos = await loadVideos(query);
    this.loading = false;
    return videos;
  }

  async onNeedNewVideos() {
    if (this.loading) return;
    const videos = await this.loadVideosWithViews();
    this.slider.addVideos(videos);
  }
}

export default function container() {
  return new Container();
}
