import SheetData, { ISheetDataConfig } from 'components/SheetData';
import { IGetSymbolPeriodMasResponse } from 'interfaces/market';
import { ReducerStatus } from 'interfaces/reducer';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import { formatNumber, getColor, getIconColor, formatStringToDateString } from 'utils';
import useStyles from './styles';

// ICONS
import IconIncrease from 'assets/icon/IconIncrease.svg';
import IconFreeze from 'assets/icon/IconCircleFreeze.svg';
import IconDecrease from 'assets/icon/IconDecrease2.svg';
import { useAppSelector } from 'hooks/useAppSelector';

const cellStyle = [globalStyles.container2, globalStyles.centered];

const HistoricalSection = () => {
  const screenData = useAppSelector(state => state.screenIndexInfo);
  const historicalData = screenData.historicalData;

  const { styles } = useStyles();
  const configHistoricalDataGrid: ISheetDataConfig = {
    columnFrozen: 4,
    maxHeightPerRow: 53,
    header: [
      {
        label: ['Date'],
        width: 91,
        element: (_key: string, rowData: IGetSymbolPeriodMasResponse) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.date}>
              {rowData.d != null ? formatStringToDateString(rowData.d, 'dd/MM/yyyy') : '-'}
            </Text>
          </View>
        ),
      },
      {
        label: ['Last', 'Change'],
        width: 118,
        element: (_key: string, rowData: IGetSymbolPeriodMasResponse) => (
          <View style={cellStyle}>
            <View
              style={[
                globalStyles.container,
                globalStyles.fillWidth,
                globalStyles.justifyCenter,
                globalStyles.alignEnd,
                styles.border1,
                styles.paddingRight,
              ]}
            >
              {rowData != null && (
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.quantity,
                    styles.widthContext,
                    getColor(rowData.ra, 0, undefined, undefined).textStyle,
                  ]}
                >
                  {rowData.c != null ? formatNumber(rowData.c, 2, undefined, true) : '-'}
                </Text>
              )}
            </View>
            <View
              style={[
                globalStyles.alignCenter,
                globalStyles.flexDirectionRow,
                globalStyles.justifyEnd,
                globalStyles.fillWidth,
                styles.paddingBottom7,
                styles.border1,
                styles.paddingRight,
              ]}
            >
              {rowData != null && (
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.quantity,
                    globalStyles.textAlignRight,
                    getColor(rowData.ra, 0, undefined, undefined).textStyle,
                  ]}
                >
                  {rowData.ch != null ? formatNumber(rowData.ch, 2, undefined, true) : '-'}
                </Text>
              )}
              {rowData.ra != null &&
                getIconColor(
                  rowData.ra,
                  0,
                  undefined,
                  undefined,
                  <IconIncrease width={scaleSize(12)} height={scaleSize(10)} style={styles.iconStyle} />,
                  <IconDecrease width={scaleSize(12)} height={scaleSize(10)} style={styles.iconStyle} />,
                  <IconFreeze width={scaleSize(12)} height={scaleSize(10)} style={styles.iconStyle} />
                )}
              {rowData != null && (
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.quantity,
                    globalStyles.textAlignRight,
                    getColor(rowData.ra, 0, undefined, undefined).textStyle,
                  ]}
                >
                  {rowData.ra != null ? `${formatNumber(rowData.ra, 2, undefined, true)}%` : '-%'}
                </Text>
              )}
            </View>
          </View>
        ),
      },
      {
        label: ['Trading Value\n(Bil)'],
        width: 82,
        element: (_key: string, rowData: IGetSymbolPeriodMasResponse) => (
          <View style={cellStyle}>
            <View
              style={[
                globalStyles.container,
                globalStyles.fillWidth,
                globalStyles.justifyCenter,
                globalStyles.alignEnd,
                styles.border1,
                styles.paddingRight,
              ]}
            >
              <Text allowFontScaling={false} style={styles.quantity}>
                {rowData.va != null ? formatNumber(rowData.va, 2, 1000000000, true) : '-'}
              </Text>
            </View>
          </View>
        ),
      },
      {
        label: ['Trading Volume\n(Mil)'],
        width: 82,
        element: (_key: string, rowData: IGetSymbolPeriodMasResponse) => (
          <View style={cellStyle}>
            <View
              style={[
                globalStyles.container,
                globalStyles.fillWidth,
                globalStyles.justifyCenter,
                globalStyles.alignEnd,
                styles.border1,
                styles.paddingRight,
              ]}
            >
              <Text allowFontScaling={false} style={styles.quantity}>
                {rowData.vo != null ? formatNumber(rowData.vo / 1000000, 2, undefined, true) : '-'}
              </Text>
            </View>
          </View>
        ),
      },
    ],
  };
  return (
    <View>
      {historicalData.status === ReducerStatus.SUCCESS && historicalData.data && (
        <SheetData
          data={historicalData.data}
          config={configHistoricalDataGrid}
          scrollEnabled={false}
          noFlatList={true}
        />
      )}
    </View>
  );
};

export default memo(HistoricalSection);
