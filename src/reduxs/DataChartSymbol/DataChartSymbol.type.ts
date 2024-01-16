import { ReducerStatus } from 'interfaces/reducer';

export interface IGetChartDataRequest {
  symbol: string;
  resolution: string;
  ignoreLunchTime: boolean;
  callback?: (error?: any) => void;
}

export interface IGetChartDataResponse {
  data: {
    c: number[];
    t: number[];
    o: number[];
  };
}

export interface IGetChartDataSuccess {
  symbolCode: string;
  dataPoint: number[];
  resolution: string;
}

export interface IDataIndex {
  [s: string]: {
    [resolution: string]: {
      dataPoint: number[];
      maxValue: number;
      minValue: number;
      status: ReducerStatus;
    };
  };
}
