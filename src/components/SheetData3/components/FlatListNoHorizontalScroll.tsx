import { SheetDataProps } from 'components/SheetData3';
import useMemoizedStyles from 'hooks/useMemoizedStyles';
import { isEqual } from 'lodash';
import React, { memo, useCallback } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import globalStyles from 'styles';

function SheetData<T>({
  data,
  HeaderComponent,
  RowComponent,
  style,
  ListHeaderComponent,
  flatListRef,
  ...flatListProps
}: SheetDataProps<T>) {
  const renderItem: ListRenderItem<T> = useCallback(
    ({ item, index }) => <RowComponent index={index} data={item} key={index} />,
    [RowComponent]
  );
  const { containerStyle } = useMemoizedStyles({
    containerStyle: [globalStyles.flexDirectionCol, style],
  });
  return (
    <View style={containerStyle}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {ListHeaderComponent}
            {HeaderComponent != null && <HeaderComponent />}
          </>
        }
        data={data}
        renderItem={renderItem}
        ref={flatListRef}
        {...flatListProps}
      />
    </View>
  );
}

export const FlatListNoHorizontalScroll = memo(SheetData, isEqual) as typeof SheetData;
