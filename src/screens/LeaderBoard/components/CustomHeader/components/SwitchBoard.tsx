import React, { useContext } from 'react';
import { lightColors, textStyles } from 'styles';
import { LeaderboardContext } from 'screens/LeaderBoard/LeaderBoard.logic';
import { IContextStateLeaderBoard, Board } from 'screens/LeaderBoard/LeaderBoard.type';
import withMemo from 'HOC/withMemo';
import TabSelector from 'components/TabSelector';
import { getStylesHook } from 'hooks/useStyles';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { openQuestionContestLeaderBoardModal } from 'reduxs/global-actions';
import Icon from 'components/Icon';
import withRenderCondition from 'HOC/withRenderCondition';

const SwitchBoard = () => {
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const [{ selectTabLeaderBoard }, setIndexState] = useContext(LeaderboardContext);

  const selectPeriodFilter = (value: Board) => {
    setIndexState((prev: IContextStateLeaderBoard) => ({
      ...prev,
      selectTabLeaderBoard: value === 'ALL',
    }));
  };

  const openQuestionContestModal = () => {
    dispatch(openQuestionContestLeaderBoardModal({}));
  };

  return (
    <TabSelector
      value={selectTabLeaderBoard ? 'ALL' : 'QUALIFY'}
      setValue={selectPeriodFilter}
      listValue={Board}
      style={styles.container}
      selectedContainer={styles.selectedContainer}
      unSelectedText={styles.unSelectedText}
      selectedText={styles.selectedText}
      icons={[
        null,
        <TouchableOpacity style={styles.marginLeft8} onPress={openQuestionContestModal}>
          <Icon
            name={'question-2'}
            color={selectTabLeaderBoard ? lightColors.WHITE : lightColors.BlueNewColor}
            size={16}
          />
        </TouchableOpacity>,
      ]}
    />
  );
};

export default withRenderCondition(withMemo(SwitchBoard), state => state.contests?.subMenu.showSwitchBoard);

const useStyles = getStylesHook({
  container: {
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
  marginLeft8: {
    marginLeft: 8,
  },
});
