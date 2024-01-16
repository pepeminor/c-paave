import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef, FunctionComponent } from 'react';
import { IProps } from './DepositGuideLine.type';
import { IProps as ModalType } from './components/ModalAccountList.component';
import ModalAccount from './components/ModalAccountList.component';
import { TAB, BANK_LIST, IBank } from 'constants/bank';

const initializeState = {
  tab: TAB.BANK_TRANSFER,
  selectedBank: BANK_LIST[0],
  accountList: BANK_LIST[0].accountBanks,
  isVisibleModalAccountList: false,
};

const useDepositGuideLineLogic = (props: IProps) => {
  const [state, setState] = useMergingState({
    ...initializeState,
    selectedAcc: props.selectedAccount.selectedSubAccount,
  });

  const ModalAccountList = useRef<FunctionComponent<ModalType>>();

  const propsRefJson = {
    ...props,
    ...state,
  };

  const propsRef = useRef(propsRefJson);
  propsRef.current = propsRefJson;

  const handlers = useHandlers({
    onSelectTabBankTransfer: () => {
      setState({
        tab: TAB.BANK_TRANSFER,
      });
    },
    onSelectTabKISCounter: () => {
      setState({
        tab: TAB.AT_KIS_COUNTER,
      });
    },
    onClickAccountList: () => {
      if (ModalAccountList) {
        ModalAccountList.current = ModalAccount;
      }
      setState({
        isVisibleModalAccountList: true,
      });
    },
    onPressAccount: (account: typeof state.selectedAcc) => {
      setState({
        selectedAcc: account,
        isVisibleModalAccountList: false,
      });
    },
    onCloseModalAccountList: () => {
      setState({
        isVisibleModalAccountList: false,
      });
    },
    onChangeBank: (bank: IBank) => () => {
      setState({
        selectedBank: bank,
        accountList: bank.accountBanks,
      });
    },
  });

  return {
    state,
    handlers,
    modals: {
      ModalAccountList,
    },
  };
};

export { useDepositGuideLineLogic };
