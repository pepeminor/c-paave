import { IAccountData, IPostCoreData } from 'reduxs/SocialPost';

export type SocialAccountState = {
  info?: SocialInfoResponse;
  userJson: { [key: string]: IAccountData };
};

export type SocialInfoResponse = {
  id: string;
  username: string;
  acct: string;
  display_name: string;
  locked: boolean;
  bot: boolean;
  // discoverable?: string;
  // group: boolean;
  created_at: string; // Ex: '2023-10-02T00:00:00.000Z'
  note?: string;
  url: string;
  avatar: string;
  avatar_static: string;
  // header: string;
  // header_static: string;
  followers_count: number;
  following_count: number;
  statuses_count: number;
  // last_status_at: string; // Ex: '2023-10-18'
  // noindex: boolean;
  // source: {
  //   privacy: string;
  //   sensitive: boolean;
  //   language: string;
  //   note: string | null;
  //   fields: [];
  //   follow_requests_count: number;
  // };
  // emojis: [];
  // fields: [];
  // role: {
  //   id: string;
  //   name: string | null;
  //   permissions: string;
  //   color: string | null;
  //   highlighted: boolean;
  // };
  error?: string;
};

export type SocialSearchType = 'accounts' | 'hashtags' | 'statuses';
export type SocialSearchParams = {
  q: string;
  type?: SocialSearchType;
  // following?: boolean;
  // max_id?: string;
  // min_id?: string;
  limit?: number; // default 20, max 40
  offset?: number;
};

type AccountResponse = SocialInfoResponse;
export type HashTagResponse = {
  name: string;
  url: string;
  history: [
    {
      day: string; // Ex: 1697673600
      accounts: string;
      uses: string;
    }
  ];
  following: boolean;
  count: number; // Calculated in saga
};
type StatusResponse = IPostCoreData;
export type SocialSearchResponse = {
  accounts: AccountResponse[];
  hashtags: HashTagResponse[];
  statuses: StatusResponse[];
};

export type BlockUserParams = {
  account_id: string;
};

export type BlockUserResponse = {
  id: string;
};

export type ReportUserParams = {
  account_id: string;
  comment?: string;
};

export type ReportUserResponse = {
  target_account: SocialInfoResponse;
};

export type UpdateSocialAccountInfoParams = {
  display_name?: string;
  avatar?: {
    name: string | undefined;
    uri: string | undefined;
    type: string | undefined;
  };
};
