import Container from './Container';
import loadVideos from '../../../loaders/loaders';

jest.mock('../../../loaders/loaders');
loadVideos.mockReturnValue([{
  author: 'funnyplox',
  date: '2013-11-09T22:11:37.000Z',
  description: 'Here is a video',
  id: 'DXUAyRRkI6k',
  link: 'https://youtube.com/watch?v=DXUAyRRkI6k',
  preview: 'https://i.ytimg.com/vi/DXUAyRRkI6k/mqdefault.jpg',
  title: 'Funny Cats and Kittens Meowing Compilation',
  views: '105368896',
}]);

describe('Container', () => {
  it('should have one child initially', () => {
    const container = new Container();
    expect(container.element.children).toHaveLength(1);
  });

  it('should start search and create slider', async () => {
    const container = new Container();
    expect(container.slider).toBeFalsy();
    await container.onStartSearch('test query');
    expect(container.element.children).toHaveLength(2);
    expect(container.slider).toBeTruthy();
  });

  it('should add new videos if slider need it', async () => {
    const container = new Container();
    await container.onStartSearch('test query');
    expect(container.slider.videosWrapper.children).toHaveLength(1);
    await container.onNeedNewVideos();
    expect(container.slider.videosWrapper.children).toHaveLength(2);
  });
});
