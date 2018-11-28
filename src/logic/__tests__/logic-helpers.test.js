import {
  addViewsToVideos,
  convertVideos,
  convertViews,
  getLinkToVideo,
  getVideoIds,
} from '../logic-helpers';

describe('getVideoIds', () => {
  it('should get video ids 1', () => {
    const videos = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ];
    const ids = getVideoIds(videos);
    expect(ids).toBe('1,2,3,4,5');
  });

  it('should get video ids 2', () => {
    const videos = [
      { id: 100 },
      { id: 50 },
      { id: 15 },
      { id: 1000 },
    ];
    const ids = getVideoIds(videos);
    expect(ids).toBe('100,50,15,1000');
  });

  it('should get 0 videos ids', () => {
    const videos = [];
    const ids = getVideoIds(videos);
    expect(ids).toBe('');
  });

  it('should get 1 video id', () => {
    const videos = [
      { id: 1 },
    ];
    const ids = getVideoIds(videos);
    expect(ids).toBe('1');
  });
});

describe('getLinkToVideo', () => {
  it('should return link to video with passed id 1', () => {
    const id = 'ew8fqvr4';
    const link = getLinkToVideo(id);
    expect(link).toBe('https://youtube.com/watch?v=ew8fqvr4');
  });

  it('should return link to video with passed id 2', () => {
    const id = 'eihw75';
    const link = getLinkToVideo(id);
    expect(link).toBe('https://youtube.com/watch?v=eihw75');
  });
});

const youtubeVideo1 = {
  etag: 'XI7nbFXulYBIpL0ayR_gDh3eu1k/zxh4DMbo6RRvTNpGBQCBpzoY11U',
  id: {
    kind: 'youtube#video',
    videoId: 'DXUAyRRkI6k',
  },
  kind: 'youtube#searchResult',
  snippet: {
    channelId: 'UCVUdHi-tdW5AKdzMiTPG97Q',
    channelTitle: 'funnyplox',
    description: 'Here is a video of cats',
    liveBroadcastContent: 'none',
    publishedAt: '2013-11-09T22:11:37.000Z',
    thumbnails: {
      default: {
        height: 90,
        url: 'https://i.ytimg.com/vi/DXUAyRRkI6k/default.jpg',
        width: 120,
      },
      high: {
        height: 360,
        url: 'https://i.ytimg.com/vi/DXUAyRRkI6k/hqdefault.jpg',
        width: 480,
      },
      medium: {
        height: 180,
        url: 'https://i.ytimg.com/vi/DXUAyRRkI6k/mqdefault.jpg',
        width: 320,
      },
    },
    title: 'title 1',
  },
};
const youtubeVideo2 = {
  etag: 'XI7nbFXulYBIpL0ayR_gDu1k/zxh4DMbo6RRvTNpGBQCBpzoY11U',
  id: {
    kind: 'youtube#video',
    videoId: 'Dgh1ykhkI6y',
  },
  kind: 'youtube#searchResult',
  snippet: {
    channelId: 'UCVUdHi-tdW5AKdzMiTPG97Q',
    channelTitle: 'coolcats',
    description: 'a video of completely another cats',
    liveBroadcastContent: 'none',
    publishedAt: '2017-01-09T22:15:37.000Z',
    thumbnails: {
      default: {
        height: 90,
        url: 'https://i.ytimg.com/vi/Dgh1ykhkI6y/default.jpg',
        width: 120,
      },
      high: {
        height: 360,
        url: 'https://i.ytimg.com/vi/Dgh1ykhkI6y/hqdefault.jpg',
        width: 480,
      },
      medium: {
        height: 180,
        url: 'https://i.ytimg.com/vi/Dgh1ykhkI6y/mqdefault.jpg',
        width: 320,
      },
    },
    title: 'Funny Cats and Kittens Meowing Compilation',
  },
};

const video1 = {
  id: 'DXUAyRRkI6k',
  link: 'https://youtube.com/watch?v=DXUAyRRkI6k',
  title: 'title 1',
  preview: 'https://i.ytimg.com/vi/DXUAyRRkI6k/mqdefault.jpg',
  author: 'funnyplox',
  date: '2013-11-09T22:11:37.000Z',
  views: 0,
  description: 'Here is a video of cats',
};

