import { takeEvery } from 'redux-saga/effects';
import { SocialPostActions } from './SocialPost.redux';
import {
  getNewsFeed,
  favouritesPost,
  getPostDetail,
  getCommentsOfPost,
  createPost,
  checkLimitSocial,
  reblogPost,
  getNewsFeedByHashtag,
  getLikedList,
} from './sagas';
import { votePoll } from './sagas/votePoll';

export function* SocialPostSagas() {
  yield takeEvery(SocialPostActions.getSocialPostListRequest.type, getNewsFeed);
  yield takeEvery(SocialPostActions.favouritesPost.type, favouritesPost);
  yield takeEvery(SocialPostActions.getPostDetailRequest.type, getPostDetail);
  yield takeEvery(SocialPostActions.getCommentsOfPostRequest.type, getCommentsOfPost);
  yield takeEvery(SocialPostActions.createPostRequest.type, createPost);
  yield takeEvery(SocialPostActions.checkLimitSocial.type, checkLimitSocial);
  yield takeEvery(SocialPostActions.reblogPostRequest.type, reblogPost);
  yield takeEvery(SocialPostActions.votePollRequest.type, votePoll);
  yield takeEvery(SocialPostActions.getLikedListRequest.type, getLikedList);

  yield getNewsFeedByHashtag();
}
