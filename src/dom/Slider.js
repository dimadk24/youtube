import {
  appendChildren,
  createDivWithClasses,
  getDragEventX,
  toPx,
} from './helpers';
import Video from './Video';
import Dot from './Dot/Dot';
import Component from './Component';

const DRAG_LEFT = -1;
const DRAG_RIGHT = 1;

function getDragDirection(dragDifference) {
  return Math.sign(dragDifference);
}

class Slider extends Component {
  constructor(videos, onNeedNewVideos) {
    super('main', 'videos');
    this.setInitialVideoParams();
    this.videosWrapper = createDivWithClasses('inner__videos');
    this.videos = this.convertVideosToClasses(videos);
    appendChildren(this.videosWrapper, Component.getElements(this.videos));
    const dots = this.createDots(videos.length);
    appendChildren(this.element, [this.videosWrapper, dots]);
    this.bindEvents();
    this.resize();
    this.onNeedNewVideos = onNeedNewVideos;
  }

  setInitialVideoParams() {
    this.videoWidth = 320;
    this.videoMargin = 50;
    this.activeVideo = 0;
    this.setDragging(false);
  }

  createDots(number) {
    this.dotsWrapper = createDivWithClasses('dots');
    this.dots = [];
    for (let i = 1; i <= number; i += 1) {
      this.dots.push(new Dot(i));
    }
    this.dots[0].setActive();
    appendChildren(this.dotsWrapper, Component.getElements(this.dots));
    return this.dotsWrapper;
  }

  setActiveVideo(index) {
    if (index < 0 || index > this.maxIndex) return;
    this.setDotAsInactive(this.activeVideo);
    this.setDotAsActive(index);
    this.activeVideo = index;
    this.updateVideosOffset();
    if (index >= this.videos.length - 6) this.onNeedNewVideos();
  }

  setDotAsInactive(index) {
    this.dots[index].setInactive();
  }

  setDotAsActive(index) {
    this.dots[index].setActive();
  }

  updateVideosOffset(additionalOffset = 0) {
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

  resize() {
    this.setTransitionDuration('0s');
    const windowWidth = window.innerWidth;
    const videosWrapperWidth = windowWidth * 0.9;
    if (windowWidth > 600 && windowWidth < 1000) {
      this.setVideosMargin(50);
      this.setVideosWidth((videosWrapperWidth - 50) / 2);
      this.setMaxVideoIndex(this.videos.length - 1);
    } else if (windowWidth <= 600) {
      this.setVideosMargin(videosWrapperWidth * 0.1);
      this.setVideosWidth(videosWrapperWidth);
      this.setMaxVideoIndex(this.videos.length);
    } else if (windowWidth >= 1000 && windowWidth < 1300) {
      this.setVideosMargin(50);
      this.setVideosWidth((videosWrapperWidth - 100) / 3);
      this.setMaxVideoIndex(this.videos.length - 2);
    } else if (windowWidth >= 1300) {
      this.setVideosMargin(60);
      this.setVideosWidth((videosWrapperWidth - 180) / 4);
      this.setMaxVideoIndex(this.videos.length - 3);
    }
    this.updateVideosOffset();
  }

  bindEvents() {
    window.addEventListener('resize', this.resize.bind(this));
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
    this.setTransitionDuration('0s');
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
      const direction = getDragDirection(diff);
      if (
        (this.activeVideo === 0 && direction === DRAG_LEFT)
        || (this.activeVideo === this.maxIndex && direction === DRAG_RIGHT)
      ) {
        this.updateVideosOffset(diff / 2);
      } else this.updateVideosOffset(diff);
    }
  }

  endDrag(e) {
    if (this.isDragging) {
      this.setTransitionDuration('300ms');
      const dragDifference = getDragEventX(e) - this.dragEventX;
      const direction = getDragDirection(dragDifference);
      const dragDistance = Math.abs(dragDifference);
      if ((dragDistance <= this.videoWidth / 2)
        || (this.activeVideo === 0 && direction === DRAG_RIGHT)
        || (this.activeVideo === this.maxIndex && direction === DRAG_LEFT)) {
        this.updateVideosOffset();
      } else {
        const offsetCount = Math.floor(dragDistance / (this.videoWidth / 2));
        if (direction === DRAG_RIGHT) this.setActiveVideo(this.activeVideo - offsetCount);
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

  convertVideosToClasses(videos) {
    return videos.map(this.createVideoClass.bind(this));
  }

  createVideoClass(video) {
    return new Video(video, this.videoWidth, this.videoMargin);
  }

  addVideos(newVideos) {
    const dotsStartIndex = this.videos.length;
    const videoClasses = this.convertVideosToClasses(newVideos);
    this.videos.push(...videoClasses);
    appendChildren(this.videosWrapper, Component.getElements(videoClasses));
    this.addDotsToNewVideos(dotsStartIndex);
    this.resize();
  }

  addDotsToNewVideos(startIndex) {
    const newDots = [];
    for (let i = startIndex + 1; i <= this.videos.length; i += 1) {
      newDots.push(new Dot(i));
    }
    this.dots.push(...newDots);
    const dotElements = Component.getElements(newDots);
    appendChildren(this.dotsWrapper, dotElements);
    dotElements.forEach((element, dotIndex) => {
      element.addEventListener('click', () => this.setActiveVideo(startIndex + dotIndex));
    });
  }
}

export default Slider;
