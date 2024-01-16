import { ActivityIndicator, FlatList, ListRenderItemInfo, View } from 'react-native';
import { noDataTop } from './noDataTop';
import Top from '../Top';
import useStyles from 'screens/LeaderBoard/styles';
import React, { useCallback } from 'react';
import { ILeaderBoardInvestingResponse } from 'interfaces/leaderBoard';
import InvestingItem from './InvestingItem';
import { Period } from 'screens/LeaderBoard/LeaderBoard.type';

interface IProps {
  periodFilter: Period;
  selectTabLeaderBoard: boolean;
}

const LoadingLeaderBoard = (props: IProps) => {
  const { styles } = useStyles();
  const { periodFilter, selectTabLeaderBoard } = props;

  const renderInvestingItem = useCallback(({ item, index }: ListRenderItemInfo<ILeaderBoardInvestingResponse>) => {
    return <InvestingItem item={item} index={index} />;
  }, []);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={(_item, index) => `${index}`}
      data={noDataTop.slice(3)}
      renderItem={renderInvestingItem}
      ListHeaderComponent={
        <Top data={noDataTop.slice(0, 3)} periodFilter={periodFilter} selectTabLeaderBoard={selectTabLeaderBoard} />
      }
      ListFooterComponent={
        <View style={[styles.BGWhite, styles.loadingIcon]}>
          <ActivityIndicator size="small" color="#000" />
        </View>
      }
    />
  );
};

export default LoadingLeaderBoard;
