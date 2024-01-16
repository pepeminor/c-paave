import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps } from './SocialScreen.type';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { TabViewRef } from 'components/TabView/TabView.type';

const initializeState = {
  index: 0,
};

export const TAB = {
  SOCIAL: 'Social',
  LEADER_BOARD: 'Leaderboard',
};

export const routes = [
  { key: TAB.SOCIAL, title: 'social', icon: 'chat', index: 0 },
  { key: TAB.LEADER_BOARD, title: 'Leaderboard', icon: 'trophy', index: 1 },
];

const useSocialScreenLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);
  const tabViewRef = useRef<TabViewRef>(null);

  useEffect(() => {
    props.checkLimitSocial();
  }, []);

  const handlers = useHandlers({
    onSetIndex: (index: number) => {
      setState({
        index,
      });
    },
    goToUserInfo: () => {
      navigate({ key: ScreenNames.UserInfo });
    },
    goToSearch: () => {
      navigate({ key: ScreenNames.SearchSymbolAndMember });
    },
    onSetVisible: (value: boolean) => {
      props.updateShowModalIntroduce(value);
    },
    onCloseModal: () => {
      props.updateShowModalIntroduce(false);
    },
  });

  return {
    state,
    handlers,
    tabViewRef,
  };
};

export { useSocialScreenLogic };
