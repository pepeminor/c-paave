import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import QuestionIcon from 'assets/icon/QuestionIcon.svg';
import DatePicker from 'components/DatePicker';
import { navigate } from '../../../utils';
import AiRatingModal from 'components/AIRatingModal';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
import { formatNumber } from 'utils';

/* ICONS */
import ArrowRight from 'assets/icon/ArrowRight.svg';
import IncreaseIcon from 'assets/icon/IconIncrease2.svg';
import DecreaseIcon from 'assets/icon/IconDecrease.svg';

type IFakeStockList = {
  rank: number;
  gap: number;
  code: string;
  rating: number;
  technical: number;
  valuation: number;
  quantity: number;
};

const fakeStockList: IFakeStockList[] = [
  {
    rank: 1,
    gap: 1,
    code: 'ABC',
    rating: 4.6,
    technical: 5,
    valuation: 4.2,
    quantity: 4.5,
  },
  {
    rank: 2,
    gap: 11,
    code: 'XYZ',
    rating: 3.6,
    technical: 5,
    valuation: 4,
    quantity: 4,
  },
  {
    rank: 3,
    gap: -11,
    code: 'DCM',
    rating: 2.6,
    technical: 4,
    valuation: 3.2,
    quantity: 3.5,
  },
  {
    rank: 4,
    gap: 41,
    code: 'ONU',
    rating: 2.6,
    technical: 3,
    valuation: 2.2,
    quantity: 2.5,
  },
  {
    rank: 5,
    gap: -2,
    code: 'YES',
    rating: 2,
    technical: 3,
    valuation: 2.2,
    quantity: 2.5,
  },
];

const cellStyle = [globalStyles.container2, globalStyles.centered];

const AIRating = () => {
  const [onDate, setOnDate] = React.useState(new Date());
  const [visibleModal, setVisibleModal] = React.useState<boolean>(false);

  const { styles } = useStyles();

  const onChangeOnDate = (value: Date) => {
    setOnDate(value);
  };

  const handleVisible = () => {
    setVisibleModal(pre => !pre);
  };

  const goToAIRatingScreen = () => {
    navigate({ key: 'AIRatingScreen' });
    setVisibleModal(false);
  };

  const configStockDataGridModal: ISheetDataConfig = {
    columnFrozen: 6,
    maxHeightPerRow: 38,
    headerHeight: 44,
    labelSize: 14,
    header: [
      {
        label: ['Rank'],
        width: 63,
        element: (_key: string, rowData: IFakeStockList, _index: number) => (
          <View style={[cellStyle, globalStyles.flexDirectionRow, globalStyles.justifySpaceEvenly, styles.border]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.rank}
            </Text>
            {rowData.gap >= 0 ? (
              <>
                <IncreaseIcon style={styles.iconStyle} />
                <Text style={[styles.greenText, styles.gapTextStyle]}>{formatNumber(rowData.gap, 0, 1, false)}</Text>
              </>
            ) : (
              <>
                <DecreaseIcon style={styles.iconStyle} />
                <Text style={[styles.redText, styles.gapTextStyle]}>{formatNumber(rowData.gap)}</Text>
              </>
            )}
          </View>
        ),
      },
      {
        label: ['Symbol'],
        width: 47,
        element: (_key: string, rowData: IFakeStockList, _index: number) => (
          <View style={[cellStyle, styles.border]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.code}
            </Text>
          </View>
        ),
      },
      {
        label: ['AI Rating'],
        width: 65,
        element: (_key: string, rowData: IFakeStockList, _index: number) => (
          <View style={[cellStyle, styles.border]}>
            <Text allowFontScaling={false} style={[styles.greenText]}>
              {formatNumber(rowData.rating, 2)}
            </Text>
          </View>
        ),
      },
      {
        label: ['Technical'],
        width: 65,
        element: (_key: string, rowData: IFakeStockList, _index: number) => (
          <View style={[cellStyle, styles.border]}>
            <Text allowFontScaling={false} style={styles.text}>
              {formatNumber(rowData.technical, 2)}
            </Text>
          </View>
        ),
      },
      {
        label: ['Valuation'],
        width: 65,
        element: (_key: string, rowData: IFakeStockList, _index: number) => (
          <View style={[cellStyle, styles.border]}>
            <Text allowFontScaling={false} style={styles.text}>
              {formatNumber(rowData.valuation, 2)}
            </Text>
          </View>
        ),
      },
      {
        label: ['Quantity'],
        width: 70,
        element: (_key: string, rowData: IFakeStockList, _index: number) => (
          <View style={[cellStyle, styles.border]}>
            <Text allowFontScaling={false} style={styles.text}>
              {formatNumber(rowData.quantity, 2)}
            </Text>
          </View>
        ),
      },
    ],
  };

  return (
    <View style={[globalStyles.container, globalStyles.justifyCenter, styles.container]}>
      {/* TITLE */}
      <View
        style={[
          globalStyles.flexDirectionRow,
          globalStyles.justifySpaceBetween,
          globalStyles.alignCenter,
          styles.blockTitleContainer,
        ]}
      >
        <View style={[globalStyles.flexDirectionRow]}>
          <Text style={[styles.blockTitleText]}>AI Rating</Text>
          <TouchableOpacity onPress={handleVisible}>
            <QuestionIcon width={scaleSize(24)} height={scaleSize(24)} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            globalStyles.alignCenter,
            globalStyles.flexDirectionRow,
            globalStyles.justifySpaceBetween,
            styles.btnSeeAll,
          ]}
          onPress={goToAIRatingScreen}
        >
          <Text style={[styles.seeAllTitle]}>See all</Text>
          <ArrowRight width={scaleSize(9)} height={scaleSize(10.06)} />
        </TouchableOpacity>
      </View>

      {/* DATE RANGE */}
      <View style={[globalStyles.justifyCenter, styles.blockDateRangeContainer]}>
        <DatePicker onChange={onChangeOnDate} value={onDate} />
      </View>

      {/* LIST */}
      <View style={[globalStyles.justifyCenter, styles.blockItemListContainer]}>
        <SheetData data={fakeStockList.slice(0, 5)} config={configStockDataGridModal} />
      </View>
      {visibleModal === true && <AiRatingModal handleVisible={handleVisible} goToAIRatingScreen={goToAIRatingScreen} />}
    </View>
  );
};

export default AIRating;
