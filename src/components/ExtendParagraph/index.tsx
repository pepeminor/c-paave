import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import ExtendIcon from 'assets/icon/IconOutlineArrowDown.svg';
import OutlineUp from 'assets/icon/OutlineUp.svg';

import useStyles from './styles';

export interface IExtendParagraphProps {
  height: number;
  content: React.ReactElement;
}
const ExtendParagraph = (props: IExtendParagraphProps) => {
  const { styles } = useStyles();
  const [extended, setExtended] = useState(false);
  const toggleExtend = () => {
    setExtended(!extended);
  };
  const contentStyle: ViewStyle = !extended ? { height: scaleSize(props.height), overflow: 'hidden' } : {};
  return (
    <View>
      <View style={[contentStyle, styles.content]}>{props.content}</View>
      <TouchableOpacity
        style={[globalStyles.centered, globalStyles.flexDirectionRow, styles.extendButtonArea]}
        onPress={toggleExtend}
      >
        <Text allowFontScaling={false} style={styles.extendText}>{`${extended ? 'Hide' : 'View more'}`}</Text>
        {extended ? (
          <OutlineUp height={scaleSize(24)} width={scaleSize(24)} />
        ) : (
          <ExtendIcon height={scaleSize(24)} width={scaleSize(24)} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ExtendParagraph;
