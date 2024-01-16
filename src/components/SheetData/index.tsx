import React, { memo, useEffect, useState, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  ScrollView,
  StyleProp,
  Text,
  TextLayoutLine,
  View,
  ViewStyle,
} from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';

export interface ISheetDataConfig {
  columnFrozen: number;
  header: ISheetDataColumn[];
  maxHeightPerRow: number;
  labelSize?: number;
  headerHeight?: number;
}

export interface ISheetDataColumn {
  label: string | (string | React.ReactElement)[];
  width: number;
  borderLeft?: boolean;
  borderRight?: boolean;
  element(key: string, rowData: object, index: number, isTotalRow?: boolean): React.ReactNode;
}

type ISheetDataProps = {
  config: ISheetDataConfig;
  data: object[] | null;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  contentContainerStyle?: StyleProp<ViewStyle> | undefined;
  scrollEnabled?: boolean;
  iniData?: number;
  noFlatList?: boolean;
  noFlex?: boolean;

  onRefreshData?(): void;
  requestLoadMore?(): void;
  renderFooter?(): JSX.Element;
  ListEmptyComponent?: JSX.Element;
};

const SheetData = (props: ISheetDataProps) => {
  const headerScrollView = useRef<ScrollView>(null);
  const bodyScrollView = useRef<FlatList>(null);
  const scrollPosition = useRef(new Animated.Value(0)).current;
  const scrollPosition2 = useRef(new Animated.Value(0)).current;
  const bodyDragging = useRef(false);
  const headerDragging = useRef(false);
  const [heightDimensions, setHeightDimensions] = useState({ parent: 0, child: 0 });

  const { styles } = useStyles();

  const data: object[] = useMemo(() => {
    return props.data || [];
  }, [props.data]);

  const scrollEvent = Animated.event([{ nativeEvent: { contentOffset: { x: scrollPosition } } }], {
    useNativeDriver: false,
  });
  const scrollEvent2 = Animated.event([{ nativeEvent: { contentOffset: { x: scrollPosition2 } } }], {
    useNativeDriver: false,
  });
  const labelSize = props.config.labelSize ?? 12;

  const { t } = useTranslation();

  const getElementDimensions = (layout: TextLayoutLine, ele: 'parent' | 'child') => {
    const { height } = layout;
    setHeightDimensions(prev => {
      return {
        ...prev,
        [ele]: height,
      };
    });
  };

  const isScrollEnabled =
    props.scrollEnabled ??
    heightDimensions.child + scaleSize(props.config.maxHeightPerRow ?? 80) * 2 > heightDimensions.parent
      ? true
      : false;

  useEffect(() => {
    scrollPosition.addListener(position => {
      if (headerDragging.current === false && headerScrollView.current != null) {
        headerScrollView.current.scrollTo({ x: position.value || 0, animated: false });
      }
    });
    scrollPosition2.addListener(position => {
      if (bodyDragging.current === false && bodyScrollView.current != null) {
        bodyScrollView.current.scrollToOffset({ offset: position.value || 0, animated: false });
      }
    });
  }, []);

  const formatCellHeader = (
    key: string,
    properties: ISheetDataColumn,
    frozen = false,
    borderRight = false,
    maxHeightPerRow: number,
    headerHeight?: number
  ) => {
    if (typeof properties.label === 'string') {
      return (
        <View
          key={key}
          style={[
            globalStyles.centered,
            styles.headerTitleSingleString,
            borderRight === true && styles.headerTitleSingleStringBorderRight,
            frozen === true && styles.headerTitleSingleStringBorderRightFrozen,
            {
              width: scaleSize(properties.width),
              height: scaleSize(headerHeight ?? maxHeightPerRow),
            },
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[styles.headerTitleSingleStringText, { fontSize: scaleSize(labelSize) }]}
          >
            {t(properties.label)}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          key={key}
          style={[
            {
              width: scaleSize(properties.width),
              height: scaleSize(headerHeight ?? maxHeightPerRow),
            },
          ]}
        >
          {properties.label.map((item, index) => {
            if (typeof item === 'string') {
              return (
                <View
                  key={`${key}-${index}`}
                  style={[
                    globalStyles.container,
                    globalStyles.centered,
                    styles.headerTitleSingleString,
                    borderRight === true && styles.headerTitleSingleStringBorderRight,
                    frozen === true && styles.headerTitleSingleStringBorderRightFrozen,
                  ]}
                >
                  <Text
                    allowFontScaling={false}
                    style={[globalStyles.textAlignCenter, styles.headerTitleSingleStringText]}
                  >
                    {t(item)}
                  </Text>
                </View>
              );
            } else {
              return (
                <View
                  key={`${key}-${index}`}
                  style={[
                    globalStyles.container,
                    globalStyles.centered,
                    styles.backgroundCheckBoxLabel,
                    borderRight === true && styles.headerTitleSingleStringBorderRight,
                    frozen === true && styles.headerTitleSingleStringBorderRightFrozen,
                  ]}
                >
                  {item}
                </View>
              );
            }
          })}
        </View>
      );
    }
  };

  const formatHeader = () => {
    const cols = [];
    for (let i = props.config.columnFrozen; i < props.config.header.length; i++) {
      const item = props.config.header[i];
      cols.push(
        formatCellHeader(
          typeof item.label === 'string' ? `frozen-cols-${item.label}-${i}` : `frozen-cols-${i}`,
          item,
          undefined,
          true,
          props.config.maxHeightPerRow,
          props.config.headerHeight
        )
      );
    }

    const frozenRow = [];
    for (let i = 0; i < props.config.columnFrozen; i++) {
      const item = props.config.header[i];
      frozenRow.push(
        formatCellHeader(
          typeof item.label === 'string' ? `frozen-row-${item.label}-${i}` : `frozen-row-${i}`,
          item,
          i === props.config.columnFrozen - 1,
          true,
          props.config.maxHeightPerRow,
          props.config.headerHeight
        )
      );
    }

    return (
      <View style={[globalStyles.flexDirectionRow]}>
        {frozenRow}
        <ScrollView
          // style={[{ height: scaleSize(props.config.headerHeight || props.config.maxHeightPerRow) }]}
          ref={headerScrollView}
          horizontal={true}
          // scrollEnabled={props.data != null && props.data.length > 0 ? false : true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={scrollEvent2}
          onScrollBeginDrag={onHeaderBeginDrag}
          onScrollEndDrag={onHeaderEndDrag}
          onMomentumScrollBegin={onHeaderBeginDrag}
          onMomentumScrollEnd={onHeaderEndDrag}
        >
          {cols}
        </ScrollView>
      </View>
    );
  };

  const formatRowForSheet = ({ item }: ListRenderItemInfo<{ key: string; render: JSX.Element }>) => {
    return item.render;
  };

  const handleScrollEndReached = () => {
    if (data.length > 0 && props.requestLoadMore != null) {
      props.requestLoadMore();
    }
    //HANDLE LOAD MORE
  };

  const renderFooter = () => {
    // if (this.props.data === null && !refreshing) {
    //   return (
    //     <View style={styles.containerError}>
    //       <Text allowFontScaling={false} style={styles.labelError}>{this.props.t('Error while fetching data, pull to refresh')}</Text>
    //     </View>
    //   );
    // }

    // if (!this.isLoadingMore || this.hasMore !== true) {
    //   return null;
    // } else if (this.props.noMore) {
    //   return null;
    // } else {
    //   return <ActivityIndicator animating size="small" />;
    // }
    //HANDLE WHEN LOADING
    if (props.renderFooter != null) {
      return props.renderFooter();
    } else {
      return <View />;
    }
  };

  const onBodyBeginDrag = () => {
    bodyDragging.current = true;
  };

  const onBodyEndDrag = () => {
    bodyDragging.current = false;
  };

  const onHeaderEndDrag = () => {
    headerDragging.current = false;
  };

  const onHeaderBeginDrag = () => {
    headerDragging.current = true;
  };

  const formatCell = (
    key: string,
    properties: ISheetDataColumn,
    rowData: object,
    rowIndex: number,
    columnIndex: number,
    borderRight = false,
    maxHeightPerRow: number
  ) => {
    return (
      <View
        key={key}
        style={[
          globalStyles.centered,
          { width: scaleSize(properties.width), height: scaleSize(maxHeightPerRow) },
          // rowIndex % 2 !== 0 && styles.highlight,
          //highlight each 2 row
          columnIndex === props.config.columnFrozen - 1 &&
            borderRight === true &&
            styles.headerTitleSingleStringBorderRightFrozen,
          styles.borderBottom,
          //
        ]}
      >
        {properties.element(
          key,
          rowData,
          rowIndex,
          // props.haveTotalRow === true && rowIndex === props.data!.length - 1
          //is total row or not
          undefined
        )}
      </View>
    );
  };

  const formatIdentityColumn = () => {
    const cells = [];
    let frozenWidth = 0;

    for (let i = 0; i < props.config.columnFrozen; i++) {
      const items = [];
      const properties = props.config.header[i];
      frozenWidth += properties.width;
      for (let k = 0; k < data.length; k++) {
        const rowData = data[k];
        items.push(
          formatCell(
            `identity-column-${properties.label}-${k}`,
            properties,
            rowData,
            k,
            i,
            true,
            props.config.maxHeightPerRow
          )
        );
      }
      cells.push(
        <View
          key={`identity-column-1-${properties.label}-${i}`}
          // style={[i === props.config.columnFrozen && styles.frozenBorder]}
        >
          {items}
        </View>
      );
    }

    return (
      <View
        style={[
          // styles.identity,
          globalStyles.flexDirectionRow,
          { width: scaleSize(frozenWidth) },
        ]}
      >
        {cells}
      </View>
    );
  };

  const formatColumn = ({ item, index }: ListRenderItemInfo<ISheetDataColumn>) => {
    const cells = [];
    for (let i = 0; i < data.length; i++) {
      const rowData = data[i];
      cells.push(
        formatCell(
          typeof item.label === 'string' ? `column-${item.label}-${i}` : `column-${i}`,
          item,
          rowData,
          i,
          index,
          undefined,
          props.config.maxHeightPerRow
        )
      );
    }
    return <View>{cells}</View>;
  };

  const formatColumn2 = (item: ISheetDataColumn, index: number) => {
    const cells = [];
    for (let i = 0; i < data.length; i++) {
      const rowData = data[i];
      cells.push(
        formatCell(
          typeof item.label === 'string' ? `column-${item.label}-${i}` : `column-${i}`,
          item,
          rowData,
          i,
          index,
          undefined,
          props.config.maxHeightPerRow
        )
      );
    }
    return <View>{cells}</View>;
  };

  const formatBody = () => {
    const data2: ISheetDataColumn[] = [];

    // let frozenWidth = 0;

    // for (let i = 0; i < props.config.columnFrozen; i++) {
    //   const properties = props.config.header[i];
    //   frozenWidth += wp(`${getPercentWidth(properties.width)}%`);
    // }

    for (let i = props.config.columnFrozen; i < props.config.header.length; i++) {
      const item = props.config.header[i];
      data2.push(item);
    }

    return (
      <View
        style={globalStyles.flexDirectionRow}
        onLayout={event => {
          getElementDimensions(event.nativeEvent.layout as TextLayoutLine, 'child');
        }}
      >
        {data && formatIdentityColumn()}

        {data &&
          (props.noFlatList === true ? (
            <View style={[globalStyles.container, globalStyles.flexDirectionRow]}>
              {data2.map((item, index) => {
                return formatColumn2(item, index);
              })}
            </View>
          ) : (
            <FlatList
              // style={[
              //   styles.body,
              //   { marginLeft: frozenWidth },
              // ]}
              //temp
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={data2}
              renderItem={formatColumn}
              stickyHeaderIndices={[0]}
              onScroll={scrollEvent}
              onScrollBeginDrag={onBodyBeginDrag}
              onScrollEndDrag={onBodyEndDrag}
              onMomentumScrollBegin={onBodyBeginDrag}
              onMomentumScrollEnd={onBodyEndDrag}
              scrollEventThrottle={16}
              extraData={false}
              ref={bodyScrollView}
              // không chắc dòng trên
              keyExtractor={(_item: ISheetDataColumn, index: number) => index.toString()}
            />
          ))}
      </View>
    );
  };

  const data1 = data != null && data.length > 0 ? [{ key: 'body', render: formatBody() }] : [];

  return (
    <View
      style={[!props.noFlex && globalStyles.container]}
      onLayout={event => {
        getElementDimensions(event.nativeEvent.layout as TextLayoutLine, 'parent');
      }}
    >
      {(!props.ListEmptyComponent || (props.ListEmptyComponent != null && data1.length > 0)) && formatHeader()}
      <View style={props.containerStyle}>
        {props.noFlatList === true && data1[0] != null ? (
          data1[0].render
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            data={data1}
            renderItem={formatRowForSheet}
            onEndReached={handleScrollEndReached}
            onEndReachedThreshold={0.005}
            ListFooterComponent={renderFooter}
            keyExtractor={(_item: { key: string }, index: number) => index.toString()}
            refreshControl={<RefreshControl refreshing={false} onRefresh={props.onRefreshData} />}
            extraData={data}
            scrollEnabled={isScrollEnabled}
            initialNumToRender={props.iniData}
            contentContainerStyle={[
              props.contentContainerStyle,
              isScrollEnabled
                ? {
                    paddingBottom: scaleSize(8),
                  }
                : null,
            ]}
            ListEmptyComponent={props.ListEmptyComponent}
          />
        )}
      </View>
    </View>
  );
};

export default memo(SheetData);
