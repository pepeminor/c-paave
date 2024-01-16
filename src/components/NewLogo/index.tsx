import React from 'react';
import { Text, View } from 'react-native';
import { scaleSize, lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import withMemo from 'HOC/withMemo';

type NewLogoProps = {
  width?: number;
  height?: number;
  fontSize?: number;
  xOffset?: number;
  yOffset?: number;
  position?: 'absolute' | 'relative';
};

const NewLogo = ({
  width = 50,
  height = 25,
  fontSize = 13,
  xOffset = 0,
  yOffset = 0,
  position = 'relative',
}: NewLogoProps) => {
  const { styles } = useStyles();
  return (
    <View
      style={[
        styles.container,
        {
          position,
          width: scaleSize(width),
          height: scaleSize(height),
          top: scaleSize(xOffset),
          right: scaleSize(yOffset),
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: scaleSize(fontSize),
          },
        ]}
        allowFontScaling={false}
      >
        New!
      </Text>
    </View>
  );
};

export default withMemo(NewLogo);

const useStyles = getStylesHook({
  container: {
    width: 50,
    height: 35,
    borderRadius: 6,
    backgroundColor: Colors.LIGHTRed,
    // position: 'absolute',
    top: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.WHITE,
  },
});
