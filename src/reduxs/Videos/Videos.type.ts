// Redux Videos Type
export type VideoConfig = {
  isLoading: boolean;
  videosList: IVideosResponse['items'];
  videosListLength: number;
  nextPageToken: string;
  totalResults: number;
  resultsPerPage: number;
  first5Videos: IVideosResponse['items'];
  firstVideo: IVideosResponse['items'][0];
};

export type VideosState = {
  [key in VideoTab]: VideoConfig;
};

export interface IVideosItem {
  id: number;
  indexAnimation: number;
}

export interface IPayloadGetVideosListRequest {
  offset?: number;
  isRefresh?: boolean;
  q?: string;
  callback?: {
    handleFail?: (error?: any) => void;
    handleSuccess?: () => void;
  };
}

export interface IPayloadGetVideosListSuccess {
  data: IVideosItem[];
  count: number;
  offset: number;
}

export interface IVideosResponse {
  storeKey: VideoTab;
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: IVideoItem[];
}

export interface IVideoItem {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    playlistId: string;
    thumbnails: {
      default: IThumbnailItem;
      medium: IThumbnailItem;
      high: IThumbnailItem;
      standard: IThumbnailItem;
      maxres: IThumbnailItem;
    };
    position: number;
    videoOwnerChannelTitle: string;
  };
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  };
}

interface IThumbnailItem {
  url: string;
  width: number;
  height: number;
}

export const VideoTab = {
  FULL_VIDEO: 'full_video',
  SHORT_VIDEO: 'short',
  EDUCATION: 'Education',
} as const;
export type VideoTab = keyof typeof VideoTab;
