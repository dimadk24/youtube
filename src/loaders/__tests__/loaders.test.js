import { loadOnlyVideos, loadOnlyViews } from '../loaders';

const nextPageToken = 'qwerty';

const toJson = jest.fn(() => {
  const response = { message: 'test response', nextPageToken };
  return response;
});
window.fetch = jest.fn(() => {
  const response = { json: toJson };
  return response;
});

describe('loadOnlyViews', () => {
  it('should call fetch with passed ids', async () => {
    const ids = '1,2,3,4';
    await loadOnlyViews(ids);
    expect(window.fetch).toBeCalled();
    expect(window.fetch.mock.calls[0][0]).toContain(ids);
  });

  it('should convert response to json', async () => {
    await loadOnlyViews('12,3,4');
    expect(toJson).toBeCalled();
  });
});

describe('loadOnlyVideos', () => {
  it('should call fetch with passed query', async () => {
    window.fetch.mockClear();
    const query = 'test query';
    await loadOnlyVideos(query);
    expect(window.fetch).toBeCalled();
    expect(window.fetch.mock.calls[0][0]).toContain(query);
  });

  it('should save and pass nextPageToken on next calls', async () => {
    window.fetch.mockClear();
    const query = 'test query';
    await loadOnlyVideos(query);
    expect(window.fetch.mock.calls[0][0]).toContain(nextPageToken);
  });
});
