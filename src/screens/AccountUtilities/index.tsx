import React, { memo } from 'react';
import { View, TouchableOpacity, FlatList, ListRenderItemInfo } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import useStyles from './styles';
import globalStyles, { scaleSize } from 'styles';
import ShareIcon from 'assets/icon/ShareIcon.svg';
import IconSupport from 'assets/icon/IconSupport.svg';
import RowData from '../../components/RowData/index';
import HeaderScreen from 'components/HeaderScreen';
import iconStockTransfer from 'assets/icon/iconStockTransfer.svg';
import iconRightExercise from 'assets/icon/iconRightExcercise.svg';
import IconOrderConfirm from 'assets/icon/IconOrderConfirm.svg';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

const AccountUtilities = (props: StackScreenProps<'AccountUtilities'>) => {
  const { styles } = useStyles();
  const renderItem = ({ item }: ListRenderItemInfo<IFakeDataType>) => {
    return (
      <RowData
        title={item.title}
        svg={item.svg}
        navigate={item.navigate}
        containerStyle={styles.rowData}
        titleStyle={styles.rowDataText}
      />
    );
  };

  type IFakeDataType = {
    title: string;
    svg: Object;
    navigate(): void;
  };

  const AccountUtilities: IFakeDataType[] = [
    {
      title: 'Stock Transfer',
      svg: iconStockTransfer,
      navigate: () => {
        props.navigation.navigate(ScreenNames.StockTransfer);
      },
    },
    {
      title: 'Right Exercise',
      svg: iconRightExercise,
      navigate: () => {
        props.navigation.navigate(ScreenNames.UtilitiesRightExercise);
      },
    },
    {
      title: 'Order Confirmation',
      svg: IconOrderConfirm,
      navigate: () => {
        props.navigation.navigate(ScreenNames.OrderConfirmation);
      },
    },
  ];

  const goToLiveChat = () => {
    props.navigation.navigate('LiveChat');
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={goBack}
        headerTitle={'Utilities'}
        rightButtonListIcon={[
          <TouchableOpacity>
            <ShareIcon style={globalStyles.hide} height={scaleSize(24)} width={scaleSize(24)} />
          </TouchableOpacity>,
        ]}
      />
      <View style={styles.container}>
        <FlatList showsVerticalScrollIndicator={false} data={AccountUtilities} renderItem={renderItem} />
      </View>
      <TouchableOpacity onPress={goToLiveChat} style={[globalStyles.containerSupport, globalStyles.hide]}>
        <IconSupport width={scaleSize(106)} height={scaleSize(106)} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(AccountUtilities);
