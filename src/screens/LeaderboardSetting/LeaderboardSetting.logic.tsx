/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { useCallback, useEffect, useState } from 'react';
import { IProps, ILeaderboardWhichAccountJoin } from './LeaderboardSetting.type';
import { useDispatch } from 'react-redux';
import { changeLeaderboardSetting, onEnterLeaderboardSettingScreen } from './action';
import { ACCOUNT_TYPE, SUB_ACCOUNT_TYPE } from 'global';
import { ReducerStatus } from 'interfaces/reducer';
import { navigate } from 'utils/rootNavigation';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

export const convertTextSubAccChoosedToOptIn = (subAccount: string) => {
  if (!subAccount) return '';
  if (subAccount.includes(SUB_ACCOUNT_TYPE.SUB_ACCOUNT_X)) return ILeaderboardWhichAccountJoin.NORMAL_ACCOUNT;
  if (subAccount.includes(SUB_ACCOUNT_TYPE.SUB_ACCOUNT_M)) return ILeaderboardWhichAccountJoin.MARGIN_ACCOUNT;
  if (subAccount.includes(SUB_ACCOUNT_TYPE.SUB_ACCOUNT_D)) return ILeaderboardWhichAccountJoin.DERIVATIVE_ACCOUNT;
  return '';
};

const useLeaderboardSettingLogic = (props: IProps) => {
  const dispatch = useDispatch();
  const { leaderboardSetting, isShowDummyModal } = props;

  const hasBeenOptIn = leaderboardSetting.data != null && (leaderboardSetting.data.optBoard as boolean);
  const prevWhichAccountJoin = leaderboardSetting.data != null && leaderboardSetting.data.subAccount;

  const [isOptIn, setIsOptIn] = useState(hasBeenOptIn);
  const [whichAccountJoin, setWhichAccountJoin] = useState(prevWhichAccountJoin);

  const [disableConfirmButton, setDisableConfirmButton] = useState(true);

  const handleValidateButtonConfirm = useCallback(() => {
    // is has been Opt-IN
    if (hasBeenOptIn) {
      if (hasBeenOptIn !== isOptIn) return setDisableConfirmButton(false);
      if (whichAccountJoin === prevWhichAccountJoin) return setDisableConfirmButton(true);
      if (hasBeenOptIn === isOptIn) {
        if (prevWhichAccountJoin === whichAccountJoin) return setDisableConfirmButton(true);
        return setDisableConfirmButton(false);
      }
    }

    // is has been Opt-OUT
    else {
      if (hasBeenOptIn !== isOptIn) {
        if (!whichAccountJoin) return setDisableConfirmButton(true);
        return setDisableConfirmButton(false);
      }
      if (hasBeenOptIn === isOptIn) return setDisableConfirmButton(true);
    }
  }, [hasBeenOptIn, isOptIn, prevWhichAccountJoin, whichAccountJoin]);

  const goToLeaderboard = () => {
    if (isShowDummyModal || leaderboardSetting.status === ReducerStatus.LOADING) return;

    props.navigation.popToTop();
    navigate({
      key: ScreenNames.HomeTab,
      params: {
        screen: 'LeaderboardTab',
      },
    });
  };

  const handleOptOUT = () => {
    setIsOptIn(false);
  };

  const handleOptIN = () => {
    setIsOptIn(true);
  };

  const handleConfirm = useCallback(() => {
    if (disableConfirmButton || leaderboardSetting.status === ReducerStatus.LOADING) return;
    const param = {
      partnerId: ACCOUNT_TYPE.KIS.toString().toLocaleLowerCase(),
      optBoard: isOptIn,
      subAccount: whichAccountJoin as string,
    };
    dispatch(
      changeLeaderboardSetting({ ...param }, undefined, undefined, undefined, undefined, {
        handleSuccess: () => {
          handleValidateButtonConfirm();
        },
      })
    );
  }, [isOptIn, whichAccountJoin, disableConfirmButton, leaderboardSetting.status]);

  const handleJoinWhichAccount = useCallback((subAccountNumber: string) => {
    setWhichAccountJoin(subAccountNumber);
  }, []);

  useEffect(() => {
    setIsOptIn(hasBeenOptIn);
    setWhichAccountJoin(prevWhichAccountJoin);
  }, [hasBeenOptIn, prevWhichAccountJoin]);

  useEffect(() => {
    handleValidateButtonConfirm();
  }, [handleValidateButtonConfirm]);

  useEffect(() => {
    dispatch(onEnterLeaderboardSettingScreen({}));
  }, []);

  return {
    state: {
      isOptIn,
      setIsOptIn,
      whichAccountJoin,
      setWhichAccountJoin,
      disableConfirmButton,
      setDisableConfirmButton,
    },
    logic: {
      goToLeaderboard,
      handleOptOUT,
      handleOptIN,
      handleJoinWhichAccount,
      handleConfirm,
    },
  };
};

export { useLeaderboardSettingLogic };
