import React from 'react';
import { View } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { useTranslation } from 'react-i18next';
import PaaveText from 'components/PaaveText';

const EmptyPost = () => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <EmptySymbol />
      <PaaveText style={styles.textStyles}>{t('There is no data')}</PaaveText>
    </View>
  );
};

export default withMemo(EmptyPost);

const useStyles = getStylesHook({
  container: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyles: {
    paddingTop: 16,
  },
});
