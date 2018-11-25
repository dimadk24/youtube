import { appendChildren, createDivWithClasses } from './helpers';
import Video from './Video';
import Dot from './Dot';
import Component from './Component';

class Slider extends Component {
  constructor(videos) {
    super('main', 'videos');
    this.setInitialVideoParams();
    this.videosWrapper = createDivWithClasses('inner__videos');
    this.videos = videos.map(video => new Video(video, this.videoWidth, this.videoMargin));
    appendChildren(this.videosWrapper, Component.getElements(this.videos));
    const dots = this.createDots(videos.length);
    appendChildren(this.element, [this.videosWrapper, dots]);
    this.bindEvents();
  }

  setInitialVideoParams() {
    this.videoWidth = 320;
    this.videoMargin = 50;
    this.activeVideo = 0;
  }

  createDots(number) {
    const wrapper = createDivWithClasses('dots');
    this.dots = [];
    for (let i = 1; i <= number; i += 1) {
      this.dots.push(new Dot(i));
    }
    this.dots[0].setActive();
    appendChildren(wrapper, Component.getElements(this.dots));
    return wrapper;
  }

  setActiveVideo(index) {
    const videoOverallWidth = this.videoWidth + this.videoMargin;
    this.videosWrapper.style.transform = `translate(${-videoOverallWidth * index}px)`;
    this.dots[this.activeVideo].setInactive();
    this.dots[index].setActive();
    this.activeVideo = index;
  }

  setVideosWidth(value) {
    this.videoWidth = value;
    this.videos.forEach(video => video.setWidth(value));
  }

  setVideosMargin(value) {
    this.videoMargin = value;
    this.videos.forEach(video => video.setMargin(value));
  }

  calculateResizements() {
    const windowWidth = window.innerWidth;
    const videosWrapperWidth = windowWidth * 0.9;
    if (windowWidth > 600 && windowWidth < 1000) {
      this.setVideosMargin(50);
      this.setVideosWidth((videosWrapperWidth - 50) / 2);
    } else if (windowWidth <= 600) {
      this.setVideosMargin(videosWrapperWidth * 0.1);
      this.setVideosWidth(videosWrapperWidth);
    } else if (windowWidth >= 1000 && windowWidth < 1300) {
      this.setVideosMargin(50);
      this.setVideosWidth((videosWrapperWidth - 100) / 3);
    } else if (windowWidth >= 1300) {
      this.setVideosMargin(60);
      this.setVideosWidth((videosWrapperWidth - 180) / 4);
    }
  }

  bindEvents() {
    window.addEventListener('resize', this.calculateResizements.bind(this));
    this.calculateResizements();
  }
}

export default Slider;
