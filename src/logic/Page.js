import SearchBar from '../dom/Components/SearchBar/SearchBar';
import Slider from '../dom/Slider';
import loadVideos from './loaders';
import { createDivWithClasses } from '../dom/helpers/dom-helpers';

class Page {
  constructor() {
    this.wrapper = createDivWithClasses('container');
    const searchBar = new SearchBar(this.onStartSearch.bind(this));
    this.wrapper.appendChild(searchBar.element);
    document.body.appendChild(this.wrapper);
    this.loading = false;
  }

  createSlider(videos) {
    this.slider = new Slider(videos, this.onNeedNewVideos.bind(this));
    this.wrapper.appendChild(this.slider.element);
  }

  async onStartSearch(query) {
    if (this.slider) this.slider.clear();
    this.query = query;
    const videos = await this.loadVideosWithViews(query);
    if (this.slider) this.slider.addVideos(videos);
    else this.createSlider(videos);
  }

  async loadVideosWithViews() {
    this.loading = true;
    const videos = await loadVideos(this.query);
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
