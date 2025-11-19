// src/services/youtubeService.ts
interface YouTubeVideoData {
    title: string;
    description: string;
    duration: string;
    views: string;
    uploadDate: string;
    thumbnail: string;
  }
  
  // Convert YouTube duration (PT1H2M3S) to readable format
  const formatDuration = (duration: string): string => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';
    
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Format view count
  const formatViewCount = (views: string): string => {
    const count = parseInt(views);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return views;
  };
  
  export const fetchYouTubeVideoData = async (videoId: string): Promise<YouTubeVideoData> => {
    try {
      // You'll need to set up a backend proxy to avoid CORS and protect your API key
      const response = await fetch(`/api/youtube/video/${videoId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch video data');
      }
      
      const data = await response.json();
      
      return {
        title: data.title,
        description: data.description,
        duration: formatDuration(data.duration),
        views: formatViewCount(data.viewCount),
        uploadDate: new Date(data.publishedAt).toISOString().split('T')[0],
        thumbnail: data.thumbnails?.maxres?.url || data.thumbnails?.standard?.url || data.thumbnails?.default?.url
      };
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      throw error;
    }
  };