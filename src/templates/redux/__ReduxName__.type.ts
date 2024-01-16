/* eslint-disable @typescript-eslint/no-empty-interface */
import { ReducerStatus } from 'interfaces/reducer';

export interface ExampleRequest {}

export interface ExampleResponse {
  id: number;
  name: string;
  age?: number;
}

export interface ExampleData {}

export interface __ReduxName__State {
  __ReduxName__: {
    data: ExampleData;
    status: ReducerStatus;
  };
}
