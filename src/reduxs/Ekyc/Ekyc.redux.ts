import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDataEkyc, IDataEkycParams } from './Ekyc.type';
import { merge } from 'lodash';
import { IState } from 'reduxs/global-reducers';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { PersistConfig, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  data: {} as IDataEkyc,
  stepCurrent: 'KisEKYCStep1TypeOfInvestor' as ScreenNames,
  isEKYC: false,
};

export const EkycSelectors = {
  selectEkycData: (state: IState) => state.EkycReducer.data.ekycSdkData,
  selectValidateField: (state: IState) => state.EkycReducer.data.validateField,
  selectDataEkyc: (state: IState) => state.EkycReducer.data,
  selectIdentifierId: (state: IState) => state.EkycReducer.data.identifierId,
  selectIsEKYC: (state: IState) => state.EkycReducer.isEKYC,
  selectStepCurrent: (state: IState) => state.EkycReducer.stepCurrent,
};

const ekycSlice = createSlice({
  initialState,
  name: 'Ekyc',
  reducers: {
    saveDataEkycStep(state, action: PayloadAction<{ data: IDataEkycParams; step: ScreenNames }>) {
      const { data: dataEkyc } = state;
      state.data = merge(dataEkyc, action.payload.data);
      state.stepCurrent = action.payload.step;
      state.isEKYC = true;
    },
    clearDataEkycStep(state) {
      state.data = initialState.data;
      state.isEKYC = false;
      state.stepCurrent = initialState.stepCurrent;
    },
  },
});

const persistConfig: PersistConfig<ReturnType<typeof ekycSlice.reducer>> = {
  key: 'Authentication',
  storage: AsyncStorage,
  whitelist: ['data', 'stepCurrent', 'isEKYC'],
};

export const EkycActions = ekycSlice.actions;
export const EkycReducer = persistReducer(persistConfig, ekycSlice.reducer);
