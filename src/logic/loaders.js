import {
  getVideoIds,
  addViewsToVideos,
  convertVideos,
  convertViews,
} from './logic-helpers';

const YOUTUBE_KEY = 'AIzaSyAoxmNlzlKwuTNRMvWITXvtFpc-7vqfcr8';
const API_URL = 'https://www.googleapis.com/youtube/v3';

let nextPageToken = '';

async function loadOnlyViews(ids) {
  const response = await fetch(`${API_URL}/videos?key=${YOUTUBE_KEY}&type=video&part=statistics&maxResults=15&id=${ids}`,
    { method: 'GET' });
  const message = await response.json();
  return message;
}

async function loadOnlyVideos(query) {
  let url = `${API_URL}/search?key=${YOUTUBE_KEY}&type=video&part=snippet&maxResults=15&q=${query}`;
  if (nextPageToken) url += `&pageToken=${nextPageToken}`;
  const response = await fetch(url, { method: 'GET' });
  const message = await response.json();
  // have to suppress it, cause I can't destruct it here
  // eslint-disable-next-line prefer-destructuring
  nextPageToken = message.nextPageToken;
  return message;
}

async function loadVideos(query) {
  const youtubeResponse = await loadOnlyVideos(query);
  let videos = convertVideos(youtubeResponse.items);
  const ids = getVideoIds(videos);
  const youtubeViews = await loadOnlyViews(ids);
  const views = convertViews(youtubeViews.items);
  videos = addViewsToVideos(videos, views);
  return videos;
}

export { loadOnlyVideos, loadOnlyViews };
export default loadVideos;
