import React from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleProp, Text, View, ViewStyle } from 'react-native';
import RenderItem, { ColumnTitle } from './ItemTable';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import { RightExerciseTab } from 'screens/UtilitiesRightExercise';
import { useAppSelector } from 'hooks';
import {
  IGetAdditionIssueShareInfoResponse,
  IGetAllRightListResponse,
  IGetEntitlementHistoryResponse,
} from 'interfaces/equity';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { ReducerStatus } from 'interfaces/reducer';

interface SymbolRowItemProps {
  tab: RightExerciseTab;
  contentContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  configGrid: TGridList[];
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
  tab,
  contentContainerStyle,
  containerStyle,
  configGrid,
  onScroll,
  onEndReached,
}: SymbolRowItemProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const allRightList = useAppSelector(state => state.registerExercise.allRightList);
  const entitlementHistory = useAppSelector(state => state.registerExercise.entitlementHistory);
  const additionalIssueInfo = useAppSelector(state => state.registerExercise.additionalIssueInfo);

  const currentData =
    tab === 'PURCHASE_RIGHT' ? additionalIssueInfo : tab === 'HISTORY' ? entitlementHistory : allRightList;

  const data: ReadonlyArray<
    IGetAllRightListResponse | IGetAdditionIssueShareInfoResponse | IGetEntitlementHistoryResponse
  > = currentData.data;

  const isNoData = currentData.status !== ReducerStatus.LOADING && currentData.data.length === 0;

  const getHeaderTitle = () => {
    const headerTitles: THeaderTitle[] = [];
    configGrid.forEach(item => {
      headerTitles.push({ title: item.title, width: item.width });
    });

    return headerTitles;
  };

  return (
    <View style={containerStyle}>
      <View style={styles.headerContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={getHeaderTitle()}
          renderItem={({ item }) => {
            return (
              <View style={{ width: item.width }}>
                {typeof item.title === 'string' ? (
                  <ColumnTitle>
                    <Text allowFontScaling={false} style={[styles.headerTitle, styles.boldText]}>
                      {t(item.title)}
                    </Text>
                  </ColumnTitle>
                ) : (
                  <ColumnTitle>
                    {(item.title as string[]).map((item, index) => (
                      <Text key={index} allowFontScaling={false} style={[styles.headerTitle, styles.boldText]}>
                        {t(item)}
                      </Text>
                    ))}
                  </ColumnTitle>
                )}
              </View>
            );
          }}
          keyExtractor={(_item, index) => `Table-item-index-${index}`}
          scrollEnabled={false}
        />
      </View>
      {isNoData ? (
        <View style={styles.noDataCon}>
          <EmptySymbol />
          <Text style={styles.noDataText}>{t('There is no data')}</Text>
        </View>
      ) : null}
      <FlatList
        contentContainerStyle={contentContainerStyle}
        data={data}
        renderItem={({ item, index }) => <RenderItem tab={tab} rowItem={item} index={index} configGrid={configGrid} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_item, index) => `Table-index-${index}`}
        onScroll={onScroll}
        onEndReached={onEndReached}
        extraData={data}
      />
    </View>
  );
};
