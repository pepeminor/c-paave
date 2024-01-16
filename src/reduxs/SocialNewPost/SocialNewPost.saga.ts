import { watchCreatePost } from './sagas/createPost';
import { watchDeletePost } from './sagas/deletePost';
import { watchEditPost } from './sagas/editPost';

export const SocialNewPostSagas = {
  watchCreatePost,
  watchEditPost,
  watchDeletePost,
};