const video2 = {
  id: 'Dgh1ykhkI6y',
  link: 'https://youtube.com/watch?v=Dgh1ykhkI6y',
  title: 'Funny Cats and Kittens Meowing Compilation',
  preview: 'https://i.ytimg.com/vi/Dgh1ykhkI6y/mqdefault.jpg',
  author: 'coolcats',
  date: '2017-01-09T22:15:37.000Z',
  views: 0,
  description: 'a video of completely another cats',
};


describe('convertVideos', () => {
  it('should convert 1st video', () => {
    const actual = convertVideos([youtubeVideo1]);
    expect(actual).toEqual([video1]);
  });

  it('should convert 2nd video', () => {
    const actual = convertVideos([youtubeVideo2]);
    expect(actual).toEqual([video2]);
  });

  it('should convert both videos', () => {
    const actual = convertVideos([youtubeVideo1, youtubeVideo2]);
    expect(actual).toEqual([video1, video2]);
  });
});

const youtubeView1 = {
  etag: 'XI7nbFXulYBIpL0ayR_gDh3eu1k/vkW1cKMwmG9EWBYEleiwQ1t3bQo',
  id: 'DXUAyRRkI6k',
  kind: 'youtube#video',
  statistics: {
    commentCount: '13656',
    dislikeCount: '96312',
    favoriteCount: '0',
    likeCount: '259018',
    viewCount: '105292566',
  },
};

const youtubeView2 = {
  etag: 'XI7nbFXulYBIpL0ayR_gDh3eu1k/LdGVO5w-9vhV8cROIvC4O1JxpaA',
  id: 'EccgSe5FLKM',
  kind: 'youtube#video',
  statistics: {
    viewCount: '139753',
    likeCount: '989',
    dislikeCount: '203',
    favoriteCount: '0',
    commentCount: '123',
  },
};

const view1 = '105292566';
const view2 = '139753';

describe('convertViews', () => {
  it('should convert 1st view', () => {
    const actual = convertViews([youtubeView1]);
    expect(actual).toEqual([view1]);
  });

  it('should convert 2nd view', () => {
    const actual = convertViews([youtubeView2]);
    expect(actual).toEqual([view2]);
  });

  it('should convert both views', () => {
    const actual = convertViews([youtubeView1, youtubeView2]);
    expect(actual).toEqual([view1, view2]);
  });
});

const videoWithView1 = {
  id: 'DXUAyRRkI6k',
  link: 'https://youtube.com/watch?v=DXUAyRRkI6k',
  title: 'title 1',
  preview: 'https://i.ytimg.com/vi/DXUAyRRkI6k/mqdefault.jpg',
  author: 'funnyplox',
  date: '2013-11-09T22:11:37.000Z',
  views: '105292566',
  description: 'Here is a video of cats',
};

const videoWithView2 = {
  id: 'Dgh1ykhkI6y',
  link: 'https://youtube.com/watch?v=Dgh1ykhkI6y',
  title: 'Funny Cats and Kittens Meowing Compilation',
  preview: 'https://i.ytimg.com/vi/Dgh1ykhkI6y/mqdefault.jpg',
  author: 'coolcats',
  date: '2017-01-09T22:15:37.000Z',
  views: '139753',
  description: 'a video of completely another cats',
};

describe('addViewsToVideos', () => {
  it('should add 1st view to 1st video', () => {
    const videosWithViews = addViewsToVideos([video1], [view1]);
    const expected = [videoWithView1];
    expect(videosWithViews).toEqual(expected);
  });

  it('should add 2nd view to 2nd video', () => {
    const videosWithViews = addViewsToVideos([video2], [view2]);
    const expected = [videoWithView2];
    expect(videosWithViews).toEqual(expected);
  });

  it('should add both views to both videos', () => {
    const videosWithViews = addViewsToVideos([video1, video2], [view1, view2]);
    expect(videosWithViews).toEqual([videoWithView1, videoWithView2]);
  });

  it('should throw meaningful error if views.length !== videos.length', () => {
    expect(() => addViewsToVideos([video1], [view2, view1])).toThrow(/1.*2/);
  });
});
