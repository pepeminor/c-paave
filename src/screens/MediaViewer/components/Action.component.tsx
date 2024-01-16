import withMemo from 'HOC/withMemo';
import PaaveButton from 'components/PaaveButton';
import { BUTTON_TYPE } from 'components/PaaveButton/type';
import PaaveText from 'components/PaaveText';
import { getStylesHook } from 'hooks';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { lightColors, scaleSize } from 'styles';

interface IProps {
  onGoBack(): void;
  style?: StyleProp<ViewStyle>;
  indexImage: number;
  listLength: number;
}

const Action = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  return (
    <Animated.View style={[styles.container, props.style]}>
      <PaaveButton
        type={BUTTON_TYPE.SOLID}
        isOnlyIcon={true}
        icon={'arrow-left'}
        iconSize={scaleSize(24)}
        style={styles.btn}
        iconStyle={styles.iconBack}
        onPress={props.onGoBack}
      />
      <PaaveText color={dynamicColors.WHITE}>{`${props.indexImage + 1}/${props.listLength}`}</PaaveText>
    </Animated.View>
  );
};

export default withMemo(Action);

const useStyles = getStylesHook({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingTop: 36,
    paddingHorizontal: 12,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    borderWidth: 0,
  },
  iconBack: {
    color: lightColors.WHITE,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    bottom: -27,
    left: 0,
    right: 0,
  },
});
