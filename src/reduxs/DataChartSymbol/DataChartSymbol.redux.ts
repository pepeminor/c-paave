import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDataIndex, IGetChartDataRequest, IGetChartDataSuccess } from './DataChartSymbol.type';
import { isNotNil } from 'ramda-adjunct';
import { merge } from 'lodash';
import { IState } from 'reduxs/global-reducers';
import { ReducerStatus } from 'interfaces/reducer';
import { PersistConfig, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  dataChart: {} as IDataIndex,
};

export const DataChartSymbolSelectors = {
  selectDataChart: (symbolCode: string, resolution: string) => (state: IState) => {
    return state.DataChartSymbolReducer.dataChart?.[symbolCode]?.[resolution];
  },
};

const dataChartSymbolSlice = createSlice({
  initialState,
  name: 'DataChartSymbol',
  reducers: {
    getDataChartSymbol: (state, action: PayloadAction<IGetChartDataRequest>) => {
      const { dataChart } = state;
      const { symbol, resolution } = action.payload;

      state.dataChart = {
        ...dataChart,
        [symbol]: {
          ...dataChart[symbol],
          [resolution]: {
            dataPoint: [],
            maxValue: 0,
            minValue: 0,
            status: ReducerStatus.LOADING,
          },
        },
      };
    },
    getChartDataSuccess(state, action: PayloadAction<IGetChartDataSuccess>) {
      const { dataChart } = state;
      const { symbolCode, resolution, dataPoint } = action.payload;

      state.dataChart = {
        ...dataChart,
        [symbolCode]: {
          ...dataChart[symbolCode],
          [resolution]: {
            dataPoint,
            maxValue: Math.max(...dataPoint),
            minValue: Math.min(...dataPoint),
            status: ReducerStatus.SUCCESS,
          },
        },
      };
    },
    insertDataChart: (state, action: PayloadAction<{ symbolCode: string; dataPoint: number; resolution: string }>) => {
      const { symbolCode, dataPoint, resolution } = action.payload;
      const dataChartSymbol = state.dataChart[symbolCode];
      const newDataPoint = [...(dataChartSymbol?.[resolution]?.dataPoint ?? []), dataPoint];
      const maxValue = Math.max(dataChartSymbol?.[resolution].maxValue, dataPoint);
      const minValue = Math.min(dataChartSymbol?.[resolution].minValue, dataPoint);
      if (isNotNil(dataChartSymbol)) {
        state.dataChart[symbolCode] = merge(dataChartSymbol, {
          [resolution]: {
            dataPoint: newDataPoint,
            maxValue,
            minValue,
          },
        });
      }
    },
    updateLastPointDataChart: (
      state,
      action: PayloadAction<{ symbolCode: string; lastPoint: number; resolution: string }>
    ) => {
      const { symbolCode, lastPoint, resolution } = action.payload;

      const dataChart = state.dataChart[symbolCode];
      const dataResolution = dataChart?.[resolution];
      if (
        isNotNil(dataResolution) &&
        isNotNil(lastPoint) &&
        dataResolution?.dataPoint[dataResolution?.dataPoint.length - 1] !== lastPoint
      ) {
        dataResolution.dataPoint[dataResolution.dataPoint.length - 1] = lastPoint;
        if (dataResolution.maxValue < lastPoint && lastPoint !== 0) {
          dataResolution.maxValue = lastPoint;
        }

        if (dataResolution.minValue > lastPoint && lastPoint !== 0) {
          dataResolution.minValue = lastPoint;
        }

        state.dataChart[symbolCode] = merge(dataChart, {
          [resolution]: {
            ...dataResolution,
          },
        });
      }
    },
  },
});

const persistConfig: PersistConfig<ReturnType<typeof dataChartSymbolSlice.reducer>> = {
  key: 'Authentication',
  storage: AsyncStorage,
  whitelist: ['dataChart'],
};

export const DataChartSymbolActions = dataChartSymbolSlice.actions;
export const DataChartSymbolReducer = persistReducer(persistConfig, dataChartSymbolSlice.reducer);
