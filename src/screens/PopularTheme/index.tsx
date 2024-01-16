import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import useStyles from './styles';
import StockTheme from 'components/StockTheme';
import { useAppSelector } from 'hooks/useAppSelector';
import { StockThemeSelector } from 'reduxs';
import { useTranslation } from 'react-i18next';

const PopularTheme = (props: StackScreenProps<'PopularTheme'>) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  const lastUpdateTime = useAppSelector(StockThemeSelector.lastUpdateTime);

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={'Popular Theme'} />
      {lastUpdateTime != null && (
        <Text allowFontScaling={false} style={styles.basedOnText}>
          {t('Last Updated')} {lastUpdateTime}
        </Text>
      )}
      <StockTheme />
    </View>
  );
};

export default memo(PopularTheme);
