import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import Avatar from '../Avatar';
import useStyles from './styles';
import globalStyles from 'styles';
import RankingBoard from '../RankingBoard';
import { useAppSelector } from 'hooks';
import { ContestResultItem } from 'interfaces/File';
import { ESubAccountJoinedContest } from 'global';

type RankingTabProps = {
  rankingData: ContestResultItem[];
  totalUser: number;
  position: number;
};

const RankingTab = ({ rankingData, totalUser, position }: RankingTabProps) => {
  const { styles } = useStyles();
  // const selectedAccountType = useAppSelector(state => state.selectedAccount.type);
  return (
    <View style={styles.contentContainer}>
      {position === 2 ? null : <JoinedUsers totalUser={totalUser} position={position} />}
      {/* {selectedAccountType !== ACCOUNT_TYPE.DEMO ? <JoinedUsers totalUser={totalUser} position={position} /> : null} */}
      {rankingData.map((item, index) => (
        <RankingBoard key={index} data={item} index={index} />
      ))}
    </View>
  );
};

export default memo(RankingTab);

export type FilterContext = {
  count: number;
};

type JoinedUsersProps = {
  totalUser: number;
  position: number;
};

const JoinedUsers = memo(({ totalUser, position }: JoinedUsersProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const getVirtualCoreContest = useAppSelector(state => state.getVirtualCoreContest.data);
  const getVirtualCoreContestListed = useAppSelector(state => state.getVirtualCoreContestListed.data);
  const accountContestRegistered = useAppSelector(state => state.accountContestRegistered.data);
  const contestIdFromJson = useAppSelector(state => state.contests?.subMenu.contestId);
  // total user of kis contest, if user not join kis contest => use api getVirtualCoreContestListed, joined => use api getVirtualCoreContest, api failed => use from json
  const totalUserOfKis =
    position === 2
      ? accountContestRegistered === ESubAccountJoinedContest.NOT_JOIN
        ? getVirtualCoreContestListed != null
          ? getVirtualCoreContestListed[0].participantNo
          : contestIdFromJson
        : getVirtualCoreContest != null
        ? getVirtualCoreContest[0].participantNo
        : contestIdFromJson
      : null;
  const leaderBoardInvesting = useAppSelector(state =>
    state.leaderBoardInvesting.data?.investors.filter(
      function (this: FilterContext, item) {
        if (this.count >= 5) {
          return false;
        }
        if (item.username.includes('advisor')) {
          return false;
        }
        this.count++;
        return true;
      },
      { count: 0 }
    )
  );

  return (
    <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.pb22]}>
      <View style={[globalStyles.flexDirectionRow]}>
        {leaderBoardInvesting?.map((item, index) => (
          <Avatar username={item.username} fullName={item.fullname} key={index} isFirst={index === 0} />
        ))}
      </View>
      <Text allowFontScaling={false} style={[styles.listItem, styles.pl8]}>
        +{position === 2 ? totalUserOfKis : totalUser} {t('investors')}
      </Text>
    </View>
  );
});
