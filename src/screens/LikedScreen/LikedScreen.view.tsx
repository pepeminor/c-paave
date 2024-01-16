import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useLikedScreenLogic } from './LikedScreen.logic';
import useStyles from './LikedScreen.style';
import { IProps } from './LikedScreen.type';
import withMemo from 'HOC/withMemo';
import HeaderScreen from 'components/HeaderScreen';
import { IAccountData } from 'reduxs';
import AccountItem from 'components/AccountItem';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';

const LikedScreen = (props: IProps) => {
  // eslint-disable-next-line no-empty-pattern
  const {} = useLikedScreenLogic(props);
  const { styles } = useStyles();

  const renderItem = useCallback(({ item }: ListRenderItemInfo<IAccountData>) => {
    return (
      <View key={item.id} style={styles.containerItem}>
        <AccountItem item={item} />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={'liked.by'} />
      <FlashList data={props.likedList} renderItem={renderItem} estimatedItemSize={60} />
    </View>
  );
};

export default withMemo(LikedScreen);
