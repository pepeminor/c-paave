import React, { memo } from 'react';
import { VictoryAxis, VictoryChart } from 'victory-native';
import { Colors, scaleSize } from 'styles';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getStylesHook } from 'hooks/useStyles';

interface IProps {
  text?: string;
}

const LineChart = (props: IProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const { text = 'common.not.available.yet' } = props;

  const axisStyle = {
    axis: { stroke: 'grey', strokeWidth: 1 },
    ticks: { stroke: 'grey', size: 4 },
    grid: { stroke: Colors.LIGHTTextDisable, opacity: 0.1 },
    tickLabels: { fontSize: 12, padding: 5, fontFamily: 'Roboto' },
  };

  const paddingChart = {
    top: scaleSize(10),
    bottom: scaleSize(30),
    left: scaleSize(34),
    right: scaleSize(20),
  };

  const heightChart = scaleSize(213);

  const widthChart = scaleSize(360);

  return (
    <View>
      <Text style={styles.noDataText}>{t(text)}</Text>
      <VictoryChart
        padding={paddingChart}
        height={heightChart}
        width={widthChart}
        domainPadding={{
          y: [scaleSize(20), scaleSize(20)],
        }}
      >
        <VictoryAxis style={axisStyle} orientation="bottom" tickFormat={() => ''} />
        <VictoryAxis dependentAxis style={axisStyle} tickFormat={() => ''} />
      </VictoryChart>
    </View>
  );
};

export default memo(LineChart);

const useStyles = getStylesHook({
  noDataText: {
    position: 'absolute',
    top: 82,
    left: 124,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
});
