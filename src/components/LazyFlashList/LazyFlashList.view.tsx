import { FlashList } from '@shopify/flash-list';
import withMemo from 'HOC/withMemo';
import { useColors } from 'hooks/useStyles';
import React, { forwardRef } from 'react';
import { RefreshControl } from 'react-native';
import { insertObjectIf } from 'utils';
import { useLazyFlashListLogic } from './LazyFlashList.logic';
import { IProps } from './LazyFlashList.type';

const LazyFlashList = forwardRef((props: IProps, ref: any) => {
  const { state, handlers } = useLazyFlashListLogic(props);
  const dynamicColors = useColors();

  const { onRefresh, refreshing, progressViewOffset, ...rest } = props;

  return (
    <FlashList
      onEndReachedThreshold={0.5}
      onEndReached={handlers.onLoadMore}
      {...rest}
      {...insertObjectIf(onRefresh, {
        refreshControl: (
          <RefreshControl
            refreshing={refreshing!}
            onRefresh={props.onRefresh!}
            tintColor={dynamicColors.BLACK}
            progressViewOffset={progressViewOffset}
          />
        ),
      })}
      ref={ref}
      data={state.dataList}
    />
  );
});

export default withMemo(LazyFlashList);
