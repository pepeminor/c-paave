import { DOMAIN_KIS, DOMAIN_PAAVE } from 'interfaces/apis/Domain';

export type AuthType = typeof DOMAIN_PAAVE | typeof DOMAIN_KIS;

interface IEnumAuthType {
  PAAVE: AuthType;
  KIS: AuthType;
}

export const AuthType: IEnumAuthType = {
  PAAVE: DOMAIN_PAAVE,
  KIS: DOMAIN_KIS,
};
