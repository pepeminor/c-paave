import { TouchableOpacity, Text, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { VictoryPie, VictoryTheme, VictoryChart, VictoryAxis, VictoryLabel } from 'victory-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import IconDown from 'assets/icon/iconDownPieChart.svg';
import IconDownDisable from 'assets/icon/iconDownPieChartDisable.svg';
import IconUp from 'assets/icon/iconUpPieChart.svg';
import IconUpDisable from 'assets/icon/iconUpPieChartDisable.svg';
import { IProfitLossResponse } from '../../../interfaces/equity';
import { ReducerStatus } from 'interfaces/reducer';
import useUpdateEffect from '../../../hooks/useUpdateEffect/index';
import { useTranslation } from 'react-i18next';
import { formatNumber } from 'utils';
import { clone } from 'ramda';
import withMemo from 'HOC/withMemo';

type IPieChartProps = {
  readonly data: IProfitLossResponse;
  readonly setData: (value: string) => void;
  readonly isVisibleStockBalance: boolean;
  readonly status: ReducerStatus;
};

type dataPieChart = {
  readonly x: number;
  readonly y: number;
  readonly industry: string;
};

const colorList = [
  '#F94144',
  '#F3722C',
  '#168AAD',
  '#BFD200',
  '#2B9348',
  '#F9C74F',
  '#90BE6D',
  '#43AA8B',
  '#F8961E',
  '#55A630',
  '#76C893',
  '#F9844A',
  '#FFBA08',
  '#42A5F5',
  '#0D47A1',
  '#9381FF',
  '#FF6B35',
  '#6A4C93',
  '#F56960',
  '#8E7DBE',
];

const colorOpacity = [
  'rgba(249, 65, 68, 0.2)',
  'rgba(243, 114, 44, 0.2)',
  'rgba(22, 138, 173, 0.2)',
  'rgba(191, 210, 0, 0.2)',
  'rgba(43, 147, 72, 0.2)',
  'rgba(249, 199, 79, 0.2)',
  'rgba(144, 190, 109, 0.2)',
  'rgba(67, 170, 139, 0.2)',
  'rgba(248, 150, 30, 0.2)',
  'rgba(85, 166, 48, 0.2)',
  'rgba(128, 185, 24, 0.2)',
  'rgba(249, 132, 74, 0.2)',
  'rgba(255, 186, 8, 0.2)',
  'rgba(66, 165, 245, 0.2)',
  'rgba(13, 71, 161, 0.2)',
  'rgba(147, 129, 255, 0.2)',
  'rgba(255, 107, 53, 0.2)',
  'rgba(106, 76, 147, 0.2)',
  'rgba(245, 105, 96, 0.2)',
  'rgba(142, 125, 190, 0.2)',
];

const CustomLabel = (props: any) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const styleLabel = [styles.chartTooltip, { top: props.y - scaleSize(20), left: props.x - scaleSize(25) }];

  return props.datum._x === props.selectedItem ? (
    <TouchableOpacity style={styleLabel}>
      <Text style={styles.chartTooltipTitle}>
        {`${t(props.datum.industry)}: `}
        <Text style={styles.chartTooltipValue}>{props.text}</Text>
      </Text>
    </TouchableOpacity>
  ) : null;
};

