import { ACCOUNT_TYPE } from 'global';

export type IGlobalDomain = {
  [acc in ACCOUNT_TYPE]: {
    defaultHomeScreenTab: string;
  };
};

const GlobalDomain: IGlobalDomain = {
  [ACCOUNT_TYPE.DEMO]: {
    defaultHomeScreenTab: 'LeaderboardTab',
  },
  [ACCOUNT_TYPE.VIRTUAL]: {
    defaultHomeScreenTab: 'Discover',
  },
  [ACCOUNT_TYPE.KIS]: {
    defaultHomeScreenTab: 'Discover',
  },
};

export default GlobalDomain;
