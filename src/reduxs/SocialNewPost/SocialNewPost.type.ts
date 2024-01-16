import { PostType } from 'constants/enum';
import { LANG } from 'global';

export type SocialNewPostState = {
  extraData: ExtraData;
  images: PickedImage[] | undefined;

  isSuccess: boolean;
  addStringTrigger?: {
    value: string;
  };
  initData?: SocialEditPostState;
};

export type ExtraData = 'image' | 'poll' | 'emoji' | undefined;

type PollData = {
  options: string[];
  expires_in?: number; // seconds
  multiple?: boolean; // default false
  hide_results?: boolean; // default false
};

export type NewPostParams = {
  status: string;
  media_ids?: string[];
  visibility: PostType;
  language: LANG;
  poll?: PollData;
  in_reply_to_id?: string;
};

export type PickedImage = {
  id?: string;
  uri?: string;
  description?: string;
  fileName?: string;
  type?: string;
};

export const SOCIAL_MAX_UPLOAD_IMAGES = 4;

export type SocialEditPostState = {
  statusID: string;
  images: PickedImage[];
  poll?: PollData;
  content: string;
};

export type EditPostParams = {
  statusID: string;
  status: string;
  poll?: PollData;
  media_ids?: string[];
  isComment?: boolean;
};

export type DeletePostParams = {
  params: {
    statusID: string;
  };
  isComment?: boolean;
  postParentId?: string;
};
