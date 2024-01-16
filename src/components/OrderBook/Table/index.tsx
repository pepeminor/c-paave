import React, { useCallback } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleProp, Text, View, ViewStyle } from 'react-native';
import RenderItem, { ColumnTitle } from './ItemTable';
import useStyles from './styles';
import { IOrderStopHistoryResponse } from 'interfaces/equity';
import { useTranslation } from 'react-i18next';
import { OrderBookScreenInitOption } from 'global';
import { IEqtOrderHistoryMappingResponse } from 'interfaces/services';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { ReducerStatus } from 'interfaces/reducer';

interface SymbolRowItemProps {
  data: ReadonlyArray<IOrderStopHistoryResponse | IEqtOrderHistoryMappingResponse> | null | undefined;
  configGrid: TGridList[];
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null | undefined;
  contentContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  typeScreen?: OrderBookScreenInitOption;
  status: ReducerStatus;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onEndReached?: (info: { distanceFromEnd: number }) => void;
}

export interface TGridList {
  title: string | string[];
  column: (item: any) => React.ReactElement | null;
  width?: number;
}

interface THeaderTitle {
  title: string | string[];
  width?: number;
}

export const Table = ({
  contentContainerStyle,
  containerStyle,
  data,
  configGrid,
  status,
  onScroll,
  onEndReached,
  ListFooterComponent,
}: SymbolRowItemProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const getHeaderTitle = () => {
    const headerTitles: THeaderTitle[] = [];
    configGrid.forEach(item => {
      headerTitles.push({ title: item.title, width: item.width });
    });

    return headerTitles;
  };

  const footerComponent = () => {
    return data != null && data?.length > 0 ? (
      <View style={styles.padding16}>
        <Text style={styles.textDetail}>(*) {t('Click on each order to see more detail')}</Text>
      </View>
    ) : (
      <></>
    );
  };

  const renderItemHeader = useCallback(({ item }) => {
    return (
      <View style={{ width: item.width }}>
        {typeof item.title === 'string' ? (
          <ColumnTitle>
            <Text allowFontScaling={false} style={styles.headerTitle}>
              {t(item.title)}
            </Text>
          </ColumnTitle>
        ) : (
          <ColumnTitle>
            {(item.title as string[]).map((item, index) => (
              <Text key={index} allowFontScaling={false} style={styles.headerTitle}>
                {t(item)}
              </Text>
            ))}
          </ColumnTitle>
        )}
      </View>
    );
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => <RenderItem symbol={item} index={index} configGrid={configGrid} />,
    [configGrid]
  );

  return (
    <View style={containerStyle}>
      <View style={styles.headerContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={getHeaderTitle()}
          renderItem={renderItemHeader}
          keyExtractor={(_item, index) => `Table-item-index-${index}`}
          scrollEnabled={false}
        />
      </View>
      {status === ReducerStatus.SUCCESS && data != null && data.length > 0 && (
        <FlatList
          contentContainerStyle={contentContainerStyle}
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.spaceStyle} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_item, index) => `Table-index-${index}`}
          ListFooterComponent={ListFooterComponent ?? footerComponent}
          onScroll={onScroll}
          onEndReached={onEndReached}
          extraData={data}
        />
      )}
      {status === ReducerStatus.SUCCESS && data != null && data.length === 0 && (
        <View style={styles.noDataCon}>
          <EmptySymbol />
          <Text style={styles.noDataText}>{t('There is no data')}</Text>
        </View>
      )}
    </View>
  );
};
