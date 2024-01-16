import React from 'react';
import { View } from 'react-native';
import globalStyles from 'styles';
import useStyles from './style';
// import LineChart from 'components/Chart/LineChart';
import ChartFilterGroup from 'components/ChartFilterGroup';

const chartFilterData = [
  { title: '1 Week', value: 1 },
  { title: '1 Month', value: 30 },
  { title: '3 Month', value: 90 },
  { title: '6 Month', value: 180 },
  { title: '1 Year', value: 365 },
  { title: 'Max', value: 0 },
];

const AccProfit = () => {
  const { styles } = useStyles();
  return (
    <View style={[globalStyles.justifyCenter, styles.container]}>
      <View style={[styles.chartGroupContainer]}>{/* <LineChart chartStyle={chartStyle} /> chưa dùng, sửa sau */}</View>
      <ChartFilterGroup data={chartFilterData} />
    </View>
  );
};

export default AccProfit;
