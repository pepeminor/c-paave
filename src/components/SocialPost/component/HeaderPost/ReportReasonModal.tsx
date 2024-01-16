import { TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { getStylesHook } from 'hooks';
import { useTranslation } from 'react-i18next';
import { lightColors } from 'styles';
import ModalBottom from 'components/ModalBottom';
import PaaveText from 'components/PaaveText';
import Icon from 'components/Icon';
import { TEXT_TYPE } from 'components/PaaveText/type';
import PaaveButton from 'components/PaaveButton';

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  onReport: (reason: string) => void;
};

const ReportReasons = [
  {
    key: 'SPAM',
    value: 'report_reasons.spam',
  },
  {
    key: 'SCAMMING_CONTENT',
    value: 'report_reasons.scamming_content',
  },
  {
    key: 'HATE_SPEECH_SYMBOL',
    value: 'report_reasons.hate_speech_symbol',
  },
  {
    key: 'SEXUAL_ACTIVITY',
    value: 'report_reasons.nudity_sexual_activity',
  },
  {
    key: 'FALSE_INFORMATION',
    value: 'report_reasons.false_information',
  },
  {
    key: 'INAPPROPRIATE_NICKNAME',
    value: 'report_reasons.inappropriate_nickname',
  },
  {
    key: 'INAPPROPRIATE_CONTENT',
    value: 'report_reasons.inappropriate_content',
  },
  {
    key: 'VIOLENCE',
    value: 'report_reasons.violence',
  },
  {
    key: 'OTHERS',
    value: 'report_reasons.others',
  },
];

export const ReportReasonModal = memo(({ visible, setVisible, onReport }: Props) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();

  const [reason, setReason] = React.useState('SPAM');

  const onPressSubmit = () => {
    onReport(reason);
  };

  return (
    <ModalBottom visible={visible} setVisible={setVisible} showCloseButton={false}>
      <View style={styles.stickHeader} />
      {ReportReasons.map(item => (
        <ReportItem key={item.key} item={item} reason={reason} onPress={setReason} />
      ))}
      <PaaveButton
        type="SOLID"
        color={dynamicColors.BlueNewColor}
        style={styles.submitButtonContainer}
        onPress={onPressSubmit}
      >
        <PaaveText type={TEXT_TYPE.BOLD_16} color={dynamicColors.WHITE}>
          {t('Submit')}
        </PaaveText>
      </PaaveButton>
    </ModalBottom>
  );
});

type ReportItemProps = {
  item: {
    key: string;
    value: string;
  };
  reason: string;
  onPress: (value: string) => void;
};

const ReportItem = memo(({ item, reason, onPress }: ReportItemProps) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();

  const onPressItem = React.useCallback(() => {
    onPress(item.key);
  }, [item]);

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPressItem}>
      <PaaveText type={TEXT_TYPE.REGULAR_14} color={dynamicColors.LIGHTTextTitle}>
        {t(item.value)}
      </PaaveText>
      {item.key === reason && <Icon name={'check'} color={dynamicColors.DARK_GREEN} size={24} />}
    </TouchableOpacity>
  );
});

const useStyles = getStylesHook({
  stickHeader: {
    width: 48,
    height: 6,
    backgroundColor: lightColors.LIGHTGRAY,
    borderRadius: 4,
    alignSelf: 'center',
    marginVertical: 8,
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  submitButtonContainer: {
    margin: 16,
  },
});
