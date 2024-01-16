import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef } from 'react';
import { IProps } from './HeaderPost.type';
import { useDispatch } from 'react-redux';
import { SocialAccountActions, SocialNewPostActions, SocialPostSelectors } from 'reduxs';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { store } from 'screens/App';

const initializeState = {
  isVisible: false,
  confirmActionModal: false,
  confirmActionTitle: '',
  confirmAction: () => {},
  reportModalVisible: false,
};

const useHeaderPostLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);
  const dispatch = useDispatch();

  const handlers = useHandlers({
    onCloseMenu: () => {
      setState({ isVisible: false });
    },
    onOpenMenu: () => {
      setState({ isVisible: true });
    },
    setConfirmActionModal: (value: boolean) => {
      setState({ confirmActionModal: value });
    },
    setReportModalVisible: (value: boolean) => {
      setState({ reportModalVisible: value });
    },
    translateToEnglish: () => {
      propsRef.current.onChangeContent('en');
      handlers.onCloseMenu();
    },
    translateToVietnamese: () => {
      propsRef.current.onChangeContent('vi');
      handlers.onCloseMenu();
    },
    goToEditPost: () => {
      const postData = SocialPostSelectors.selectDataPost(propsRef.current.postId)(store.getState());
      const pollData =
        postData.poll == null
          ? undefined
          : {
              options: postData.poll.options.map(item => item.title),
              multiple: postData.poll.multiple,
            };
      setState({ isVisible: false });
      dispatch(
        SocialNewPostActions.setInitData({
          statusID: postData.id,
          content: postData.content,
          images: postData.medias.map(item => ({
            id: item.id,
            description: item.description,
            uri: item.url,
          })),
          poll: pollData,
        })
      );

      if (!propsRef.current.isComment) {
        navigate({ key: ScreenNames.SocialNewPost });
      }
    },
    onPressDeletePost: () => {
      setState({
        isVisible: false,
        confirmActionModal: true,
        confirmActionTitle: 'new_feed.confirm_delete_modal.title',
        confirmAction: handlers.confirmDeletePost,
      });
    },
    onPressBlockUser: () => {
      setState({
        isVisible: false,
        confirmActionModal: true,
        confirmActionTitle: 'new_feed.confirm_block_modal.title',
        confirmAction: handlers.confirmBlockUser,
      });
    },
    onPressReportUser: () => {
      setState({ reportModalVisible: true, isVisible: false });
    },
    confirmDeletePost: () => {
      dispatch(
        SocialNewPostActions.deletePost({
          payload: {
            params: {
              statusID: propsRef.current.postId,
            },
            isComment: propsRef.current.isComment,
            postParentId: propsRef.current.postParentId,
          },
        })
      );
      setState({ confirmActionModal: false });
    },
    confirmBlockUser: () => {
      const accountId = SocialPostSelectors.selectPostAccountId(propsRef.current.postId)(store.getState());
      dispatch(
        SocialAccountActions.blockUser({
          payload: {
            account_id: accountId,
          },
        })
      );
      setState({ confirmActionModal: false });
    },
    confirmReportUser: (reason: string) => {
      const accountId = SocialPostSelectors.selectPostAccountId(propsRef.current.postId)(store.getState());
      dispatch(
        SocialAccountActions.reportUser({
          payload: {
            account_id: accountId,
            comment: reason,
          },
        })
      );
      setState({ reportModalVisible: false });
    },
  });
  return {
    state,
    handlers,
  };
};

export { useHeaderPostLogic };
