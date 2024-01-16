/* eslint-disable @typescript-eslint/no-explicit-any */
import { IState } from 'reduxs/global-reducers';

type JSON_TYPE = { [key: string]: any };

export type MapStateToProps<T> = T extends (...arg: any) => JSON_TYPE
  ? ReturnType<T>
  : T extends { [key: string]: (p: IState) => any }
  ? {
      [Property in keyof T]: ReturnType<T[Property]>;
    }
  : JSON_TYPE;

export type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
