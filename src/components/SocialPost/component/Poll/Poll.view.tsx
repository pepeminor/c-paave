import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { usePollLogic } from './Poll.logic';
import useStyles from './Poll.style';
import { IProps } from './Poll.type';
import withMemo from 'HOC/withMemo';
import { isNilOrEmpty } from 'ramda-adjunct';
import { formatNumber, insertObjectIf, mapV2 } from 'utils';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Icon from 'components/Icon';
import { scaleSize } from 'styles';
import { formatDistanceToNow } from 'date-fns';
import { enUS, ko, vi } from 'date-fns/locale';

const Poll = (props: IProps) => {
  const { handlers } = usePollLogic(props);
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const locale = props.lang === 'vi' ? vi : props.lang === 'ko' ? ko : enUS;

  if (isNilOrEmpty(props.dataPoll)) return null;
  return (
    <View style={styles.container}>
      {mapV2(props.dataPoll?.options, (item, index) => {
        const isVote = props.dataPoll?.ownVotes.findIndex(i => i === index) !== -1;
        const ratio = formatNumber((item?.votesCount / props.dataPoll?.votesCount!) * 100, 2);
        return (
          <TouchableOpacity
            key={index}
            style={styles.containerItem}
            onPress={handlers.votePoll({ optionId: props.dataPoll?.id!, index })}
            disabled={props.isOwner ?? props.dataPoll?.voted ?? props.dataPoll?.expired}
          >
            <View style={styles.radioButton}>
              {isVote && <Icon name={'check'} color={dynamicColors.Smalt} size={scaleSize(14)} />}
            </View>
            <PaaveText type={TEXT_TYPE.REGULAR_14} color={isVote ? dynamicColors.Smalt : dynamicColors.LIGHTTextTitle}>
              {item?.title}
            </PaaveText>
            <PaaveText
              type={TEXT_TYPE.REGULAR_14}
              color={isVote ? dynamicColors.Smalt : dynamicColors.LIGHTTextTitle}
              style={styles.textResult}
            >
              {ratio + '%'}
            </PaaveText>
            <View
              style={[
                styles.indicator,
                { width: `${parseFloat(ratio)}%` },
                insertObjectIf(!isVote, {
                  backgroundColor: dynamicColors.LIGHTIconDisable,
                }),
              ]}
            />
          </TouchableOpacity>
        );
      })}

      <View style={styles.containerResult}>
        <PaaveText type={TEXT_TYPE.REGULAR_10} color={dynamicColors.TextDescription}>
          {t('votes', { count: props.dataPoll?.votesCount })}
        </PaaveText>
        <View style={styles.dot} />
        <PaaveText type={TEXT_TYPE.REGULAR_10} color={dynamicColors.TextDescription}>
          {props.dataPoll?.expired
            ? moment(props.dataPoll?.expiresAt).format('DD/MM/YY HH:MM')
            : formatDistanceToNow(new Date(props.dataPoll?.expiresAt ?? ''), {
                locale: locale,
                addSuffix: true,
              })}
        </PaaveText>
      </View>

      <PaaveText type={TEXT_TYPE.REGULAR_12} color={dynamicColors.TextDescription} style={styles.textNote}>
        {t('polls.note')}
      </PaaveText>
    </View>
  );
};

export default withMemo(Poll);
