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
    this.setActiveVideo(7);
  }

  setInitialVideoParams() {
    this.videoWidth = 350;
    this.videoMargin = 70;
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
}

export default Slider;
