import { IBidOffer } from '../market';
export interface IWsBidOffer {
  s: string;
  t: string;
  bb: IBidOffer[];
  bo: IBidOffer[];
}
