import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IListId,
  IObjectPost,
  IPayloadCreatePostRequest,
  IPayloadGetSocialCommentsPostListRequest,
  IPayloadGetSocialCommentsPostListSuccess,
  IPayloadGetSocialPostListRequest,
  IPayloadGetSocialPostListSuccess,
  IPayloadVotePollRequest,
  IPayloadVotePollSuccess,
  IAccountData,
  IPayloadGetLikedListRequest,
  IPayloadGetLikedListSuccess,
} from './SocialPost.type';
import { IState } from 'reduxs/global-reducers';
import { mergeDeepRight } from 'ramda';
import { PersistConfig, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIGNOUT } from 'reduxs/actions';
import { PreviewData } from 'components/LinkPreview/types';
import * as SocialPostCustomAction from './SocialPost.action';

const initialState = {
  socialPostList: [] as IListId[],
  socialPostLoading: false,
  socialPostRefreshing: false,
  socialPostTotal: 0,
  postJson: {} as IObjectPost,
  previewLinkJson: {} as { [key: string]: PreviewData },

  commentsLoading: false,
  commentsRefreshing: false,

  limitSocial: true,
  showModalIntroduce: true,
  likedList: [] as IAccountData[],
  likedLoading: false,
};

export const SocialPostSelectors = {
  selectSocialPostList: (state: IState) => state.SocialPostReducer.socialPostList || [],
  selectSocialLoading: (state: IState) => state.SocialPostReducer.socialPostLoading,
  selectDataPost: (postId: string) => (state: IState) => state.SocialPostReducer.postJson?.[postId] || {},
  selectPostAccountId: (postId: string) => (state: IState) =>
    state.SocialPostReducer.postJson?.[postId].account.id ?? '',
  selectCommentsPost: (postId: string) => (state: IState) =>
    state.SocialPostReducer.postJson?.[postId]?.commentsList || [],
  selectSocialPostRefreshing: (state: IState) => state.SocialPostReducer.socialPostRefreshing,
  selectLimitSocial: (state: IState) => state.SocialPostReducer.limitSocial,
  selectShowModalIntroduce: (state: IState) => state.SocialPostReducer.showModalIntroduce,
  selectLoadingComments: (state: IState) => state.SocialPostReducer.commentsLoading,
  selectIsOwner: (postId: string) => (state: IState) =>
    state.SocialPostReducer.postJson?.[postId]?.account.id === state.SocialAccount.info?.id,
  selectPreviewLink: (postId: string) => (state: IState) => state.SocialPostReducer.previewLinkJson?.[postId] ?? {},
  selectHasPost: (postId: string) => (state: IState) => !!state.SocialPostReducer.postJson?.[postId],
  selectLikedList: (state: IState) => state.SocialPostReducer.likedList,
  selectLikedLoading: (state: IState) => state.SocialPostReducer.likedLoading,
};

