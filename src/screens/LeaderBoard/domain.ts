import { ACCOUNT_TYPE } from 'global';

type IDomain = {
  [acc in ACCOUNT_TYPE]: {
    goToUserWallScreen: boolean;
  };
};

const Domain: IDomain = {
  [ACCOUNT_TYPE.DEMO]: {
    goToUserWallScreen: false,
  },
  [ACCOUNT_TYPE.VIRTUAL]: {
    goToUserWallScreen: true,
  },
  [ACCOUNT_TYPE.KIS]: {
    goToUserWallScreen: true,
  },
};

export default Domain;
