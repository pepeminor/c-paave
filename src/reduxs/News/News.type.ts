export const PAGE_SIZE_NEWS = 20;

export interface IGetNewsRequest {
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
  isRefresh?: boolean;
  callback?: (err?: any) => void;
}

export interface INews {
  newsId: number;
  publishDate: string;
  title: string;
  content: string;
  url: string;
  imgUrl: string;
  pinned: boolean;
  socialNewsId: string;
  hashtags: string[];
}

export interface IGetNewsResponse {
  latestNews: INews[];
}

export interface IGetNewsSuccess {
  listNewsJson: IListNewsJson;
  listNewsPinned: number[];
  listNewsNotPinned: number[];
  listNews: number[];
  isRefresh: boolean;
}

export interface IListNewsJson {
  [key: number]: INews;
}
