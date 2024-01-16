import { PostType } from 'constants/enum';
import { formatPoll, formatPostById } from './SocialPost.helper';
import { LANG } from 'global';

export interface IPayloadVotePollRequest {
  params: {
    pollId: string;
    choices: number[];
  };
  postId: string;
  callback?: (err?: any) => void;
}

export interface IPayloadVotePollSuccess {
  dataPoll: IPoll;
  postId: string;
}
export interface IPayloadGetSocialPostListRequest {
  params: {
    limit?: number;
    since_id?: string;
    max_id?: string;
    isRefresh?: boolean;
  };

  callback?: (error: any) => void;
}
export interface IPayloadGetSocialCommentsPostListRequest {
  postId: string;
  isRefresh?: boolean;
  callback?: (err?: any) => void;
}

export interface IPayloadGetSocialCommentsPostListSuccess {
  data: IListId[];
  postId: string;
  isRefresh?: boolean;
}

export interface IPayloadGetSocialPostListSuccess {
  data: IListId[];
  originalList: IListId[];
  isRefresh: boolean;
}

export interface IPayloadCreatePostRequest {
  params: {
    status: string;
    media_ids?: string[];
    in_reply_to_id?: string;
    visibility: PostType;
    language: LANG;
  };
  callback?: (error?: any) => void;
}

export interface IPayloadGetLikedListRequest {
  params: {
    limit?: number;
    since_id?: string;
    max_id?: string;
    postId: string;
    isRefresh?: boolean;
  };

  callback?: (error: any) => void;
}

export interface IPayloadGetLikedListSuccess {
  data: IAccountData[];
}

export interface IPostCoreData {
  id: string;
  account: IAccountCore;
  content: string;
  created_at: string;
  favourited: boolean;
  favourites_count: number;
  visibility: string;
  bookmarked: boolean;
  in_reply_to_account_id: string;
  in_reply_to_id: string;
  media_attachments: IMediaPCore[];
  reblogged: boolean;
  reblogs_count: number;
  replies_count: number;
  language: string;
  spoiler_text: string;
  poll?: IPollCore;
  mentions: IMention[];
  tags: ITag[];
  error?: string;
}

export interface IAccountCore {
  id: string;
  acct: string;
  avatar: string;
  avatar_static: string;
  bot: boolean;
  created_at: string;
  display_name: string;
  username: string;
  locked: boolean;
  statuses_count: number;
}

export type IAccountData = ReturnType<typeof formatPostById>['account'];
export type IMediaData = ReturnType<typeof formatPostById>['medias'];
export type IPoll = ReturnType<typeof formatPoll>;
export interface IMediaPCore {
  id: string;
  url: string;
  meta: {
    original: {
      width: number;
      height: number;
      aspect: number;
    };
  };
  description: string;
}

export interface IObjectPost {
  [postId: string]: ISocialPostItem;
}

export type ISocialPostItem = ReturnType<typeof formatPostById>;

export interface IListId {
  id: string;
  indexAnimation: number;
  inReplyToId: string;
}

export interface IGetCommentsPostResponse {
  data: {
    ancestors: IPostCoreData[];
    descendants: IPostCoreData[];
    error?: string;
  };
}

export interface IImage {
  id: string;
  url: string;
  meta: {
    original: {
      width: number;
      height: number;
      aspect: number;
    };
  };
  description: string;
}

export interface IPollCore {
  id: string;
  expires_at: string;
  expired: boolean;
  multiple: boolean;
  votes_count: number;
  voters_count: number;
  voted: boolean;
  own_votes: number[];
  options: {
    title: string;
    votes_count: number;
  }[];
  emojis: [];
}

export interface IMention {
  id: string;
  username: string;
  url: string;
  acct: string;
}

export interface ITag {
  name: string;
  url: string;
}

export type SearchStatusByHashtagParams = {
  hashtag: string;
  limit?: number;
  since_id?: string;
  max_id?: string;
  isRefresh?: boolean;
};
