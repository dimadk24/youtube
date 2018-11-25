import { createDivWithClasses } from './helpers';
import SearchBar from './SearchBar';
import Slider from './Slider';

const YOUTUBE_KEY = 'AIzaSyAoxmNlzlKwuTNRMvWITXvtFpc-7vqfcr8';
const API_URL = 'https://www.googleapis.com/youtube/v3';

function getVideoIds(videos) {
  const stringIds = videos.reduce((accumulator, video) => `${accumulator},${String(video.id)}`, '');
  return stringIds.slice(1);
}

let nextPageToken = '';
let sliderCreated;

async function loadViews(ids) {
  const response = await fetch(`${API_URL}/videos?key=${YOUTUBE_KEY}&type=video&part=statistics&maxResults=15&id=${ids}`,
    { method: 'GET' });
  const message = await response.json();
  return message;
}

async function loadVideos(query) {
  let url = `${API_URL}/search?key=${YOUTUBE_KEY}&type=video&part=snippet&maxResults=15&q=${query}`;
  if (nextPageToken) url += `&pageToken=${nextPageToken}`;
  const response = await fetch(url, { method: 'GET' });
  const message = await response.json();
  // have to suppress it, cause I can't destruct it here
  // eslint-disable-next-line prefer-destructuring
  nextPageToken = message.nextPageToken;
  return message;
}

function convertVideos(youtubeVideos) {
  return youtubeVideos.map((video) => {
    const { snippet } = video;
    return {
      id: video.id.videoId,
      link: `https://youtube.com/watch?v=${video.id.videoId}`,
      title: snippet.title,
      preview: snippet.thumbnails.medium.url,
      author: snippet.channelTitle,
      date: snippet.publishedAt,
      views: 0,
      description: snippet.description,
    };
  });
}

function addViewsToVideos(videos, views) {
  return videos.map((video, index) => {
    const newVideo = video;
    newVideo.views = views[index];
    return video;
  });
}

function convertViews(youtubeViews) {
  return youtubeViews.map(view => view.statistics.viewCount);
}

class Page {
  constructor() {
    this.wrapper = createDivWithClasses('container');
    const searchBar = new SearchBar(this.onStartSearch.bind(this));
    this.wrapper.appendChild(searchBar.element);
    document.body.appendChild(this.wrapper);
    this.loadingMore = false;
  }

  async onStartSearch(query) {
    if (sliderCreated) return;
    sliderCreated = true;
    this.query = query;
    const videos = await this.loadVideosWithViews(query);
    this.slider = new Slider(videos, this.onNeedNewVideos.bind(this));
    this.wrapper.appendChild(this.slider.element);
  }

  async loadVideosWithViews() {
    const youtubeResponse = await loadVideos(this.query);
    let videos = convertVideos(youtubeResponse.items);
    const ids = getVideoIds(videos);
    const youtubeViews = await loadViews(ids);
    const views = convertViews(youtubeViews.items);
    videos = addViewsToVideos(videos, views);
    return videos;
  }

  async onNeedNewVideos() {
    if (!this.loadingMore) {
      this.loadingMore = true;
      const videos = this.loadVideosWithViews();
      this.slider.addVideos(videos);
    }
    this.loadingMore = false;
  }
}

export default function page() {
  return new Page();
}
