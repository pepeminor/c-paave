import { NavigationState } from '@react-navigation/native';
import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import ScreenParamList from 'screens/RootNavigation/ScreenParamList';
import { navigationRef } from 'utils';

const initialState = {
  isReloading: false,
  savedRoutesForBio: [] as NavigationState<ScreenParamList>[],
  savedRoutesForPassword: [] as NavigationState<ScreenParamList>[],
};

const reloadControllerSlice = createSlice({
  name: 'reloadController',
  initialState,
  reducers: {
    reload(state) {
      const currentRoutes = (cloneDeep(navigationRef.current?.getRootState?.()?.routes) as any) ?? [];
      state.savedRoutesForBio = currentRoutes.length > 2 ? [currentRoutes[0], currentRoutes.pop()] : currentRoutes;
      state.isReloading = true;
    },
    reloadDone(state) {
      state.isReloading = false;
    },
    resetSavedRoutes(state) {
      state.savedRoutesForBio = [];
      state.savedRoutesForPassword = [];
    },
    setSavedRoutesForPassword(state) {
      const currentRoutes = (cloneDeep(navigationRef.current?.getRootState?.()?.routes) as any) ?? [];
      state.savedRoutesForPassword = currentRoutes.length > 2 ? [currentRoutes[0], currentRoutes.pop()] : currentRoutes;
    },
  },
});

export const ReloadControllerAction = reloadControllerSlice.actions;
export const ReloadControllerReducer = reloadControllerSlice.reducer;
