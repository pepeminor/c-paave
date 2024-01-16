import { generateToolkitAction } from 'utils';
import { SearchStatusByHashtagParams } from './SocialPost.type';

export const getNewsFeedByHashtag = generateToolkitAction<SearchStatusByHashtagParams>(
  'SocialPost/getNewsFeedByHashtag'
);
