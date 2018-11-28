function getVideoIds(videos) {
  const stringIds = videos.reduce((accumulator, video) => `${accumulator},${String(video.id)}`, '');
  return stringIds.slice(1);
}

function getLinkToVideo(videoId) {
  return `https://youtube.com/watch?v=${videoId}`;
}

function convertVideos(youtubeVideos) {
  return youtubeVideos.map((video) => {
    const { snippet } = video;
    const { videoId } = video.id;
    return {
      id: videoId,
      link: getLinkToVideo(videoId),
      title: snippet.title,
      preview: snippet.thumbnails.medium.url,
      author: snippet.channelTitle,
      date: snippet.publishedAt,
      views: 0,
      description: snippet.description,
    };
  });
}

function convertViews(youtubeViews) {
  return youtubeViews.map(view => view.statistics.viewCount);
}

function addViewsToVideos(videos, views) {
  if (videos.length !== views.length) {
    throw new Error(`expected videos length (${videos.length}) to match views length(${views.length})`);
  }
  return videos.map((video, index) => {
    const newVideo = video;
    newVideo.views = views[index];
    return video;
  });
}

export {
  getVideoIds,
  convertVideos,
  addViewsToVideos,
  convertViews,
  getLinkToVideo,
};
