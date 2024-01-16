import React, { useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import ItemSelectedIcon from 'assets/icon/FilterSelectIcon.svg';
import MenuIcon from 'assets/icon/IconOddlot.svg';
import { MarketCategories, MarketCategoriesLiteral, PriceBoardType } from 'screens/PriceBoardFullScreen';
import useHandlers from 'hooks/useHandlers';
import { navigate, navigationRef } from 'utils';
import ModalBottom from 'components/ModalBottom';
import RotatePhoneIconComponent from './RotatePhoneIcon.component';
import { useIsLandscape } from 'hooks/useIsLandscape';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../styles';
import { SelectPriceBoardEventHandler } from 'components/PriceBoardSelector/event';

interface PriceBoardSelector {
  priceBoardType: PriceBoardType;
  value: string;
  onChange: (value: MarketCategoriesLiteral) => void;
}

const PriceBoardSelector = (props: PriceBoardSelector) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
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
      setModalVisible(true);
    },
    onPressItem: (value: MarketCategoriesLiteral) => () => {
      SelectPriceBoardEventHandler.onPriceBoardSelected(value);
      setModalVisible(false);
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
      <ModalBottom
        visible={modalVisible}
        setVisible={setModalVisible}
        supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']}
      >
        <View style={styles.modalContainer}>
          <Text allowFontScaling={false} style={styles.priceBoardType}>
            {props.priceBoardType}
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
                        onPress={handler.onPressItem(item)}
                      >
                        <Text allowFontScaling={false} style={styles.itemText}>
                          {t(item)}
                        </Text>
                        {item === props.value && <ItemSelectedIcon />}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ModalBottom>
    </View>
  );
};

export default withMemo(PriceBoardSelector);
