import { appendChildren, createDivWithClasses, getDragEventX } from './helpers';
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
    this.onResize();
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
    if (index < 0 || index > this.maxIndex) return;
    this.setDotAsInactive(this.activeVideo);
    this.setDotAsActive(index);
    this.activeVideo = index;
    this.updateVideosOffset();
  }

  setDotAsInactive(index) {
    this.dots[index].setInactive();
  }

  setDotAsActive(index) {
    this.dots[index].setActive();
  }

  updateVideosOffset() {
    if (this.activeVideo > this.maxIndex) this.activeVideo = this.maxIndex;
    const offset = this.getVideoOverallWidth() * this.activeVideo;
    this.videosWrapper.style.transform = `translate(-${offset}px)`;
  }

  getVideoOverallWidth() {
    return this.videoWidth + this.videoMargin;
  }

  setVideosWidth(value) {
    this.videoWidth = value;
    this.videos.forEach(video => video.setWidth(value));
  }

  setVideosMargin(value) {
    this.videoMargin = value;
    this.videos.forEach(video => video.setMargin(value));
  }

  onResize() {
    this.setTransitionDuration('0s');
    const windowWidth = window.innerWidth;
    const videosWrapperWidth = windowWidth * 0.9;
    if (windowWidth > 600 && windowWidth < 1000) {
      this.setVideosMargin(50);
      this.setVideosWidth((videosWrapperWidth - 50) / 2);
      this.setMaxVideoIndex(6);
    } else if (windowWidth <= 600) {
      this.setVideosMargin(videosWrapperWidth * 0.1);
      this.setVideosWidth(videosWrapperWidth);
      this.setMaxVideoIndex(7);
    } else if (windowWidth >= 1000 && windowWidth < 1300) {
      this.setVideosMargin(50);
      this.setVideosWidth((videosWrapperWidth - 100) / 3);
      this.setMaxVideoIndex(5);
    } else if (windowWidth >= 1300) {
      this.setVideosMargin(60);
      this.setVideosWidth((videosWrapperWidth - 180) / 4);
      this.setMaxVideoIndex(4);
    }
    this.updateVideosOffset();
  }

  bindEvents() {
    window.addEventListener('resize', this.onResize.bind(this));
    this.element.addEventListener('mousedown', this.startDrag.bind(this));
    this.element.addEventListener('touchstart', this.startDrag.bind(this));
    this.element.addEventListener('mouseup', this.endDrag.bind(this));
    this.element.addEventListener('touchend', this.endDrag.bind(this));
  }

  startDrag(e) {
    e.preventDefault();
    this.dragEventX = getDragEventX(e);
  }

  endDrag(e) {
    this.setTransitionDuration('300ms');
    const diff = getDragEventX(e) - this.dragEventX;
    const sign = Math.sign(diff);
    if (Math.abs(diff) > this.videoWidth) {
      const offsetCount = Math.floor(Math.abs(diff / this.videoWidth));
      if (sign > 0) this.setActiveVideo(this.activeVideo - offsetCount);
      else this.setActiveVideo(this.activeVideo + offsetCount);
    }
  }

  setTransitionDuration(value) {
    this.videosWrapper.style.transitionDuration = value;
  }

  setMaxVideoIndex(value) {
    this.maxIndex = value;
    this.dots.forEach((dot, index) => {
      if (index > value) dot.hide();
      else if (dot.hidden) dot.show();
    });
  }
}

export default Slider;
