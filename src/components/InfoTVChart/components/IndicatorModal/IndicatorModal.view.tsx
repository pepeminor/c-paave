import React, { memo } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Grabber from 'assets/icon/Grabber.svg';
import CloseIcon from 'assets/icon/btn_close.svg';
import Svg, { Path } from 'react-native-svg';
import { lightColors, scaleSize } from 'styles';
import { useTranslation } from 'react-i18next';
import useStyle from './IndicatorModal.style';
import { IIndicatorModalProps } from './IndicatorModal.type';
import useIndicatorModalLogic from './IndicatorModal.logic';
import { IndicatorSelectionRow1, IndicatorSelectionRow3 } from './IndicatorModal.data';

const IndicatorModalView = (props: IIndicatorModalProps) => {
  const { t } = useTranslation();
  const { styles } = useStyle();
  const { handlers } = useIndicatorModalLogic(props);

  return (
    <View style={styles.container}>
      <View style={styles.grabber}>
        <Grabber />
      </View>

      <View style={styles.headerContainer}>
        <Text allowFontScaling={false} style={styles.headerTitleText}>
          {t('Indicators Selection')}
        </Text>
        <TouchableOpacity style={styles.headerCloseBtn} onPress={props.closeModal}>
          <CloseIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>{handlers.RenderIndicatorItem(IndicatorSelectionRow1)}</View>
      {/* <View style={styles.contentContainer}>{RenderIndicatorItem(IndicatorSelectionRow2)}</View> */}
      <View style={styles.lineContainer}>
        <Svg height="1" width="100%">
          <Path
            d={`M0 0 H${scaleSize(400)}`}
            stroke={lightColors.DARKTextDisable}
            strokeWidth="1"
            strokeDasharray="2.5"
            strokeDashoffset="0"
          />
        </Svg>
      </View>
      <View style={styles.contentContainer}>{handlers.RenderIndicatorItem(IndicatorSelectionRow3)}</View>
    </View>
  );
};

export default memo(IndicatorModalView);
