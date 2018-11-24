import {
  appendChildren,
  createDivWithClasses,
  createElementWithClasses,
  createIcon,
  setAttributes,
} from './helpers';
import Component from './Component';

function createVideoParam(iconName, text) {
  const wrapper = createDivWithClasses('video__param');
  const icon = createIcon(`icon-${iconName}`);
  const value = createElementWithClasses('span');
  value.innerText = text;
  appendChildren(wrapper, [icon, value]);
  return wrapper;
}


function createParams(author, date, views) {
  const paramsElements = [];
  paramsElements.push(createVideoParam('author', author));
  paramsElements.push(createVideoParam('date', date));
  paramsElements.push(createVideoParam('views', views));
  return paramsElements;
}

function createTitle(titleText) {
  const title = createElementWithClasses('a', 'video__title');
  title.innerText = titleText;
  setAttributes(title, { href: '#' });
  return title;
}

function createPreview(previewSrc) {
  const preview = createElementWithClasses('img', 'video__preview');
  setAttributes(preview, {
    src: previewSrc,
    alt: 'Video preview',
  });
  return preview;
}

function createDescription(descriptionText) {
  const description = createElementWithClasses('p', 'video__description');
  description.innerText = descriptionText;
  return description;
}

class Video extends Component {
  constructor(video, width, margin) {
    super('section', 'video');
    const title = createTitle(video.title);
    const preview = createPreview(video.preview);
    const paramsElements = createParams(video.author, video.date, video.views);
    const description = createDescription(video.description);
    appendChildren(this.element, [title, preview, ...paramsElements, description]);
    this.width = width;
    this.margin = margin;
  }

  set width(value) {
    this.element.style.width = `${value}px`;
  }

  set margin(value) {
    this.element.style.marginRight = `${value}px`;
  }
}

export default Video;
