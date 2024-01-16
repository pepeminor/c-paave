export enum ReducerStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface ILoadingReducer<T> {
  data: T;
  status: ReducerStatus;
}

export interface LoadingReducer<T> {
  data: T;
  status: keyof typeof ReducerStatus;
}

export interface ILoadingReducerWithPreData<T> {
  data: T;
  status: ReducerStatus;
  previous: T;
}
