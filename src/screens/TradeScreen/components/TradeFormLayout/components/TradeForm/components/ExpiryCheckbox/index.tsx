import { View, TouchableOpacity } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import DatePicker from 'components/DatePicker';
import { addBusinessDays } from 'date-fns';
import SelectedIcon from 'assets/icon/OK-Check.svg';
import UnselectedIcon from 'assets/icon/UnCheck.svg';
import useStyles from './styles';
import { useAppSelector } from 'hooks/useAppSelector';
import useUpdateEffect from 'hooks/useUpdateEffect';

type IExpiryCheckboxProps = {
  value?: Date;
  onDateChange: (value: Date) => void;
  onEnableChange: (value: boolean) => void;
};

const ExpiryCheckbox = ({ onDateChange, onEnableChange }: IExpiryCheckboxProps) => {
  const [enable, setEnable] = useState(false);
  const [currentDate, setCurrentDate] = useState(addBusinessDays(new Date(), 1));
  const { styles } = useStyles();
  const orderKISSuccess = useAppSelector(state => state.orderKISSuccess);

  const onCurrentDateChange = useCallback(
    (value: Date) => {
      setCurrentDate(value);
      onDateChange?.(value);
    },
    [onDateChange]
  );

  const toggleEnable = useCallback(() => {
    setEnable(preValue => {
      onEnableChange?.(!preValue);
      return !preValue;
    });
  }, [onEnableChange]);

  useUpdateEffect(() => {
    setCurrentDate(addBusinessDays(new Date(), 1));
    setEnable(false);
  }, [orderKISSuccess]);

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <DatePicker
          disabled={!enable}
          value={currentDate}
          onChange={onCurrentDateChange}
          minDate={addBusinessDays(new Date(), 1)}
          isTrade={true}
        />
      </View>
      <TouchableOpacity onPress={toggleEnable} style={styles.checkbox}>
        {enable ? <SelectedIcon /> : <UnselectedIcon />}
      </TouchableOpacity>
    </View>
  );
};

export default memo(ExpiryCheckbox);
