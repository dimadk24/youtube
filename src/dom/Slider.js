import {
  appendChildren,
  createDivWithClasses,
  getDragEventX,
  toPx,
} from './helpers';
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
    this.setDragging(false);
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

  updateVideosOffset(additionalOffset = 0) {
    if (this.activeVideo > this.maxIndex) this.activeVideo = this.maxIndex;
    const offset = -(this.getVideoOverallWidth() * this.activeVideo + additionalOffset);
    this.setSliderOffset(offset);
  }

  setSliderOffset(offset) {
    this.videosWrapper.style.transform = `translate(${toPx(offset)})`;
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
    this.element.addEventListener('mousedown', this.startMouseDrag.bind(this));
    this.element.addEventListener('touchstart', this.startDrag.bind(this), { passive: true });
    this.element.addEventListener('mousemove', this.move.bind(this));
    this.element.addEventListener('touchmove', this.move.bind(this), { passive: true });
    this.element.addEventListener('mouseup', this.endDrag.bind(this));
    this.element.addEventListener('touchend', this.endDrag.bind(this));
    this.element.addEventListener('mouseleave', this.endDrag.bind(this));
    this.element.addEventListener('touchleave', this.endDrag.bind(this));
    Component.getElements(this.dots).forEach(
      (element, index) => element.addEventListener('click', () => {
        this.setActiveVideo(index);
      }),
    );
  }

  startMouseDrag(e) {
    e.preventDefault();
    this.startDrag(e);
  }

  startDrag(e) {
    this.dragEventX = getDragEventX(e);
    this.setDragging(true);
  }

  setDragging(value) {
    if (value) this.element.classList.add('videos--swiping');
    else this.element.classList.remove('videos--swiping');
    this.isDragging = value;
  }

  move(e) {
    if (this.isDragging) {
      const diff = this.dragEventX - getDragEventX(e);
      const sign = Math.sign(diff);
      if (
        (this.activeVideo === 0 && sign < 0)
        || (this.activeVideo === this.maxIndex && sign > 0)
      ) {
        this.updateVideosOffset(diff / 2);
      } else this.updateVideosOffset(diff);
    }
  }

  endDrag(e) {
    if (this.isDragging) {
      this.setTransitionDuration('300ms');
      const diff = getDragEventX(e) - this.dragEventX;
      const sign = Math.sign(diff);
      if ((Math.abs(diff) <= this.videoWidth / 2)
        || (this.activeVideo === 0 && sign > 0)
        || (this.activeVideo === this.maxIndex && sign < 0)) {
        this.setActiveVideo(this.activeVideo);
      } else {
        const offsetCount = Math.floor(Math.abs(diff / this.videoWidth));
        if (sign > 0) this.setActiveVideo(this.activeVideo - offsetCount);
        else this.setActiveVideo(this.activeVideo + offsetCount);
      }
      this.dragEventX = 0;
      this.setDragging(false);
    }
  }

  setTransitionDuration(value) {
    this.videosWrapper.style.transitionDuration = value;
  }

  setMaxVideoIndex(value) {
    this.maxIndex = value;
    this.dots.forEach((dot, index) => {
      if (index > value) {
        dot.hide();
        if (dot.active) dot.setInactive();
      } else if (dot.hidden) dot.show();
    });
    this.dots[this.activeVideo].setActive();
  }
}

export default Slider;
