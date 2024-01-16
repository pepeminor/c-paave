import { isEqual } from 'lodash';
import React, { ComponentType, memo, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View, ViewProps } from 'react-native';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import useStyles from '../styles';

interface HeaderCellProps extends ViewProps {
  text: string | React.ReactNode | (() => JSX.Element);
  width: number;
  borderLeft?: boolean;
}

export interface SheetDataHeaderProps {
  data: (HeaderCellProps | HeaderCellProps[])[];
  height: number;
  Wrapper?: ComponentType<PropsWithChildren<ViewProps>>;
}

const HeaderCell = memo(({ text, width, borderLeft }: HeaderCellProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const renderText = () => {
    switch (typeof text) {
      case 'string':
        return (
          <Text allowFontScaling={false} style={styles.headerText}>
            {t(text)}
          </Text>
        );
      case 'function':
        return text();
      default:
        return text;
    }
  };

  return (
    <View style={[styles.headerCell, borderLeft && globalStyles.borderLeft1, { width: scaleSize(width) }]}>
      {renderText()}
    </View>
  );
});

const SheetDataHeader = memo(
  ({ data, height, Wrapper = View }: SheetDataHeaderProps) => {
    const totalWidth = data
      .map(item => (Array.isArray(item) ? item[0] : item))
      .reduce((pre, cur) => pre + cur.width, 0);

    const children = data.map((item, key) =>
      Array.isArray(item) ? (
        <View style={[globalStyles.container, key !== 0 && globalStyles.borderLeft1]} key={key}>
          {item.map((cell, cellKey) => (
            <View
              style={[globalStyles.container, globalStyles.centered, cellKey !== 0 && globalStyles.borderTop1]}
              key={cellKey}
            >
              <HeaderCell {...cell} />
            </View>
          ))}
        </View>
      ) : (
        <HeaderCell {...item} key={key} borderLeft={key !== 0} />
      )
    );
    return (
      <Wrapper
        style={[
          globalStyles.borderBottom1,
          globalStyles.borderTop1,
          {
            height: scaleSize(height),
            width: scaleSize(totalWidth),
            backgroundColor: Colors.LIGHTTitleTable,
          },
        ]}
      >
        {children}
      </Wrapper>
    );
  },
  (prev, curr) => isEqual(prev, curr)
);

export default SheetDataHeader;
