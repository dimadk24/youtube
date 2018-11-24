import './utils.css';
import './index.css';
import './fontello/css/fontello.css';
import Page from './dom/Page';

const video = {
  title: 'lorem ipsum',
  description: 'description',
  preview: 'https://wallpapersgood.com/wallpapers/preview/201402/28a57d5f9571301.jpg',
  author: 'DimaDK',
  date: 'today',
  views: 123,
};
const videos = Array(8);
videos.fill(video);
// eslint-disable-next-line no-new
new Page(videos);
