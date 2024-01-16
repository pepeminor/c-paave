import { watchBlockUser } from './sagas/BlockUser';
import { watchGetSocialAccountInfo } from './sagas/GetSocialAccountInfo';
import { watchGetSocialAccountInfoById } from './sagas/GetSocialAccountInfoById';
import { watchReportUser } from './sagas/ReportUser';
import { watchSocialSearch } from './sagas/SocialSearch';
import { watchUpdateSocialAccountInfo } from './sagas/UpdateSocialAccountInfo';

export const SocialAccountSagas = {
  watchGetSocialAccountInfo,
  watchUpdateSocialAccountInfo,
  watchSocialSearch,
  watchBlockUser,
  watchReportUser,
  watchGetSocialAccountInfoById,
};