const socialPostSlice = createSlice({
  initialState,
  name: 'SocialPost',
  reducers: {
    getSocialPostListRequest(state, action: PayloadAction<IPayloadGetSocialPostListRequest>) {
      const { isRefresh } = action.payload.params;
      state.socialPostLoading = !isRefresh;
      state.socialPostRefreshing = !!isRefresh;
    },
    getSocialPostListSuccess(state, action: PayloadAction<IPayloadGetSocialPostListSuccess>) {
      const { data, isRefresh } = action.payload;
      const oldList = state.socialPostList;
      state.socialPostLoading = false;
      state.socialPostRefreshing = false;
      state.socialPostList = isRefresh ? data : [...oldList, ...data];
    },
    getSocialPostListFailure(state) {
      state.socialPostLoading = false;
      state.socialPostRefreshing = false;
    },
    importDataPostJson(state, action: PayloadAction<IObjectPost>) {
      state.postJson = mergeDeepRight(state.postJson, action.payload) as any;
    },
    favouritesPost(state, action: PayloadAction<{ postId: string }>) {
      const postId = action.payload.postId;
      const post = state.postJson[postId];
      if (post) {
        post.favouritesCount += !post.favourited ? 1 : -1;
        post.favourited = !post.favourited;
      }
    },
    favouritesPostFailed(state, action: PayloadAction<{ postId: string }>) {
      const postId = action.payload.postId;
      const post = state.postJson[postId];
      if (post) {
        post.favouritesCount += !post.favourited ? 1 : -1;
        post.favourited = !post.favourited;
      }
    },
    getPostDetailRequest(_state, _action: PayloadAction<{ postId: string }>) {
      //Get post detail
    },
    getCommentsOfPostRequest(state, action: PayloadAction<IPayloadGetSocialCommentsPostListRequest>) {
      //Get comments post detail
      const { isRefresh, postId } = action.payload;

      state.commentsLoading = !isRefresh;
      state.socialPostRefreshing = !!isRefresh;

      if (state.postJson[postId] == null) return;
      state.postJson[postId].commentsList = [];
    },
    getCommentsOfPostSuccess(state, action: PayloadAction<IPayloadGetSocialCommentsPostListSuccess>) {
      const { data, postId } = action.payload;
      state.commentsLoading = false;
      state.socialPostRefreshing = false;
      data.forEach(element => {
        if (element.inReplyToId === postId) {
          const oldListComment = state.postJson[element.inReplyToId].commentsList;
          state.postJson[element.inReplyToId].commentsList = [...oldListComment, element];
        }
      });
    },
    getCommentsOfPostFailed(state) {
      state.commentsLoading = false;
      state.socialPostRefreshing = false;
    },
    insertCommentToPost(state, action: PayloadAction<{ postId: string; dataComment: IListId[] }>) {
      const { dataComment, postId } = action.payload;
      const post = state.postJson[postId];
      if (post) {
        state.postJson[postId].commentsList = state.postJson[postId].commentsList.concat(dataComment);
        state.postJson[postId].repliesCount += dataComment.length;
      }
    },
    createPostRequest(_state, _action: PayloadAction<IPayloadCreatePostRequest>) {
      //Create post
    },
    checkLimitSocial(_state) {},
    checkLimitSocialSuccess(state, action: PayloadAction<boolean>) {
      state.limitSocial = action.payload;
    },
    checkLimitSocialFalse(state) {
      state.limitSocial = true;
    },
    reblogPostRequest(_state, _action: PayloadAction<{ postId: string }>) {
      //Reblog post
    },
    unReblogPostRequest(_state, _action: PayloadAction<{ postId: string }>) {
      //Unreblog post
    },
    updateShowModalIntroduce(state, action: PayloadAction<boolean>) {
      state.showModalIntroduce = action.payload;
    },
    createPostSuccess(state, action: PayloadAction<IListId>) {
      //Create post success
      const { socialPostList } = state;
      state.socialPostList = [action.payload, ...socialPostList];
    },
    votePollRequest(_state, _action: PayloadAction<IPayloadVotePollRequest>) {},
    votePollSuccess(state, action: PayloadAction<IPayloadVotePollSuccess>) {
      state.postJson[action.payload.postId].poll = action.payload.dataPoll;
    },
    deletePostSuccess(state, action: PayloadAction<{ postId: string; postParentId?: string }>) {
      const { postId, postParentId } = action.payload;
      if (postParentId != null) {
        const post = state.postJson[postParentId];
        state.postJson[postParentId].commentsList = post.commentsList.filter(item => item.id !== postId);
        state.postJson[postParentId].repliesCount = post.repliesCount - 1;
      } else {
        state.socialPostList = state.socialPostList.filter(item => item.id !== postId);
      }
    },
    deletePostByAccountId(state, action: PayloadAction<{ accountId: string }>) {
      const { accountId } = action.payload;
      const postList = Object.values(state.postJson)
        .filter(item => item.account.id === accountId)
        .map(item => item.id);
      state.socialPostList = state.socialPostList.filter(item => !postList.includes(item.id));
    },
    insertPreviewLink(state, action: PayloadAction<{ postId: string; previewData: PreviewData }>) {
      const { postId, previewData } = action.payload;

      state.previewLinkJson = {
        ...state.previewLinkJson,
        [postId]: previewData,
      };
    },
    getLikedListRequest(state, action: PayloadAction<IPayloadGetLikedListRequest>) {
      const { isRefresh } = action.payload.params;
      state.likedLoading = true;

      if (isRefresh) {
        state.likedList = [];
      }
    },
    getLikedListSuccess(state, action: PayloadAction<IPayloadGetLikedListSuccess>) {
      const { data } = action.payload;
      state.likedLoading = false;
      state.likedList = state.likedList.concat(data);
    },
    getLikedListFailure(state) {
      state.likedLoading = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(SIGNOUT, state => {
      return {
        ...initialState,
        showModalIntroduce: state.showModalIntroduce,
      };
    });
  },
});

const persistConfig: PersistConfig<ReturnType<typeof socialPostSlice.reducer>> = {
  key: 'SocialPost',
  storage: AsyncStorage,
  whitelist: ['showModalIntroduce'],
};

export const SocialPostActions = { ...socialPostSlice.actions, ...SocialPostCustomAction };
export const SocialPostReducer = persistReducer(persistConfig, socialPostSlice.reducer);
