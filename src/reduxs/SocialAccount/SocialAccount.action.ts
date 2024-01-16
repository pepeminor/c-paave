import { generateToolkitAction } from 'utils';
import {
  BlockUserParams,
  ReportUserParams,
  SocialSearchParams,
  UpdateSocialAccountInfoParams,
} from './SocialAccount.type';

export const getSocialAccountInfo = generateToolkitAction('SocialAccount/getSocialAccountInfo');

export const updateSocialAccountInfo = generateToolkitAction<UpdateSocialAccountInfoParams>(
  'SocialAccount/updateSocialAccountInfo'
);

export const socialSearch = generateToolkitAction<SocialSearchParams>('SocialAccount/search');

export const blockUser = generateToolkitAction<BlockUserParams>('SocialAccount/blockUser');

export const reportUser = generateToolkitAction<ReportUserParams>('SocialAccount/reportUser');
