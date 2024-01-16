import React, { useRef } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import MenuIcon from 'assets/icon/IconOddlot.svg';
import { MarketCategoriesLiteral, PriceBoardType } from 'screens/PriceBoardFullScreen';
import useHandlers from 'hooks/useHandlers';
import { navigate, navigationRef } from 'utils';
import RotatePhoneIconComponent from './RotatePhoneIcon.component';
import { useIsLandscape } from 'hooks/useIsLandscape';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../styles';

interface PriceBoardSelector {
  priceBoardType: PriceBoardType;
  value: string;
  onChange: (value: MarketCategoriesLiteral) => void;
}

const PriceBoardSelector = (props: PriceBoardSelector) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const isLandscape = useIsLandscape();

  const propsRef = useRef({
    ...props,
    isLandScape: isLandscape,
  });
  propsRef.current = { ...propsRef.current, ...props, isLandScape: isLandscape };
  const handler = useHandlers({
    goFullScreen: () => {
      if (propsRef.current.isLandScape) {
        navigationRef.goBack();
      } else {
        navigate({
          key: 'IntermediateVerticalScreen',
          params: {
            nextScreen: 'PriceBoardFullScreen',
            nextScreenParams: {
              priceBoardType: propsRef.current.priceBoardType,
              selectedList: propsRef.current.value,
            },
          },
        });
      }
    },
    showModal: () => {
      navigate({
        key: isLandscape ? 'PriceBoardSelectorLandScape' : 'PriceBoardSelectorPortrait',
        params: {
          initValue: propsRef.current.value,
        },
      });
    },
  });

  return (
    <View style={[styles.container, isLandscape && styles.smallContainer]}>
      {isLandscape && (
        <View style={styles.landscapeHeaderContainer}>
          <Text allowFontScaling={false} style={styles.landscapeHeader}>
            {t(props.priceBoardType)}
          </Text>
        </View>
      )}
      <TouchableWithoutFeedback onPress={handler.showModal}>
        <View style={styles.selectorContainer}>
          <Text allowFontScaling={false} style={styles.currentValue}>
            {t(props.value)}
          </Text>
          <View>
            <MenuIcon />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <RotatePhoneIconComponent style={styles.fullScreenBtn} onPress={handler.goFullScreen} isLandScape={isLandscape} />
    </View>
  );
};

export default withMemo(PriceBoardSelector);
