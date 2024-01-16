import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from '../styles';
import { HeaderCellProps } from 'components/SheetData3';
import { Text, View } from 'react-native';
import { scaleSize } from 'styles';

const HeaderCell = ({ content, width }: HeaderCellProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const renderCellContent = () => {
    switch (typeof content) {
      case 'string':
        return (
          <Text allowFontScaling={false} style={styles.headerText}>
            {t(content)}
          </Text>
        );
      case 'function':
        return content();
      default:
        return content;
    }
  };

  return <View style={[styles.headerCell, { width: scaleSize(width) }]}>{renderCellContent()}</View>;
};

export default memo(HeaderCell);
