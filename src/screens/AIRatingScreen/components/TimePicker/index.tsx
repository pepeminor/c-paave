import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { memo, useState } from 'react';
import useStyles from './styles';
import globalStyles, { scaleSize } from 'styles';
import Modal from 'components/Modal';

import PickerArrowDown2 from 'assets/icon/PickerArrowDown3.svg';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import FilterSelectIcon from 'assets/icon/FilterSelectIcon.svg';
import { ITimePicker } from 'screens/AIRatingScreen/constants';

const TimePickerLabels: {
  [key in ITimePicker]: string;
} = {
  [ITimePicker.ALL]: 'All',
  [ITimePicker.ONE_WEEK]: '1 Week',
  [ITimePicker.ONE_MONTH]: '1 Month',
  [ITimePicker.THREE_MONTHS]: '3 Month',
  [ITimePicker.SIX_MONTHS]: '6 Month',
  [ITimePicker.ONE_YEAR]: '1 Year',
};

export interface TimePickerProps {
  selectedTime: ITimePicker;
  setSelectedTime: (time: ITimePicker) => void;
}

const TimePicker = ({ selectedTime, setSelectedTime }: TimePickerProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const [pickTimeModalVisible, setPickTimeModalVisible] = useState(false);
  const AI_RATING_RENDER_TIME_PICKER_TOUCH = [
    globalStyles.flexDirectionRow,
    globalStyles.alignCenter,
    styles.typePickerContainer,
  ];
  const AI_RATING_RENDER_TIME_PICKER_TEXT = [globalStyles.container, styles.colorLightTextContent];
  const AI_RATING_MODAL_BACKGROUND = [
    globalStyles.container,
    styles.modalBackground,
    globalStyles.flexDirectionRow,
    globalStyles.justifyCenter,
    globalStyles.alignEnd,
  ];
  const AI_RATING_MODAL_TIME_PICKER_CON = [globalStyles.justifyCenter, styles.modalContentContainer];
  const AI_RATING_MODAL_TIME_PICKER_TITLE = [
    globalStyles.flexDirectionRow,
    globalStyles.alignCenter,
    styles.modalTitle,
  ];
  const AI_RATING_MODAL_TIME_PICKER_TEXT = [globalStyles.container, styles.filterText];
  const AI_RATING_MODAL_TIME_PICKER_ITEM = [
    globalStyles.flexDirectionRow,
    globalStyles.alignCenter,
    styles.filterItemContainer,
  ];
  const handlePickTimeModal = () => {
    setPickTimeModalVisible(pre => !pre);
  };

  const onSelectingTime = (value: ITimePicker) => {
    setSelectedTime(value);
    setPickTimeModalVisible(false);
  };

  return (
    <View style={styles.optionPerformanceContainer}>
      <Text style={styles.performanceText}>{t('Performance')}</Text>
      <TouchableOpacity onPress={handlePickTimeModal} style={AI_RATING_RENDER_TIME_PICKER_TOUCH}>
        <Text allowFontScaling={false} style={AI_RATING_RENDER_TIME_PICKER_TEXT}>
          {t(TimePickerLabels[selectedTime])}
        </Text>
        <PickerArrowDown2 />
      </TouchableOpacity>
      <Modal visible={pickTimeModalVisible} onRequestClose={handlePickTimeModal}>
        <View style={AI_RATING_MODAL_BACKGROUND}>
          <View style={AI_RATING_MODAL_TIME_PICKER_CON}>
            <View style={AI_RATING_MODAL_TIME_PICKER_TITLE}>
              <Text allowFontScaling={false} style={AI_RATING_MODAL_TIME_PICKER_TEXT}>
                {t('Time')}
              </Text>
              <TouchableOpacity onPress={handlePickTimeModal}>
                <CloseFilter />
              </TouchableOpacity>
            </View>
            {Object.values(ITimePicker).map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => onSelectingTime(item)}
                  style={AI_RATING_MODAL_TIME_PICKER_ITEM}
                >
                  <Text
                    style={[
                      globalStyles.container,
                      styles.filterTextValue,
                      selectedTime === item ? styles.filterTextValueSelected : styles.filterTextValueUnselected,
                    ]}
                  >
                    {t(TimePickerLabels[item])}
                  </Text>
                  {selectedTime === item && <FilterSelectIcon height={scaleSize(11)} width={scaleSize(18)} />}
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity style={globalStyles.invisibleBackground} onPress={handlePickTimeModal} />
        </View>
      </Modal>
    </View>
  );
};

export default memo(TimePicker);
