import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useCallback, useRef } from 'react';
import { IProps } from './AiRatingScreen.type';
import { navigate } from 'utils';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';

const initializeState = {
  index: 0,
};

export const TAB = {
  AI_RATING: 'Score',
  ROBO_ADVISORS: 'Advisor',
};

export const routes = [
  { key: TAB.AI_RATING, title: 'AI Rating' },
  { key: TAB.ROBO_ADVISORS, title: 'Robo Advisors' },
];

const defaultTab = { aiRatingTab: { tab: TAB.AI_RATING, isOpenRobot: false } };

const useAiRatingScreenLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state] = useMergingState(initializeState, propsRef);
  const scrollRef = useRef<ScrollView>(null);
  const { aiRatingTab } = props.route?.params || defaultTab;

  useFocusEffect(
    useCallback(() => {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }, [])
  );

  const handlers = useHandlers({
    onSetIndex: (index: number) => {
      if (index === 0) {
        track(AMPLITUDE_EVENT.AI_RATING_SCREEN);
      } else {
        track(AMPLITUDE_EVENT.ROBO_ADVISOR_SCREEN);
      }
    },
    goToUserInfo: () => {
      navigate({ key: 'UserInfo' });
    },
  });

  return {
    state,
    handlers,
    aiRatingTab,
  };
};

export { useAiRatingScreenLogic };
