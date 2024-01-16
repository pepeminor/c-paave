/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISelector, ToolkitAction } from 'interfaces/common';
import { ReducerStatus } from 'interfaces/reducer';
import { ExampleRequest, ExampleData, __ReduxName__State } from '.';
import * as __ReduxName__CustomActions from './__ReduxName__.action';

const initialState: __ReduxName__State = {
  __ReduxName__: {
    data: {},
    status: ReducerStatus.LOADING,
  },
};

export const __ReduxName__Selectors: ISelector = {
  selectActiveOrder: state => state.ActiveOrder,
};

const __ReduxName__Slice = createSlice({
  name: '__ReduxName__',
  initialState,
  reducers: {
    __ReduxName__Request(state, _action: PayloadAction<ExampleRequest>) {
      state.__ReduxName__ = initialState.__ReduxName__;
    },
    __ReduxName__Success(state, action: PayloadAction<ExampleData>) {
      state.__ReduxName__.data = action.payload;
      state.__ReduxName__.status = ReducerStatus.SUCCESS;
    },
    __ReduxName__Failed(state) {
      state.__ReduxName__.data = {};
      state.__ReduxName__.status = ReducerStatus.FAILED;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      __ReduxName__CustomActions.__reduxName__Action.pending,
      (state, _action: ToolkitAction<ExampleRequest>) => {
        state.__ReduxName__ = initialState.__ReduxName__;
      }
    );
    builder.addCase(
      __ReduxName__CustomActions.__reduxName__Action.fulfilled,
      (state, action: PayloadAction<ExampleData>) => {
        state.__ReduxName__.data = action.payload;
        state.__ReduxName__.status = ReducerStatus.SUCCESS;
      }
    );
    builder.addCase(__ReduxName__CustomActions.__reduxName__Action.rejected, state => {
      state.__ReduxName__.data = {};
      state.__ReduxName__.status = ReducerStatus.FAILED;
    });
  },
});

export const __ReduxName__Actions = { ...__ReduxName__Slice.actions, ...__ReduxName__CustomActions };
export const __ReduxName__Reducer = __ReduxName__Slice.reducer;
