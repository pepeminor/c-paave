import { IAICode } from 'interfaces/market';
import { IBotData } from 'reduxs/global-reducers/ResourceFiles';
import { AdvisorPerformance, ITopNumber } from 'screens/AIRatingScreen/constants';

export interface IAiRatingItem {
  readonly date: string;
  readonly aiRating: number;
  readonly vnIndex: number;
}

export interface IDataChart {
  dataLine: number[];
  yMax: number;
  yMin: number;
  labelList: string[];
}

export interface IInOutAIRatingParams {
  readonly top: ITopNumber;
  readonly date: string;
}

export interface IInOutAIRatingResponse {
  readonly in: string[];
  readonly out: string[];
}

export interface IGetAIRatingInOutSuccess {
  readonly data: IInOutAIRatingResponse;
  readonly top: ITopNumber;
}

export interface IAIRatingScore {
  readonly id: number;
  readonly code: string;
  readonly date: string;
  readonly techScore: number;
  readonly valuationScore: number;
  readonly overall: number;
  readonly price: number;
  readonly change: string;
  readonly created_at: Date;
  readonly updated_at: string;
  readonly gsCore: number;
  readonly rank: number;
  readonly created_by: string;
  readonly updated_by: string;
}

export interface IGetAIRatingDataSuccess {
  inOutRating: IInOutAIRatingResponse;
  dataList?: IAIRatingScore[];
  top: ITopNumber;
}

export interface IGetAIRatingDataChartSuccess {
  dataRating: IDataChart;
  dataIndex: IDataChart;
  top: ITopNumber;
}

export interface IAIRatingDataParams {
  top: ITopNumber;
  period: string;
  date?: string;
  isInit: boolean;
  isRefresh?: boolean;
  callback?: (error?: any) => void;
}

export interface IGetRoboAdvisorResponse {
  performance: {
    [s: string]: AdvisorPerformance;
  };
  dataBot: IBotData[];
}

export interface IRefreshRoboAdvisorParams {
  callback?: (error?: any) => void;
}

export interface IGetAIRatingListParams {
  readonly start: number;
  readonly limit: number;
  readonly sort: string;
  readonly date: string;
  readonly filter: IAICode | {};
  readonly top: ITopNumber;
}

export interface IGetAIRatingListSuccess {
  dataList: IAIRatingScore[];
  top: ITopNumber;
}
