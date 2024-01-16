import { ISymbolData } from 'interfaces/market';
import { Nullable } from 'interfaces/Nullable';

export interface IArrSymbolDataExtendChangePayload<T> {
  reducerKey: keyof T;
  map: { [symbolCode: string]: Nullable<ISymbolData> };
}
