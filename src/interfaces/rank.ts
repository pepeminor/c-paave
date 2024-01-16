import { IndexRankType } from 'constants/enum';

export interface IIndexRanks {
  stockCode: string;
  rank: number;
}

export interface IIndexRankParams {
  index: string;
  type: IndexRankType;
}

export interface IIndexRankResponse {
  indexRanks: IIndexRanks[];
}
