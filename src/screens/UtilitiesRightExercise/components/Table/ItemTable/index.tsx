import React, { memo, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Animated, Easing, FlatList, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import { TGridList } from '..';
import UpIcon from 'assets/icon/upIcon.svg';
import useStyles from './styles';
import {
  IGetAdditionIssueShareInfoResponse,
  IGetAllRightListResponse,
  IGetEntitlementHistoryResponse,
} from 'interfaces/equity';
import { useTranslation } from 'react-i18next';
import SymbolRow from '../SymbolRow';
import { RightExerciseTab } from 'screens/UtilitiesRightExercise';
import { formatNumber } from 'utils';

interface InformationSymbolType {
  title: string;
  value: string | number;
  hidden?: boolean;
}

export const ColumnTitle = ({ children, style = {} }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) => {
  const { styles } = useStyles();
  return (
    <View
      style={[globalStyles.container, globalStyles.alignCenter, globalStyles.justifyCenter, styles.columHeader, style]}
    >
      {children}
    </View>
  );
};

interface RenderItemPropsType {
  tab: RightExerciseTab;
  configGrid: TGridList[];
  index?: number;
  rowItem: IGetAllRightListResponse | IGetAdditionIssueShareInfoResponse | IGetEntitlementHistoryResponse;
}

const RenderItem = ({ tab, configGrid, rowItem }: RenderItemPropsType) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const [isShowDetail, setIsShowDetail] = useState(false);
  const fadeOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isShowDetail) setIsShowDetail(false);
  }, [rowItem]);

  const InformationSymbol = (): InformationSymbolType[] => {
    switch (tab) {
      case 'PURCHASE_RIGHT':
        return [];
      case 'HISTORY':
        return [
          // {
          //   title: 'Offering Price',
          //   value: (rowItem as IGetEntitlementHistoryResponse).offeringPrice,
          // },
          // {
          //   title: 'Purchased Amount',
          //   value: (rowItem as IGetEntitlementHistoryResponse).purchasedAmount,
          // },
          // {
          //   title: 'Execute Date',
          //   value: (rowItem as IGetEntitlementHistoryResponse).executeDate,
          // },
          // {
          //   title: 'Status',
          //   value: (rowItem as IGetEntitlementHistoryResponse).status,
          // },
        ];
      default:
        return [
          {
            title: 'Ratio',
            value: (rowItem as IGetAllRightListResponse).ratio,
          },
          {
            title: 'Receivable Cash',
            value: formatNumber((rowItem as IGetAllRightListResponse).receivableCash),
          },
          {
            title: 'Receivable Qtt',
            value: (rowItem as IGetAllRightListResponse).receivableQty,
          },
          {
            title: 'Status',
            value: t((rowItem as IGetAllRightListResponse).status) as string,
          },
        ];
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  const handleFadeUp = () => {
    fadeOut();
    setIsShowDetail(pre => !pre);
  };

  const handleShowDetail = () => {
    if (isShowDetail) {
      fadeOut();
      setIsShowDetail(pre => !pre);
    } else {
      fadeIn();
      setIsShowDetail(pre => !pre);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleShowDetail} disabled={InformationSymbol().length === 0}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={configGrid}
          renderItem={({ item }) => {
            return <View style={[styles.col, { width: item.width }]}>{item.column(rowItem)}</View>;
          }}
          keyExtractor={(_item, index) => `Table-item-index-${index}`}
          scrollEnabled={false}
        />
      </TouchableOpacity>
      {isShowDetail && (
        <Animated.View style={{ height: isShowDetail ? 'auto' : 0, opacity: fadeOpacity }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.symbolInfoStyle}
            data={InformationSymbol()}
            renderItem={({ item }) => (
              <SymbolRow value={item.value as string} title={t(item.title)} hidden={item.hidden} />
            )}
            keyExtractor={(_item, index) => `key+${index}`}
            scrollEnabled={false}
          />
        </Animated.View>
      )}
      {isShowDetail && (
        <TouchableOpacity style={styles.buttonFadeUp} onPress={handleFadeUp}>
          <View style={styles.wrapperIcon}>
            <UpIcon width={scaleSize(16)} height={scaleSize(16)} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(RenderItem);
