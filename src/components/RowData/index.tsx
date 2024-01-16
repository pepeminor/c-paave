import React, { memo } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle, TouchableOpacity } from 'react-native';
import OutlineRight from 'assets/icon/OutlineRight.svg';
import OutlineDown from 'assets/icon/IconOutlineDown.svg';
import globalStyles, { scaleSize } from 'styles';

import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import useMemoizedStyles from 'hooks/useMemoizedStyles';

interface IPropsRowData {
  title: string;
  svg?: Object;
  navigate?(): void;
  isDown?: boolean;

  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const Svg = memo((props: any) => {
  return <View>{props.svg ? <props.svg height={scaleSize(24)} width={scaleSize(24)} /> : null}</View>;
});

const RowData = ({ title, svg, navigate, containerStyle = {}, titleStyle = {}, isDown }: IPropsRowData) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const memoizedStyles = useMemoizedStyles({
    container: [styles.container, containerStyle],
    titleStyle: [styles.title, titleStyle],
  });

  return (
    <TouchableOpacity onPress={navigate} style={globalStyles.flexDirectionRow}>
      <View style={memoizedStyles.container}>
        <View style={styles.container}>
          <Svg svg={svg} />
          <View style={styles.titleContainer}>
            <Text style={memoizedStyles.titleStyle}>{t(title)}</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>{isDown ? <OutlineDown /> : <OutlineRight />}</View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(RowData);
