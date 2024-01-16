import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import { formatNumber } from 'utils';
import FirstMedal from 'assets/icon/FirstMedal.svg';
import SecondMedal from 'assets/icon/SecondMedal.svg';
import ThirdMedal from 'assets/icon/ThirdMedal.svg';
import UpArrow from 'assets/icon/UpArrow.svg';
import DownArrow from 'assets/icon/DownArrow.svg';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';
import Avatar from '../Avatar';
import { useDispatch } from 'react-redux';
import { goToUserWall } from 'reduxs/global-actions';
import { ContestResultItem } from 'interfaces/File';
import { useAppSelector } from 'hooks/useAppSelector';
import { ACCOUNT_TYPE } from 'global';
import { showNonLoginModal } from 'reduxs/global-actions/NonLogin';
import { setCurrentUserSubAccount } from '../../../../reduxs/global-actions/UserInfo';

type RankingBoardProps = {
  index: number;
  data: ContestResultItem;
};

const RankingBoard = memo(({ data, index }: RankingBoardProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  if (!data.showResult && (data.title === 'Luckydrawweek' || data.title === 'Luckydrawfinal')) return null;

  return (
    <View style={styles.rankingBoardContainer}>
      <Text style={styles.title}>
        {t(data.title)}{' '}
        {data.title === 'Monthcontest' ||
        data.title === 'Luckydrawweek' ||
        data.title === 'Luckydrawfinal' ||
        data.title === 'Grandfinal'
          ? ''
          : index + 1}
      </Text>
      <View style={styles.tableHeaderContainer}>
        {data.title === 'Luckydrawweek' || data.title === 'Luckydrawfinal' ? null : (
          <View style={[styles.cellBorder, styles.row1]}>
            <Text style={styles.tableHeaderText}>{t('Rank')}</Text>
          </View>
        )}
        <View
          style={[
            styles.cellBorder,
            {
              width:
                data.title === 'Luckydrawweek' || data.title === 'Luckydrawfinal' ? scaleSize(209) : scaleSize(155),
            },
          ]}
        >
          <Text style={[styles.tableHeaderText]}>{t('ID')}</Text>
        </View>
        <View style={[styles.cellBorder, styles.row3]}>
          <Text style={[styles.tableHeaderText]}>% {t('Return')}</Text>
        </View>
        <View style={[styles.cellBorder, styles.row4]}>
          <Text style={[styles.tableHeaderText]}>{t('Prize')}</Text>
        </View>
      </View>
      {data.title === 'Luckydrawweek' || data.title === 'Luckydrawfinal'
        ? data.data.map((item, index) => (
            <RankingItem
              title={'Luckydrawweek'}
              rank={item.rank}
              prize={item.prize}
              username={item.username}
              fullName={item.fullName}
              returnRate={item.returnRate}
              isDisable={!data.showResult}
              key={index}
              subAccount={item.subAccount}
            />
          ))
        : data.data.map((item, index) => (
            <RankingItem
              rank={item.rank}
              prize={item.prize}
              username={item.username}
              fullName={item.fullName}
              returnRate={item.returnRate}
              isDisable={!data.showResult}
              key={index}
              subAccount={item.subAccount}
            />
          ))}
      {!data.showResult && data.closeContent != null && (
        <View style={[styles.absoluteView]}>
          <WaitingNote content={data.closeContent} />
        </View>
      )}
    </View>
  );
});

export default RankingBoard;

type RankingItemProps = {
  rank: number;
  prize: string;
  username: string;
  fullName: string;
  returnRate: number;
  isDisable: boolean;
  title?: string;
  subAccount: string;
};

const RankingItem = ({
  rank,
  prize,
  username,
  fullName,
  returnRate,
  isDisable,
  title,
  subAccount,
}: RankingItemProps) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);

  const onPress = () => {
    if (selectedAccountType === ACCOUNT_TYPE.DEMO) {
      dispatch(showNonLoginModal());
      return;
    }
    dispatch(goToUserWall(username));
    dispatch(setCurrentUserSubAccount(subAccount));
  };

  return (
    <TouchableOpacity style={[styles.tableRowContainer]} onPress={onPress} disabled={isDisable}>
      {title != null && (title === 'Luckydrawweek' || title === 'Luckydrawfinal') ? null : (
        <View style={[styles.cellBorder, styles.row1, globalStyles.centered]}>{getMedal(rank)}</View>
      )}
      <View
        style={[
          title != null && (title === 'Luckydrawweek' || title === 'Luckydrawfinal') && username === ''
            ? {}
            : styles.cellBorder,
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          styles.pl5,
          {
            width:
              title != null && (title === 'Luckydrawweek' || title === 'Luckydrawfinal')
                ? scaleSize(209)
                : scaleSize(155),
          },
        ]}
      >
        <Avatar username={username} fullName={fullName} isHideBorderNoData={isDisable} isFirst />
        <Text style={[styles.tableCellText, globalStyles.textAlignLeft, globalStyles.container]} numberOfLines={1}>
          {username}
        </Text>
      </View>
      <View style={[styles.cellBorder, styles.row3, globalStyles.flexDirectionRow, globalStyles.centered]}>
        {returnRate > 0 ? (
          <UpArrow width={scaleSize(8)} height={scaleSize(7)} />
        ) : returnRate === 0 ? null : (
          <DownArrow width={scaleSize(8)} height={scaleSize(7)} />
        )}
        <Text
          style={[
            styles.tableCellText,
            returnRate > 0
              ? globalStyles.colorUp
              : returnRate === 0
              ? globalStyles.colorSteady
              : globalStyles.colorDown,
            globalStyles.textAlignCenter,
          ]}
        >
          {`${formatNumber(returnRate, 2, undefined, true)}%`}
        </Text>
      </View>
      <View style={[styles.cellBorder, styles.row4, globalStyles.justifyCenter]}>
        <Text style={[styles.tableCellText, globalStyles.textAlignRight, styles.pr12]}>{prize}</Text>
      </View>
    </TouchableOpacity>
  );
};

type WaitingNoteProps = {
  content: string;
};

const WaitingNote = memo(({ content }: WaitingNoteProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  return (
    <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.pb22]}>
      <Text allowFontScaling={false} style={styles.waitingNote}>
        {t(content)}
      </Text>
    </View>
  );
});

const getMedal = (rank: number) => {
  switch (rank) {
    case 1:
      return <FirstMedal />;
    case 2:
      return <SecondMedal />;
    case 3:
      return <ThirdMedal />;
    default:
      return null;
  }
};
