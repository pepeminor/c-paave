import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View, Text } from 'react-native';
import globalStyles from 'styles';
import useStyles from './style';
import withMemo from 'HOC/withMemo';
import { isNumber } from 'ramda-adjunct';

export interface IChartFilterData {
  title: string;
  value: number; // HOW MANY DAYS
}

type IChartFilterProps = {
  data: IChartFilterData[];
  sample?: number;
  onSetSample?: (ele: number) => void;
};

const ChartFilterGroup = (props: IChartFilterProps) => {
  const { t } = useTranslation();
  const [idxActive, setIdxActive] = React.useState<number>(0);
  const { styles } = useStyles();
  React.useEffect(() => {
    if (isNumber(props.sample)) {
      setIdxActive(props.sample);
    } else if (props.data) {
      setIdxActive(props.data[0].value);
    }
  }, []);

  const onButtonPress = useCallback(
    (ele: IChartFilterData) => () => {
      setIdxActive(ele.value);
      if (props.onSetSample) props.onSetSample(ele.value);
    },
    []
  );

  return (
    <View style={styles.container}>
      {props.data &&
        props.data.map((ele, key) => (
          <TouchableOpacity
            key={key}
            onPress={onButtonPress(ele)}
            style={[
              globalStyles.centered,
              styles.filterButton,
              ele.value === idxActive ? styles.filterButtonActive : {},
            ]}
          >
            <Text style={[styles.filterButtonText, ele.value === idxActive ? styles.filterButtonTextActive : {}]}>
              {t(ele.title)}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default withMemo(ChartFilterGroup);
