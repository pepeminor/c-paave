import React, { memo } from 'react';
import { ScrollView, Text, TouchableWithoutFeedback } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from 'screens/RootNavigation';
import { MarketCategories, MarketCategoriesLiteral } from 'screens/PriceBoardFullScreen';
import ItemSelectedIcon from 'assets/icon/FilterSelectIcon.svg';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SelectPriceBoardEventHandler } from 'components/PriceBoardSelector/event';
import { useIsLandscape } from 'hooks/useIsLandscape';

const PriceBoardSelector = (props: StackScreenProps<'PriceBoardSelectorPortrait' | 'PriceBoardSelectorLandScape'>) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const { initValue, priceBoardType } = props.route.params;
  const isLandscape = useIsLandscape();

  const onPressItem = (item: MarketCategoriesLiteral) => () => {
    SelectPriceBoardEventHandler.onPriceBoardSelected(item);
    props.navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={props.navigation.goBack}>
      <View style={styles.container}>
        <Animated.View
          style={isLandscape ? styles.modalContainerLandscape : styles.modalContainerPortrait}
          entering={FadeInDown.duration(300)}
        >
          <Text allowFontScaling={false} style={styles.priceBoardType}>
            {priceBoardType}
          </Text>
          <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
            {Object.entries(MarketCategories).map(([key, value]) => {
              return (
                <View key={key}>
                  <Text allowFontScaling={false} style={styles.groupText}>
                    {t(key)}
                  </Text>
                  {value.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={item}
                        style={[
                          styles.itemContainer,
                          index !== 0 && styles.borderTop,
                          index !== value.length && styles.borderBottom,
                        ]}
                        onPress={onPressItem(item)}
                      >
                        <Text allowFontScaling={false} style={styles.itemText}>
                          {t(item)}
                        </Text>
                        {item === initValue && <ItemSelectedIcon />}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(PriceBoardSelector);