const PieChart = ({ data, setData, isVisibleStockBalance, status }: IPieChartProps) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [disableUp, setDisableUp] = useState<boolean>(false);
  const [disableDown, setDisableDown] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { styles } = useStyles();

  const { t } = useTranslation();

  const dataRaw = clone(data.sectorWeight);

  const dataPieChart = useMemo(() => {
    const dataPieChart: dataPieChart[] = [];
    dataRaw &&
      dataRaw
        .sort((x, y) => y.sectorWeight - x.sectorWeight)
        .forEach(pie =>
          dataPieChart.push({ x: dataRaw.indexOf(pie) + 1, y: pie.sectorWeight, industry: pie.industry })
        );
    return dataPieChart;
  }, [dataRaw]);

  const onPressPieChart = useCallback(() => {
    return [
      {
        eventKey: 'all',
        mutation: () => {
          setImmediate(() => setSelectedItem(-1));
          return { active: false };
        },
      },
      {
        mutation: ({ datum }: { datum: any }) => {
          if (datum.x === selectedItem) {
            // use setImmediate for avoid warning
            // more info: https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
            // will be removed when found better way
            setImmediate(() => setSelectedItem(0));
            // toggle data with pieChart
            setData('');
            return { active: false, style: { fill: colorList[datum.x - 1] } };
          } else {
            // toggle data with pieChart
            setData(datum.industry);

            return { active: true, style: { fill: colorList[datum.x - 1] } };
          }
        },
      },
    ];
  }, [selectedItem]);

  const onRadiusPieChart = useCallback(({ datum, active }) => {
    if (active) {
      setImmediate(() => setSelectedItem(datum.x));
    }
    return active ? scaleSize(105) : scaleSize(95);
  }, []);

  const getLabelPieChart = useCallback(({ datum }) => datum.y + '%', []);

  const totalPage = data && Math.ceil(data?.sectorWeight.length / 7);

  const profitLossItemList = data.profitLossItems;

  const handleUp = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDown = () => {
    if (currentPage !== totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  useUpdateEffect(() => {
    currentPage === totalPage ? setDisableUp(true) : setDisableUp(false);
    currentPage === 1 ? setDisableDown(true) : setDisableDown(false);
  }, [currentPage]);

  const colorScale = selectedItem ? colorOpacity : colorList;

  const axisStyle = {
    axis: { stroke: 'none' },
    ticks: { stroke: 'none' },
    tickLabels: { fill: 'none' },
    grid: { stroke: 'transparent' },
  };

  const fontSizeStyle = {
    fontSize: scaleSize(20),
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  };

  const convertToMillion =
    data != null
      ? Math.floor(data.stockBalance / 1000000) === 0
        ? Math.floor(data.stockBalance / 100000) === 0
          ? (Math.floor(data.stockBalance / 10000) * 10000) / 1000000 // get 0.0x million
          : (Math.floor(data.stockBalance / 100000) * 100000) / 1000000 // get 0.x million
        : Math.floor(data.stockBalance / 1000000) // get x million
      : 0;

  const textValue = isVisibleStockBalance ? convertToMillion + 'M' : '';

  return (
    <View style={styles.containerChartPie}>
      {status === ReducerStatus.SUCCESS && (
        <View style={styles.chartContainerHeight}>
          <VictoryChart theme={VictoryTheme.material} height={scaleSize(215)} width={scaleSize(215)}>
            <VictoryPie
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onPressIn: onPressPieChart,
                  },
                },
              ]}
              standalone={false}
              data={dataPieChart}
              labels={getLabelPieChart}
              labelComponent={<CustomLabel selectedItem={selectedItem} />}
              padAngle={1}
              radius={onRadiusPieChart}
              innerRadius={scaleSize(40)}
              labelRadius={scaleSize(90)}
              colorScale={colorScale}
            />

            <VictoryAxis style={axisStyle} standalone={false} />
            <VictoryLabel
              textAnchor="middle"
              style={fontSizeStyle}
              x={scaleSize(107.5)}
              y={scaleSize(107.5)}
              text={textValue}
            />
          </VictoryChart>
        </View>
      )}

      {status === ReducerStatus.SUCCESS && (
        <View style={styles.rightContainerHeight}>
          <View style={styles.noteContainerHeight}>
            {dataRaw &&
              dataRaw.slice((currentPage - 1) * 7, (currentPage - 1) * 7 + 7).map((el, i) => (
                <View style={styles.noteRowContainer} key={i}>
                  <View
                    style={[
                      styles.circleStyle,
                      {
                        backgroundColor: colorList[dataRaw.indexOf(el)],
                      },
                    ]}
                  />
                  <View style={globalStyles.justifyCenter}>
                    <Text style={styles.customFontSizeHeight}>
                      {`${t(el.industry)}: ${formatNumber(el.sectorWeight, 2, undefined, true)}%`}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
          <View style={styles.paginationContainerHeight}>
            <TouchableOpacity onPress={handleUp}>{disableDown ? <IconUpDisable /> : <IconUp />}</TouchableOpacity>
            <Text style={styles.paginationText}>{profitLossItemList && `${currentPage}/${totalPage}`}</Text>
            <TouchableOpacity onPress={handleDown}>
              {totalPage === 1 ? <IconDownDisable /> : disableUp ? <IconDownDisable /> : <IconDown />}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default withMemo(PieChart);
