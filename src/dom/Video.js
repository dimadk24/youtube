import {
  appendChildren,
  createDivWithClasses,
  createElementWithClasses,
  createIcon,
  setAttributes, toNumber, toPx,
} from './helpers';
import Component from './Component';
import '../fontello/css/fontello.css';

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

function createTitle(titleText, link) {
  const title = createElementWithClasses('a', 'video__title');
  title.innerText = titleText;
  setAttributes(title, { href: link, target: '_blank', rel: 'noopener noreferrer' });
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
    const title = createTitle(video.title, video.link);
    const preview = createPreview(video.preview);
    const paramsElements = createParams(video.author, video.date, video.views);
    const description = createDescription(video.description);
    appendChildren(this.element, [title, preview, ...paramsElements, description]);
    this.setWidth(width);
    this.setMargin(margin);
  }

  setWidth(width) {
    this.element.style.width = toPx(width);
  }

  setMargin(margin) {
    this.element.style.marginRight = toPx(margin);
  }

  getWidth() {
    return toNumber(this.element.style.width);
  }

  getMargin() {
    return toNumber(this.element.style.marginRight);
  }
}

export default Video;
export {
  createVideoParam,
  createParams,
  createDescription,
  createPreview,
  createTitle,
};
