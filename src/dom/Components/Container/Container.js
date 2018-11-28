import '@babel/polyfill/noConflict';
import SearchBar from '../SearchBar/SearchBar';
import VideosWrapper from '../VideosWrapper/VideosWrapper';
import loadVideos from '../../../loaders/loaders';
import Component from '../../Component';
import './Container.css';

class Container extends Component {
  constructor() {
    super('div', 'container');
    const searchBar = new SearchBar(this.onStartSearch.bind(this));
    this.element.appendChild(searchBar.element);
    this.loading = false;
  }

  createSlider(videos) {
    this.slider = new VideosWrapper(videos, this.onNeedNewVideos.bind(this));
    this.element.appendChild(this.slider.element);
  }

  async onStartSearch(query) {
    if (this.slider) this.slider.clear();
    const videos = await this.loadVideos(query);
    if (this.slider) this.slider.addVideos(videos);
    else this.createSlider(videos);
  }

  async loadVideos(query) {
    this.loading = true;
    const videos = await loadVideos(query);
    this.loading = false;
    return videos;
  }

  async onNeedNewVideos() {
    if (this.loading) return;
    const videos = await this.loadVideos();
    this.slider.addVideos(videos);
  }
}

export default Container;
