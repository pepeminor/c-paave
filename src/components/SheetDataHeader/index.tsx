import { isEqual } from 'lodash';
import React, { memo, useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import Animated, { StyleProps } from 'react-native-reanimated';
import { HeaderConfig } from 'components/SheetData3';
import HeaderCell from './components/HeaderCell.component';
import useStyles from './styles';

export interface SheetDataHeaderProps extends HeaderConfig, ViewProps {
  frozenStyle?: StyleProps;
}

const SheetDataHeader = ({ data, height, frozenStyle, style: viewStyle, ...viewProps }: SheetDataHeaderProps) => {
  const { styles } = useStyles();

  const totalWidth = data.map(item => (Array.isArray(item) ? item[0] : item)).reduce((pre, cur) => pre + cur.width, 0);

  const frozenStyles = useMemo(() => [styles.frozenColumn, frozenStyle], [styles.frozenColumn, frozenStyle]);

  const children = data.map((item, key) =>
    Array.isArray(item) ? (
      <View key={key}>
        {item.map((cell, cellKey) => (
          <Animated.View
            style={[
              globalStyles.container,
              globalStyles.centered,
              cellKey !== 0 && globalStyles.borderTop1,
              cell.frozen && frozenStyles,
            ]}
            key={cellKey}
          >
            <HeaderCell {...cell} />
          </Animated.View>
        ))}
      </View>
    ) : (
      <Animated.View style={item.frozen && frozenStyles} key={key}>
        <HeaderCell {...item} />
      </Animated.View>
    )
  );

  return (
    <View
      style={[
        styles.container,
        {
          height: scaleSize(height),
          width: scaleSize(totalWidth),
        },
        viewStyle,
      ]}
      {...viewProps}
    >
      {children}
    </View>
  );
};

export default memo(SheetDataHeader, (prevProps, nextProps) => isEqual(prevProps.data, nextProps.data));
