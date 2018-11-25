import Video, {
  createDescription,
  createParams,
  createPreview,
  createTitle,
  createVideoParam,
} from '../Video';
import * as helpers from '../helpers';


describe('createVideoParam', () => {
  it('should create wrapper-div', () => {
    const param = createVideoParam('test', 'test');
    expect(param.tagName.toLowerCase()).toBe('div');
  });

  it('should create icon with appropriate name', () => {
    const spy = jest.spyOn(helpers, 'createIcon');
    createVideoParam('test-icon', 'test text');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toBeCalledWith('icon-test-icon');
    spy.mockRestore();
  });

  it('should create value with given innerText', () => {
    const elem = createVideoParam('test', 'super text');
    expect(elem.children[1].innerText).toBe('super text');
  });
});

describe('createParams', () => {
  it('should have length of 3', () => {
    const params = createParams('test', '24.02.2000', '100');
    expect(params).toHaveLength(3);
  });
});

describe('createTitle', () => {
  it('should create link', () => {
    const title = createTitle('test');
    expect(title.tagName.toLowerCase()).toBe('a');
    expect(title.getAttribute('href').length).toBeTruthy();
  });

  it('should have passed innerText', () => {
    const title = createTitle('test title');
    expect(title.innerText).toBe('test title');
  });
});

describe('createPreview', () => {
  it('should create img', () => {
    const preview = createPreview('https://vk.com/image.png');
    expect(preview.tagName.toLowerCase()).toBe('img');
    expect(preview.getAttribute('src')).toBe('https://vk.com/image.png');
  });
});

describe('createDescription', () => {
  it('should create p', () => {
    const description = createDescription('lorem text');
    expect(description.tagName.toLowerCase()).toBe('p');
  });

  it('should have passed innerText', () => {
    const description = createDescription('lorem text');
    expect(description.innerText).toBe('lorem text');
  });
});

describe('Video', () => {
  const testVideo = {
    title: 'lorem ipsum',
    description: 'description',
    preview: 'https://wallpapersgood.com/wallpapers/preview/201402/28a57d5f9571301.jpg',
    author: 'DimaDK',
    date: 'today',
    views: 123,
  };
  const width = [320, 'px'];
  const margin = [50, 'px'];

  it('should have 6 children', () => {
    const video = new Video(testVideo, width, margin);
    expect(video.element.children).toHaveLength(6);
  });

  it('should have passed width and margin', () => {
    const video = new Video(testVideo, width, margin);
    expect(video.getWidth()).toEqual(width);
    expect(video.getMargin()).toEqual(margin);
  });

  it('should change width', () => {
    const video = new Video(testVideo, width, margin);
    expect(video.getMargin()).not.toEqual([500, 'px']);
    video.setWidth(500, 'px');
    expect(video.getWidth()).toEqual([500, 'px']);
  });

  it('should change margin', () => {
    const video = new Video(testVideo, width, margin);
    expect(video.getMargin()).not.toEqual([100, 'px']);
    video.setMargin(100, 'px');
    expect(video.getMargin()).toEqual([100, 'px']);
  });
});
