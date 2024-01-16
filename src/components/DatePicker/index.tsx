import React, { useState, useLayoutEffect, useMemo, useCallback } from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CalendarIcon from 'assets/icon/CalendarIcon.svg';
import { formatDateToString, setLocale } from 'utils';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import { LANG, LANG_CODE } from 'global';
import { IState } from 'reduxs/global-reducers';
import { useSelector } from 'react-redux';
import withMemo from 'HOC/withMemo';

type IDatePickerProps = {
  value?: Date;
  label?: string;
  // error?: boolean;
  // errorContent?: string;
  disabled?: boolean;
  // placeholder?: string;
  maxDate?: Date;
  minDate?: Date;
  // hideLabel?: boolean;
  isVisibleDatePicker?: boolean;
  isVisibleTextDatePicker?: boolean;

  onChange?(value: Date): void;
  onClose?(): void;
  isTrade?: boolean;
  stylesContainer?: StyleProp<ViewStyle>;
};

const DatePicker = (props: IDatePickerProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const selectedLanguage = useSelector((state: IState) => state.lang);

  const { t } = useTranslation();
  const { styles } = useStyles();

  const showDatePicker = useCallback(() => {
    !props.disabled && setDatePickerVisibility(true);
  }, [props.disabled]);

  const hideDatePicker = useCallback(() => {
    setDatePickerVisibility(false);
    if (props.onClose != null) {
      props.onClose();
    }
  }, [props.onClose]);

  const handleDatePicked = useCallback(
    (date: Date) => {
      hideDatePicker();
      if (props.onChange != null) {
        props.onChange(date);
      }
    },
    [props.onChange, hideDatePicker]
  );

  const getLocaleCode = useMemo(() => {
    switch (selectedLanguage) {
      case LANG.VI:
        return LANG_CODE.VI;
      case LANG.EN:
        return LANG_CODE.EN;
      case LANG.KO:
        return LANG_CODE.KO;
      case LANG.ZH:
        return LANG_CODE.ZH;
      default:
        return LANG_CODE.VI;
    }
  }, [selectedLanguage]);

  useLayoutEffect(() => {
    setLocale(selectedLanguage);
  }, [selectedLanguage]);

  const touchableStyle = useMemo(
    () => [
      globalStyles.alignCenter,
      globalStyles.flexDirectionRow,
      props.isTrade === true ? styles.datePickerContainerForTradeScreen : styles.datePickerContainer,
    ],
    [props.isTrade]
  );

  return (
    <View style={props.stylesContainer}>
      {props.label != null && (
        <Text allowFontScaling={false} style={styles.datePickerLabelStyle}>
          {t(props.label)}
        </Text>
      )}
      {!props.isVisibleTextDatePicker ? (
        <TouchableOpacity onPress={showDatePicker} style={touchableStyle}>
          <Text allowFontScaling={false} style={styles.dateText} numberOfLines={1}>
            {formatDateToString(props.value != null ? props.value : null, 'dd/MM/yyyy')}
          </Text>
          <CalendarIcon width={scaleSize(20)} height={scaleSize(20)} />
        </TouchableOpacity>
      ) : null}
      <DateTimePickerModal
        date={props.value}
        isVisible={(!props.disabled && isDatePickerVisible) || props.isVisibleDatePicker}
        mode="date"
        onConfirm={handleDatePicked}
        onCancel={hideDatePicker}
        maximumDate={props.maxDate}
        minimumDate={props.minDate}
        locale={getLocaleCode}
        confirmTextIOS={t('Confirm')}
        cancelTextIOS={t('Cancel')}
      />
    </View>
  );
};

export default withMemo(DatePicker);
