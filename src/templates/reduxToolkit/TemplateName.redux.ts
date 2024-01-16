import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IPayloadGetTemplateNameListRequest,
  IPayloadGetTemplateNameListSuccess,
  ITemplateNameItem,
} from './TemplateName.type';

const initialState = {
  templateNameList: [] as ITemplateNameItem[],
  templateNameLoading: false,
  templateNameRefreshing: false,
  templateNameTotal: 0,
};

export const TemplateNameSelectors = {
  // selectTemplateNameList: (state: IState) =>
  //   state.templateName.templateNameList || [],
};

const templateNameSlice = createSlice({
  initialState,
  name: 'TemplateName',
  reducers: {
    getTemplateNameListRequest(state, action: PayloadAction<IPayloadGetTemplateNameListRequest>) {
      const { isRefresh } = action.payload;
      state.templateNameLoading = !isRefresh;
      state.templateNameRefreshing = !!isRefresh;
    },
    getTemplateNameListSuccess(state, action: PayloadAction<IPayloadGetTemplateNameListSuccess>) {
      const { count, data, offset } = action.payload;
      state.templateNameLoading = false;
      state.templateNameRefreshing = false;
      state.templateNameTotal = count;
      state.templateNameList = offset > 0 ? state.templateNameList.concat(data) : data;
    },
    getTemplateNameListFailure(state) {
      state.templateNameLoading = false;
      state.templateNameRefreshing = false;
    },
  },
});

export const TemplateNameActions = templateNameSlice.actions;
export const TemplateNameReducer = templateNameSlice.reducer;
