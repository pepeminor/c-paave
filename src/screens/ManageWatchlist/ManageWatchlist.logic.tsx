/* eslint-disable @typescript-eslint/no-var-requires */
import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef, FunctionComponent } from 'react';
import { IProps } from './ManageWatchlist.type';
import { IGetAllWatchlistResponse } from 'interfaces/favorite';
import { IProps as ModalEditWatchListType } from 'screens/DiscoverWatchlist/components/ModalCreateWatchList.component';

const initializeState = {
  editModal: false,
  watchListName: '',
  watchListId: 0,
};

const useManageWatchlistLogic = (props: IProps) => {
  const [state, setState] = useMergingState(initializeState);
  const ModalEditWatchList = useRef<FunctionComponent<ModalEditWatchListType>>();

  const propsRefJson = {
    ...props,
    ...state,
  };

  const propsRef = useRef(propsRefJson);
  propsRef.current = propsRefJson;

  const handlers = useHandlers({
    openEditModal: (item: IGetAllWatchlistResponse) => {
      if (ModalEditWatchList) {
        ModalEditWatchList.current =
          require('screens/DiscoverWatchlist/components/ModalCreateWatchList.component.tsx').default;
      }

      setState({
        editModal: true,
        watchListName: item.watchListName,
        watchListId: item.watchListId,
      });
    },
    onDeleteWatchList: (item: IGetAllWatchlistResponse) => () => {
      const { watchListList, deleteWatchList } = propsRef.current;
      watchListList.data != null && watchListList.data.length > 1 && deleteWatchList(item);
    },
    onCloseEditModal: () => {
      ModalEditWatchList.current = undefined;

      setState({
        editModal: false,
        watchListName: '',
        watchListId: 0,
      });
    },
  });

  return {
    state,
    handlers,
    modals: {
      ModalEditWatchList,
    },
  };
};

export { useManageWatchlistLogic };
