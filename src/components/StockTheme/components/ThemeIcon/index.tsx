import { Image, View, StyleProp, ImageStyle } from 'react-native';
import React, { useState } from 'react';
import { scaleSize } from 'styles';
import useStyles from './styles';
import withMemo from 'HOC/withMemo';

export interface Props {
  logoName: string;
  logoStyle?: StyleProp<ImageStyle>;
}

const ThemeIcon = ({ logoName, logoStyle }: Props) => {
  const [valid, setValid] = useState(true);

  const { styles } = useStyles();

  const handleError = () => {
    setValid(false);
  };

  return (
    <View style={valid && styles.imageContainer}>
      <Image
        onError={handleError}
        source={{
          uri: `https://paave-mobile-resource.s3.ap-southeast-1.amazonaws.com/theme-logo/${logoName}.png`,
        }}
        resizeMode="contain"
        style={logoStyle}
        height={scaleSize(24)}
        width={scaleSize(24)}
      />
    </View>
  );
};

export default withMemo(ThemeIcon);
