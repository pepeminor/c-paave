import React, { useCallback } from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { lightColors } from 'styles';
import { mapV2, navigateToSymbolInfoOverview } from 'utils';
import { useDispatch } from 'react-redux';

interface IProps {
  data: string[];
  containerStyle?: StyleProp<ViewStyle>;
  showFull?: boolean;
}

const ListStockTag = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();
  const data = props.showFull ? props.data : props.data.slice(0, 3);

  const renderItemTag = useCallback(({ item, index }) => {
    const symbol = item.toUpperCase();
    const onPress = () => {
      navigateToSymbolInfoOverview(symbol, dispatch);
    };
    return (
      <TouchableOpacity key={index} onPress={onPress} style={styles.containerSymbol}>
        <PaaveText type={TEXT_TYPE.REGULAR_14} color={dynamicColors.LIGHTTextContent}>
          {symbol}
        </PaaveText>
      </TouchableOpacity>
    );
  }, []);

  if (props.data.length === 0) return null;

  return (
    <View style={[styles.containerTag, props.containerStyle]}>
      {mapV2(data, (item, index) => {
        return renderItemTag({ item, index });
      })}
    </View>
  );
};

const useStyles = getStylesHook({
  containerTag: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  containerSymbol: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: lightColors.BORDER,
    borderRadius: 10,
    marginRight: 8,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withMemo(ListStockTag);
