import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { FunctionComponent, useRef } from 'react';
import { IProps } from './WatchListHeader.type';
import { IProps as ModalManageWatchListType } from '../ModalManageWatchList.component';
import { IProps as ModalCreateWatchListType } from '../ModalCreateWatchList.component';
import { IProps as ModalWatchListListType } from '../ModalWatchListList.component';
import { ACCOUNT_TYPE } from 'global';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

const initializeState = {
  addListModalVisible: false,
  textTypeModalVisible: false,
  manageWatchlistVisible: false,
};

const useWatchListHeaderLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);

  const ModalManageWatchList = useRef<FunctionComponent<ModalManageWatchListType>>();
  const ModalCreateWatchList = useRef<FunctionComponent<ModalCreateWatchListType>>();
  const ModalWatchListList = useRef<FunctionComponent<ModalWatchListListType>>();

  const handlers = useHandlers({
    onCreateWatchList: () => {
      const { selectedAccountType, showNonLoginModal } = propsRef.current;
      if (selectedAccountType === ACCOUNT_TYPE.DEMO) {
        setState({ manageWatchlistVisible: false });
        showNonLoginModal();
        return;
      }

      if (ModalCreateWatchList) {
        ModalCreateWatchList.current = require('../ModalCreateWatchList.component.tsx').default;
      }
      setState({
        manageWatchlistVisible: false,
        addListModalVisible: true,
      });
    },
    onPressCancelCreateWatchList: () => {
      ModalCreateWatchList.current = undefined;
      setState({
        addListModalVisible: false,
      });
    },
    openModalTextList: () => {
      if (ModalWatchListList) {
        ModalWatchListList.current = require('../ModalWatchListList.component.tsx').default;
      }

      setState({ textTypeModalVisible: true });
    },
    closeModalTextList: () => {
      ModalWatchListList.current = undefined;
      setState({ textTypeModalVisible: false });
    },
    openModalManageWatchList: () => {
      if (ModalManageWatchList) {
        ModalManageWatchList.current = require('../ModalManageWatchList.component.tsx').default;
      }
      setState({ manageWatchlistVisible: true });
    },
    onCloseManageWatchList: () => {
      ModalManageWatchList.current = undefined;

      setState({ manageWatchlistVisible: false });
    },
    goToDiscoverWatchlist: () => {
      navigate({ key: ScreenNames.DiscoverWatchlist });
    },
  });

  return {
    state,
    handlers,
    modals: {
      ModalManageWatchList,
      ModalCreateWatchList,
      ModalWatchListList,
    },
  };
};

export { useWatchListHeaderLogic };
