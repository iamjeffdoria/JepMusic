const YT_API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY as string;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const searchSongs = async (query: string) => {
  const params = new URLSearchParams({
    part: "snippet",
    q: query,
    type: "video",
    videoCategoryId: "10", // Music category
    maxResults: "20",
    key: YT_API_KEY,
  });

  const response = await fetch(`${BASE_URL}/search?${params.toString()}`);
  if (!response.ok) throw new Error(`YouTube search failed (${response.status})`);

  const data = await response.json();
  return data.items
    .filter((item: any) => item.id?.videoId)
    .map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      uploaderName: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails?.high?.url ?? item.snippet.thumbnails?.default?.url,
    }));
};