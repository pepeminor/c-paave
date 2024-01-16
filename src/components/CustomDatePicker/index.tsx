import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CalendarIcon from 'assets/icon/CalendarIcon.svg';
import { formatDateToString } from 'utils';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';

type IDatePickerProps = {
  value?: Date;
  label?: string;
  maxDate?: Date;
  minDate?: Date;
  isDatePickerVisible: boolean;

  onOpen: () => void;
  onChange: ((newDate: Date) => void) & ((event: Event, date?: Date | undefined) => void);
  onConfirm: () => void;
  onCancel: () => void;
};

const DatePicker = (props: IDatePickerProps) => {
  const { styles } = useStyles();
  return (
    <View>
      {props.label != null && (
        <Text allowFontScaling={false} style={styles.datePickerLabelStyle}>
          {props.label}
        </Text>
      )}
      <TouchableOpacity
        onPress={props.onOpen}
        style={[globalStyles.alignCenter, globalStyles.flexDirectionRow, styles.datePickerContainer]}
      >
        <Text allowFontScaling={false} style={[globalStyles.container, styles.dateText]} numberOfLines={1}>
          {formatDateToString(props.value != null ? props.value : null, 'dd/MM/yyyy')}
        </Text>
        <CalendarIcon width={scaleSize(20)} height={scaleSize(20)} />
      </TouchableOpacity>
      <DateTimePickerModal
        date={props.value}
        isVisible={props.isDatePickerVisible}
        mode="date"
        onChange={props.onChange}
        onConfirm={props.onConfirm}
        onCancel={props.onCancel}
        maximumDate={props.maxDate}
        minimumDate={props.minDate}
      />
    </View>
  );
};

export default DatePicker;
