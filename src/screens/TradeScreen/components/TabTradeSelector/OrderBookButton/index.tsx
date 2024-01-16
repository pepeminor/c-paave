import { TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import Notebook from 'assets/icon/notebookBlue.svg';
import { useAppSelector } from 'hooks/useAppSelector';

interface IOrderBookButtonProp {
  goToOrderBook(): void;
}

const OrderBookButton = ({ goToOrderBook }: IOrderBookButtonProp) => {
  const { styles } = useStyles();
  const accessToken = useAppSelector(state => state.authToken.accessToken);

  return (
    <TouchableOpacity
      onPress={goToOrderBook}
      disabled={!accessToken && true}
      style={[!accessToken && globalStyles.disableBackground, styles.notebookContainer]}
    >
      <Notebook width={scaleSize(24)} height={scaleSize(24)} />
    </TouchableOpacity>
  );
};

export default memo(OrderBookButton);
