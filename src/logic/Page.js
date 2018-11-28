import SearchBar from '../dom/Components/SearchBar/SearchBar';
import Slider from '../dom/Slider';
import loadVideos from './loaders';
import Component from '../dom/Component';

class Page extends Component {
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

export default function page() {
  return new Page();
}
