export interface IRefreshTokenInvalidAction {
  version: number;
  isDemoAccount?: boolean;
  refreshToken?: string | number;
  fromBackground?: boolean;
  userLogout?: boolean;
  closeReloginModal?: boolean;
}
