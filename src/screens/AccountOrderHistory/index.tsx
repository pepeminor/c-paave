// TODO: Marked as unused Screen
import React, { memo } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
// import ShareIcon from 'assets/icon/ShareIcon.svg';
import History from 'assets/icon/History.svg';
import OrderBook from 'assets/icon/OrderBook.svg';
import ConditionalOrder from 'assets/icon/ConditionalOrder.svg';
import useStyles from './styles';
import { OrderBookScreenInitOption } from 'global';
import RowData from '../../components/RowData/index';
// import IconSupport from 'assets/icon/IconSupport.svg';
import HeaderScreen from 'components/HeaderScreen';

const AccountOrderHistory = (props: StackScreenProps<'AccountOrderHistory'>) => {
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

  const AccountOrder: IFakeDataType[] = [
    {
      title: 'Orderbook',
      svg: OrderBook,
      navigate: () => props.navigation.navigate('OrderBook', { initOption: OrderBookScreenInitOption.ORDER_BOOK }),
    },
    {
      title: 'Order History',
      svg: History,
      navigate: () => props.navigation.navigate('OrderBook', { initOption: OrderBookScreenInitOption.ORDER_HISTORY }),
    },
    {
      title: 'Cond. Order History',
      svg: ConditionalOrder,
      navigate: () => props.navigation.navigate('OrderBook', { initOption: OrderBookScreenInitOption.CONDITION_ORDER }),
    },
  ];

  const goBack = () => {
    props.navigation.goBack();
  };

  // const goToLiveChat = () => {
  //   props.navigation.navigate('LiveChat');
  // };

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={goBack}
        headerTitle={'Order History'}
        // //  Ẩn PAAVE-675
        // rightButtonListIcon={[
        //   <TouchableOpacity>
        //     <ShareIcon height={hp(`${getPercentHeight(24)}%`)} width={wp(`${getPercentWidth(24)}%`)} />
        //   </TouchableOpacity>,
        // ]}
      />
      <View style={styles.container}>
        <FlatList showsVerticalScrollIndicator={false} data={AccountOrder} renderItem={renderItem} />
      </View>
      {/* // Ẩn các phần chưa launch PAAVE-527
      <TouchableOpacity onPress={goToLiveChat} style={[globalStyles.containerSupport]}>
        <IconSupport width={wp(`${getPercentWidth(106)}%`)} height={hp(`${getPercentHeight(106)}%`)} />
      </TouchableOpacity> */}
    </View>
  );
};

export default memo(AccountOrderHistory);
