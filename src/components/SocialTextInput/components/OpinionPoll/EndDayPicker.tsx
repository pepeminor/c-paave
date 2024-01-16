import { TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';
import { useStyles } from './styles';
import PaaveText from 'components/PaaveText';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon';
import { TEXT_TYPE } from 'components/PaaveText/type';
import ModalBottom from 'components/ModalBottom';
import { scaleSize } from 'styles';

type PickerConfig = {
  title: string;
  value: number;
  count: number;
};

const PickerConfig: PickerConfig[] = [
  {
    title: 'unit.minute',
    value: 60 * 30,
    count: 30,
  },
  {
    title: 'unit.hour',
    value: 3600,
    count: 1,
  },
  {
    title: 'unit.hour_plural',
    value: 3600 * 6,
    count: 6,
  },
  {
    title: 'unit.day',
    value: 3600 * 24,
    count: 1,
  },
  {
    title: 'unit.day_plural',
    value: 3600 * 24 * 3,
    count: 3,
  },
  {
    title: 'unit.day_plural',
    value: 3600 * 24 * 7,
    count: 7,
  },
];

type Props = {
  endDay: number;
  setEndDay: (value: number) => void;
};

const HitSlop = {
  top: scaleSize(4),
  bottom: scaleSize(4),
  left: scaleSize(8),
  right: scaleSize(8),
};

export const EndDayPicker = memo(({ endDay, setEndDay }: Props) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(
    t('unit.day', {
      count: 1,
    })
  );

  const onPress = (item: PickerConfig) => () => {
    setEndDay(item.value);
    setSelectedValue(t(item.title, { count: item.count }));
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.endDayContainer}>
      <PaaveText>{t('new_post_screen.poll_end_date')} </PaaveText>
      <TouchableOpacity onPress={openModal} style={styles.endDayTouchable} hitSlop={HitSlop}>
        <PaaveText type={TEXT_TYPE.BOLD_14}>{selectedValue}</PaaveText>
        <Icon name="arrow-down-2" size={scaleSize(20)} />
      </TouchableOpacity>
      <ModalBottom visible={modalVisible} setVisible={setModalVisible} showCloseButton={false}>
        <View style={styles.endDayModal}>
          {PickerConfig.map(item => (
            <TouchableOpacity style={styles.pickerItem} onPress={onPress(item)} key={item.value}>
              <PaaveText key={`EndDayPicker_${item.value}`} type={TEXT_TYPE.REGULAR_16}>
                {t(item.title, {
                  count: item.count,
                })}
              </PaaveText>
              {endDay === item.value && <Icon name="check" size={scaleSize(20)} color={dynamicColors.DARK_GREEN} />}
            </TouchableOpacity>
          ))}
        </View>
      </ModalBottom>
    </View>
  );
});
