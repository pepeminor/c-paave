import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef } from 'react';
import { IProps } from './DeleteSymbols.type';
import { IGetAllSymbolFavoriteResponse } from 'interfaces/favorite';
import { ACCOUNT_TYPE } from 'global';

interface ISymbols {
  [s: string]: {
    name: string;
    code: string;
  };
}

const initializeState = {
  txtSearch: '',
  dataSearch: [] as IGetAllSymbolFavoriteResponse[],
  isDeleted: false,
};

const useDeleteSymbolsLogic = (props: IProps) => {
  const [state, setState] = useMergingState(initializeState);
  const listDelete = useRef({} as ISymbols);
  const propsRefJson = {
    ...props,
    ...state,
  };

  const propsRef = useRef(propsRefJson);
  propsRef.current = propsRefJson;

  const handlers = useHandlers({
    handleSymbolItem: (item: IGetAllSymbolFavoriteResponse) => {
      if (listDelete.current[item.code]) {
        const newList = listDelete.current;
        delete newList[item?.code];
        listDelete.current = newList;

        return;
      }
      listDelete.current = {
        ...listDelete.current,
        [item.code]: {
          ...item,
        },
      };
    },
    checkSymbol: (code: string) => {
      return listDelete.current[code] ? false : true;
    },
    onChangeText: (value: string) => {
      if (value === '') {
        setState({
          txtSearch: value,
          dataSearch: [],
        });

        return;
      }

      const data = propsRef.current.selectedWatchlistSymbolList.data.filter(item => {
        return item.code.includes(value.toLocaleUpperCase());
      });

      setState({
        txtSearch: value,
        dataSearch: data,
      });
    },
    handleConfirmSymbolAction: () => {
      const codeList: string[] = [];

      propsRef.current.selectedWatchlistSymbolList.data.map(item => {
        const code = item.code ?? '';
        if (!listDelete.current[code]) {
          codeList.push(code);
        }
      });

      setState({
        isDeleted: true,
      });
      const originalListSymbolsLength = propsRef.current.selectedWatchlistSymbolList.data.length;

      const listCodeKis = props.accountType === ACCOUNT_TYPE.DEMO ? codeList : codeList.reverse();
      const listAddCodeVT = listCodeKis.slice(originalListSymbolsLength).reverse();
      const listCodeVT =
        originalListSymbolsLength === 0
          ? [...listAddCodeVT]
          : [...codeList.slice(0, originalListSymbolsLength), ...listAddCodeVT];

      const listCode = props.accountType === ACCOUNT_TYPE.VIRTUAL ? listCodeVT : listCodeKis;

      propsRef.current.addMultiSymbols({
        code: listCode,
        watchListId: [propsRef.current.watchListId ?? 0],
        callback: {
          handleSuccess() {
            propsRef.current.navigation.goBack();
          },
        },
      });
    },
  });

  return {
    state,
    handlers,
  };
};

export { useDeleteSymbolsLogic };
