import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PickedImage, SOCIAL_MAX_UPLOAD_IMAGES, SocialNewPostState } from './SocialNewPost.type';
import * as SocialNewPostCustomActions from './SocialNewPost.action';
import { cloneDeep } from 'lodash';

const initialState: SocialNewPostState = {
  extraData: undefined,
  images: undefined,

  isSuccess: false,
  addStringTrigger: undefined,
  initData: undefined,
};

const socialNewPostSlice = createSlice({
  initialState,
  name: 'SocialNewPost',
  reducers: {
    setExtraData(state, action: PayloadAction<SocialNewPostState['extraData']>) {
      state.extraData = action.payload;
    },
    setImages(state, action: PayloadAction<PickedImage[]>) {
      if (state.images == null) {
        state.images = action.payload;
        return;
      }
      state.images = [...state.images, ...action.payload].slice(0, SOCIAL_MAX_UPLOAD_IMAGES);
    },
    removeImage(state, action: PayloadAction<PickedImage>) {
      if (state.images == null) {
        return;
      }
      state.images = state.images.filter(item => item.uri !== action.payload.uri);
    },
    setDescription(state, action: PayloadAction<{ asset: PickedImage; description: string }>) {
      if (state.images == null) {
        return;
      }
      state.images = state.images.map(item => {
        if (item.uri === action.payload.asset.uri) {
          return { ...item, description: action.payload.description };
        }
        return item;
      });
    },
    setInitData(state, action: PayloadAction<SocialNewPostState['initData']>) {
      state.initData = action.payload;
      if (action.payload?.poll != null) {
        state.extraData = 'poll';
      }
      if (action.payload?.images.length != null && action.payload?.images.length > 0) {
        state.extraData = 'image';
        state.images = action.payload?.images;
      }
    },
    reset(state) {
      state.extraData = undefined;
      state.images = undefined;
      state.initData = undefined;
      state.addStringTrigger = undefined;
    },
    updateSuccess(state, action: PayloadAction<boolean>) {
      state.isSuccess = action.payload;
    },
    addStringTrigger(state, action: PayloadAction<string>) {
      state.addStringTrigger = cloneDeep({
        value: action.payload,
      });
    },
  },
});

export const SocialNewPostActions = { ...socialNewPostSlice.actions, ...SocialNewPostCustomActions };
export const SocialNewPostReducer = socialNewPostSlice.reducer;
