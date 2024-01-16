import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Arrow from 'assets/icon/arrow.svg';
import ArrowLeft from 'assets/icon/IconArrowLeft.svg';
import useStyles from '../styles';
import globalStyles from 'styles';

type CellProps = {
  plViewType?: boolean;
  onPress?: () => void;
};

const CellPL = ({ plViewType, onPress }: CellProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  return (
    <TouchableOpacity style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]} onPress={onPress}>
      {!plViewType && <ArrowLeft />}
      {!plViewType && <Text style={styles.headerText}>{t('P/L')}</Text>}
      {plViewType && <Text style={styles.headerText}>{t('P/L (%)')}</Text>}
      {plViewType && <Arrow />}
    </TouchableOpacity>
  );
};

export default memo(CellPL);
