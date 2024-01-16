import { View, Platform } from 'react-native';
import React, { memo } from 'react';
import useStyles from './styles';
import { ILeaderBoardInvestingResponse } from 'interfaces/leaderBoard';
import UserCard, { UserCardTopPeopleLastWeek } from '../UserCard';
import globalStyles, { scaleSize } from 'styles';
import { ILeaderBoardInvestingPeriod } from 'constants/enum';
import LeaderBoardNoDataIcon from 'assets/component/LeaderBoardNoData.svg';
import { ContestResultItemData } from 'interfaces/File';
import { IProps } from './Top.type';
import { useTopLogic } from './Top.logic';

type LeaderboardAccountProps = {
  data?: ILeaderBoardInvestingResponse[];
  updatedDateTime?: string;
  selectTabLeaderBoard: boolean;
  periodFilter: ILeaderBoardInvestingPeriod | string;
  tradingContestFilter?: string;
  dataTopPeopleLastWeek?: ContestResultItemData[];
  currentWeek?: number;
  eachWeek?: number;
};

const USER_CARD = {
  ['MAIN']: {
    HEIGHT: Platform.OS === 'ios' ? 175 : 181,
    WIDTH: 120,
    TOP: 30,
  },
  ['SECONDARY']: {
    HEIGHT: Platform.OS === 'ios' ? 150 : 155,
    WIDTH: 100,
    TOP: 42,
  },
};

const Top = ({
  data,
  periodFilter,
  updatedDateTime,
  selectTabLeaderBoard,
  tradingContestFilter,
  currentWeek,
  eachWeek,
  dataTopPeopleLastWeek,
  ...props
}: LeaderboardAccountProps & IProps) => {
  const { styles } = useStyles();

  const {
    logic: { isLastWeek, isPassedTheFinals },
    ui: {
      buttonJoinRealLeaderboard,
      // buttonJoinNowVirtual,
      // descriptionContest,
      // descriptionKisLeaderboard,
      lastUpdateTime,
    },
  } = useTopLogic({
    ...props,
    data,
    periodFilter,
    updatedDateTime,
    selectTabLeaderBoard,
    tradingContestFilter,
    currentWeek: currentWeek,
    eachWeek,
    dataTopPeopleLastWeek,
  });

  // const { isKisLeaderboardSelected } = props;

  return (
    <View style={[globalStyles.container]}>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          {data != null && data.length >= 3 ? (
            <>
              <UserCard
                data={data[1]}
                rank={data[1].ranking}
                width={USER_CARD.SECONDARY.WIDTH}
                height={USER_CARD.SECONDARY.HEIGHT}
                top={USER_CARD.SECONDARY.TOP}
                periodFilter={periodFilter}
                topLeaderBoard={false}
                selectTabLeaderBoard={selectTabLeaderBoard}
              />
              <UserCard
                data={data[0]}
                rank={data[0].ranking}
                width={USER_CARD.MAIN.WIDTH}
                height={USER_CARD.MAIN.HEIGHT}
                top={USER_CARD.MAIN.TOP}
                periodFilter={periodFilter}
                topLeaderBoard={true}
                selectTabLeaderBoard={selectTabLeaderBoard}
              />
              <UserCard
                data={data[2]}
                rank={data[2].ranking}
                width={USER_CARD.SECONDARY.WIDTH}
                height={USER_CARD.SECONDARY.HEIGHT}
                top={USER_CARD.SECONDARY.TOP}
                periodFilter={periodFilter}
                topLeaderBoard={false}
                selectTabLeaderBoard={selectTabLeaderBoard}
              />
            </>
          ) : null}

          {(isLastWeek || isPassedTheFinals) && dataTopPeopleLastWeek != null ? (
            <>
              <UserCardTopPeopleLastWeek
                dataTopPeopleLastWeek={dataTopPeopleLastWeek[1]}
                rank={dataTopPeopleLastWeek[1].rank}
                width={USER_CARD.SECONDARY.WIDTH}
                height={USER_CARD.SECONDARY.HEIGHT}
                top={USER_CARD.SECONDARY.TOP}
                periodFilter={periodFilter}
                topLeaderBoard={false}
                selectTabLeaderBoard={selectTabLeaderBoard}
              />
              <UserCardTopPeopleLastWeek
                dataTopPeopleLastWeek={dataTopPeopleLastWeek[0]}
                rank={dataTopPeopleLastWeek[0].rank}
                width={USER_CARD.MAIN.WIDTH}
                height={USER_CARD.MAIN.HEIGHT}
                top={USER_CARD.MAIN.TOP}
                periodFilter={periodFilter}
                topLeaderBoard={true}
                selectTabLeaderBoard={selectTabLeaderBoard}
              />
              <UserCardTopPeopleLastWeek
                dataTopPeopleLastWeek={dataTopPeopleLastWeek[2]}
                rank={dataTopPeopleLastWeek[2].rank}
                width={USER_CARD.SECONDARY.WIDTH}
                height={USER_CARD.SECONDARY.HEIGHT}
                top={USER_CARD.SECONDARY.TOP}
                periodFilter={periodFilter}
                topLeaderBoard={false}
                selectTabLeaderBoard={selectTabLeaderBoard}
              />
            </>
          ) : null}
        </View>
        {/* <YellowButton
          containerStyle={[styles.executeFormButton, globalStyles.hide]}
          onPress={openBottomModal}
          btnText={'Join Now'}
        /> */}
        {data != null && data.length === 0 ? (
          <LeaderBoardNoDataIcon
            width={Platform.OS === 'ios' ? scaleSize(375) : scaleSize(350)}
            height={scaleSize(224)}
            style={{
              marginTop: Platform.OS === 'ios' ? scaleSize(35) : scaleSize(18),
              alignSelf: 'center',
            }}
          />
        ) : null}
      </View>

      <View style={styles.noteWrap}>
        {/* {buttonJoinNowVirtual} */}
        {buttonJoinRealLeaderboard}
        {/* {isKisLeaderboardSelected ? descriptionKisLeaderboard : descriptionContest} */}
        {lastUpdateTime}
      </View>
    </View>
  );
};

export default memo(Top);
