import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import Question from 'assets/icon/AskScore.svg';
import { ORDER_TYPE } from 'global';
import { scaleSize } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import NormalModal from '../NormalModal';
import StopModal from '../StopModal';

interface Props {
  filterSelecting: ORDER_TYPE;
}

const TradeOrderQuestion = ({ filterSelecting }: Props) => {
  const { styles } = useStyles();
  const [visible, setVisible] = useState(false);

  const handleModal = useCallback(() => {
    setVisible(prod => !prod);
  }, []);

  return filterSelecting === ORDER_TYPE.NORMAL_ORDER ? (
    <TouchableOpacity style={styles.iconQuestion} onPress={handleModal}>
      <Question width={scaleSize(20)} height={scaleSize(20)} />
      {visible && <NormalModal isVisible={visible} handleVisible={handleModal} />}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={styles.iconQuestion} onPress={handleModal}>
      <Question width={scaleSize(20)} height={scaleSize(20)} />
      {visible && <StopModal isVisible={visible} handleVisible={handleModal} />}
    </TouchableOpacity>
  );
};

export default React.memo(TradeOrderQuestion);

const useStyles = getStylesHook({
  iconQuestion: {
    paddingHorizontal: 14,
  },
});
