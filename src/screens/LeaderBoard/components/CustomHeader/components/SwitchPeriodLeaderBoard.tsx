import React, { useContext } from 'react';
import { lightColors, textStyles } from 'styles';
import { LeaderboardContext } from 'screens/LeaderBoard/LeaderBoard.logic';
import { IContextStateLeaderBoard, Period } from 'screens/LeaderBoard/LeaderBoard.type';
import withMemo from 'HOC/withMemo';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { useAppSelector } from 'hooks';
import TabSelector from 'components/TabSelector';
import { getStylesHook } from 'hooks/useStyles';

const SwitchPeriodLeaderBoard = () => {
  const { styles } = useStyles();
  const selectedAccount = useAppSelector(state => state.selectedAccount);

  const [{ selectTabLeaderBoard, periodFilter }, setIndexState] = useContext(LeaderboardContext);

  const selectPeriodFilter = (value: Period) => {
    track(AMPLITUDE_EVENT.CHANGE_PERIOD_FILTER_LEADER_BOARD, {
      selectedAccount: selectedAccount?.selectedSubAccount?.accountName ?? 'NON_LOGIN',
      timeFilter: Period[value],
    });
    setIndexState((prev: IContextStateLeaderBoard) => ({
      ...prev,
      periodFilter: value,
    }));
  };

  if (!selectTabLeaderBoard) return null;
  return (
    <TabSelector
      value={periodFilter}
      setValue={selectPeriodFilter}
      listValue={Period}
      style={styles.container}
      selectedContainer={styles.selectedContainer}
      unSelectedText={styles.unSelectedText}
      selectedText={styles.selectedText}
    />
  );
};

export default withMemo(SwitchPeriodLeaderBoard);

const useStyles = getStylesHook({
  container: {
    marginTop: 0,
    marginHorizontal: 16,
    backgroundColor: lightColors.Blue3,
    borderRadius: 10,
  },
  selectedContainer: {
    backgroundColor: lightColors.WHITE,
    borderRadius: 6,
    alignItems: 'center',
    flex: 1,
  },
  unSelectedText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.WHITE,
  },
  selectedText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
  },
});
