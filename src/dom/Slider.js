import {
  appendChildren,
  createDivWithClasses,
  getDragDirection,
  getDragDistance,
  getDragEventX,
  toPx,
} from './helpers/dom-helpers';
import Video from './Components/Video/Video';
import Component from './Component';
import DotsWrapper from './Components/DotsWrapper/DotsWrapper';

const DRAG_LEFT = -1;
const DRAG_RIGHT = 1;
const GO_BACK_DOUBLE_DOT = 0;
const GO_BACK_ONCE_DOT = 1;

class Slider extends Component {
  constructor(videos, onNeedNewVideos) {
    super('main', 'videos');
    this.setInitialVideoParams();
    this.videosWrapper = createDivWithClasses('inner__videos');
    this.videos = this.convertVideosToClasses(videos);
    appendChildren(this.videosWrapper, Component.getElements(this.videos));
    const dotsWrapper = this.createDotsWrapper();
    appendChildren(this.element, [this.videosWrapper, dotsWrapper]);
    this.bindEvents();
    this.resize();
    this.onNeedNewVideos = onNeedNewVideos;
  }

  setInitialVideoParams() {
    this.activeVideo = 0;
    this.setDragging(false);
  }

  createDotsWrapper() {
    this.dotsWrapper = new DotsWrapper(this.activeVideo + 1, (offset) => {
      this.setActiveVideo(this.activeVideo + offset);
    });
    return this.dotsWrapper.element;
  }

  setActiveVideo(index) {
    if (index < 0) return;
    if (this.activeVideo === 1 && index >= 2) {
      this.dotsWrapper.showDots(GO_BACK_DOUBLE_DOT, GO_BACK_ONCE_DOT);
    }
    if (this.activeVideo === 0 && index >= 1) {
      this.dotsWrapper.showDots(GO_BACK_ONCE_DOT);
    }
    this.activeVideo = index;
    this.updateVideosOffset();
    if (index >= this.videos.length - 6) this.onNeedNewVideos();
    this.dotsWrapper.setMainDotText(this.activeVideo + 1);
    if (index === 0) this.dotsWrapper.hideDots(GO_BACK_DOUBLE_DOT, GO_BACK_ONCE_DOT);
    else if (index === 1) this.dotsWrapper.hideDots(GO_BACK_DOUBLE_DOT);
  }

  updateVideosOffset(additionalOffset = 0) {
    const offset = -(this.getOverallVideoWidth() * this.activeVideo + additionalOffset);
    this.setSliderOffset(offset);
  }

  setSliderOffset(offset) {
    this.videosWrapper.style.transform = `translate(${toPx(offset)})`;
  }

  getOverallVideoWidth() {
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
    this.removeTransitionDuration();
    const windowWidth = window.innerWidth;
    const videosWrapperWidth = windowWidth * 0.9;
    const breakpoints = [
      {
        minWidth: 0,
        videoMargin: videosWrapperWidth * 0.1,
        videoWidth: videosWrapperWidth,
      },
      {
        minWidth: 600,
        videoMargin: 50,
        videoWidth: (videosWrapperWidth - 50) / 2,
      },
      {
        minWidth: 1000,
        videoMargin: 50,
        videoWidth: (videosWrapperWidth - 100) / 3,
      },
      {
        minWidth: 1300,
        videoMargin: 60,
        videoWidth: (videosWrapperWidth - 180) / 4,
      },
    ];
    const index = breakpoints.reverse().findIndex(item => windowWidth > item.minWidth);
    this.setVideosMargin(breakpoints[index].videoMargin);
    this.setVideosWidth(breakpoints[index].videoWidth);
    this.updateVideosOffset();
  }

  bindEvents() {
    window.addEventListener('resize', this.resize.bind(this));
    this.element.addEventListener('mousedown', this.startMouseDrag.bind(this));
    this.element.addEventListener('touchstart', this.startDrag.bind(this), { passive: true });
    this.element.addEventListener('mousemove', this.move.bind(this));
    this.element.addEventListener('touchmove', this.move.bind(this), { passive: true });
    const endDragHandler = this.endDrag.bind(this);
    this.element.addEventListener('mouseup', endDragHandler);
    this.element.addEventListener('touchend', endDragHandler);
    this.element.addEventListener('mouseleave', endDragHandler);
    this.element.addEventListener('touchleave', endDragHandler);
  }

  startMouseDrag(e) {
    e.preventDefault();
    this.startDrag(e);
  }

  startDrag(e) {
    this.removeTransitionDuration();
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
      if (this.activeVideo === 0 && direction === DRAG_LEFT) {
        this.updateVideosOffset(diff / 2);
      } else this.updateVideosOffset(diff);
    }
  }

  endDrag(e) {
    if (this.isDragging) {
      this.addTransitionDuration();
      const dragDifference = getDragEventX(e) - this.dragEventX;
      const direction = getDragDirection(dragDifference);
      const distance = getDragDistance(dragDifference);
      let offsetCount = 0;
      while (!(distance > this.getOverallVideoWidth() * (offsetCount - 0.5)
        && distance <= this.getOverallVideoWidth() * (offsetCount + 0.5))) {
        offsetCount += 1;
      }
      if (offsetCount === 0 || (this.activeVideo === 0 && direction === DRAG_RIGHT)) {
        this.updateVideosOffset();
      } else if (direction === DRAG_RIGHT) this.setActiveVideo(this.activeVideo - offsetCount);
      else this.setActiveVideo(this.activeVideo + offsetCount);
      this.dragEventX = 0;
      this.setDragging(false);
    }
  }

  addTransitionDuration() {
    this.setTransitionDuration('500ms');
  }

  removeTransitionDuration() {
    this.setTransitionDuration('0s');
  }

  setTransitionDuration(value) {
    this.videosWrapper.style.transitionDuration = value;
  }

  convertVideosToClasses(videos) {
    return videos.map(this.createVideoClass.bind(this));
  }

  createVideoClass(video) {
    return new Video(video, this.videoWidth, this.videoMargin);
  }

  addVideos(newVideos) {
    const videoClasses = this.convertVideosToClasses(newVideos);
    this.videos.push(...videoClasses);
    appendChildren(this.videosWrapper, Component.getElements(videoClasses));
    this.resize();
  }

  clear() {
    this.videos.length = 0;
    this.setActiveVideo(0);
    while (this.videosWrapper.firstChild) {
      this.videosWrapper.removeChild(this.videosWrapper.firstChild);
    }
  }
}

export default Slider;
