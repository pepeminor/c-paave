import { SheetDataProps } from 'components/SheetData3';
import useMemoizedStyles from 'hooks/useMemoizedStyles';
import { isEqual } from 'lodash';
import React, { memo } from 'react';
import { ScrollView, View } from 'react-native';
import globalStyles from 'styles';

function SheetData<T>({
  data,
  HeaderComponent,
  RowComponent,
  style,
  scrollViewRef,
  ...scrollViewProps
}: SheetDataProps<T>) {
  const { containerStyle } = useMemoizedStyles({
    containerStyle: [globalStyles.flexDirectionCol, style],
  });
  return (
    <View>
      {HeaderComponent != null && <HeaderComponent />}
      <ScrollView style={containerStyle} ref={scrollViewRef} {...scrollViewProps} showsVerticalScrollIndicator={false}>
        <View>
          {data?.map((item, index) => (
            <RowComponent index={index} data={item} key={index} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export const ScrollViewNoHorizontalScroll = memo(SheetData, isEqual) as typeof SheetData;
