import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { FunctionComponent, useRef } from 'react';
import { IProps } from './Feedback.type';
import { IS_IOS } from 'constants/main';
import { Linking } from 'react-native';
import config from 'config';
import { useDispatch } from 'react-redux';
import { FeedBackActions, FeedBackSelectors } from 'reduxs';
import { clearHistoryAndNavigate, mapV2 } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { track } from '@amplitude/analytics-react-native';
import { useAppSelector } from 'hooks/useAppSelector';
import { TPropsModalError } from 'components/ModalError';

const initializeState = {
  modalVisible: false,
  modalErrorVisible: false,
  errorMsg: false,
  point: 0,
};
const DEFAULT_POINT = 7;

const FIVE_MINUTE = 300000;

const useFeedbackLogic = (props: IProps) => {
  const userId = useAppSelector(state => state.getUserAccountInfo.data?.id);
  const timerFeedbackPrevious = useAppSelector(FeedBackSelectors.selectTimeFeedbackPrevious(userId!));
  const propsRef = useRef({
    ...props,
    ...initializeState,
    timerFeedbackPrevious,
    userId,
  });
  propsRef.current = { ...propsRef.current, ...props, timerFeedbackPrevious, userId };
  const [state, setState] = useMergingState(initializeState, propsRef);
  const pointValue = useRef(DEFAULT_POINT);
  const listFunctionSelectedRef = useRef([] as string[]);
  const feedbackText = useRef('');
  const dispatch = useDispatch();

  const ModalError = useRef<FunctionComponent<TPropsModalError>>();

  const handlers = useHandlers({
    onConfirmFeedback: () => {
      if (new Date().getTime() - propsRef.current.timerFeedbackPrevious <= FIVE_MINUTE) {
        handlers.onShowModalError();
        return;
      }

      setState({
        modalVisible: true,
      });
      listFunctionSelectedRef.current = [];
      if (pointValue.current >= 8) {
        handlers.onSubmitFeedback(true);
      }
    },
    setVisibleModal: (visible: boolean) => {
      setState({
        modalVisible: visible,
      });
    },
    onRatingApp: () => {
      if (pointValue.current >= 8) {
        if (IS_IOS) {
          Linking.openURL('https://apps.apple.com/us/app/paave/id6443872980?action=write-review');
        } else {
          Linking.openURL(config.playStoreLink);
        }

        return;
      }

      if (feedbackText.current === '') {
        setState({
          errorMsg: true,
        });

        return;
      }
      setState({
        modalVisible: false,
      });

      handlers.onSubmitFeedback();

      mapV2(listFunctionSelectedRef.current, item => {
        track(item);
      });
    },
    onCancel: () => {
      setState({
        modalVisible: false,
      });
    },
    onChangeText: (value: string) => {
      feedbackText.current = value;
    },
    onSubmitFeedback: async (disableCallback?: boolean) => {
      const deviceId = config.uniqueId;
      dispatch(
        FeedBackActions.feedBackRequest({
          rating: pointValue.current,
          message: feedbackText.current,
          deviceId,
          appVersion: `${config.appVersion} (${config.appBuildNo})`,
          userId: propsRef.current.userId ?? 0,
          callback: {
            handleSuccess() {
              !disableCallback &&
                clearHistoryAndNavigate({
                  key: ScreenNames.ThankyouFeedback,
                });
            },
          },
        })
      );
    },
    onShowModalError: () => {
      if (ModalError) {
        ModalError.current = require('components/ModalError/index.tsx').default;
      }
      setState({
        modalErrorVisible: true,
      });
    },
    onHideModalError: () => {
      ModalError.current = undefined;
      setState({
        modalErrorVisible: false,
      });
    },
  });

  return {
    state,
    handlers,
    refs: {
      pointValue,
      listFunctionSelectedRef,
      ModalError,
    },
  };
};

export { useFeedbackLogic };
