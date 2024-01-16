import { generateToolkitAction } from 'utils';
import { DeletePostParams, EditPostParams, NewPostParams } from './SocialNewPost.type';

export const createPost = generateToolkitAction<NewPostParams>('SocialNewPost/createPost');

export const editPost = generateToolkitAction<EditPostParams>('SocialNewPost/editPost');

export const deletePost = generateToolkitAction<DeletePostParams>('SocialNewPost/deletePost');
