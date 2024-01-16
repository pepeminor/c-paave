import React from 'react';
import { View, Text, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useAiRatingFilterLogic } from './AIRatingFilter.logic';
import useStyles from './AIRatingFilter.style';
import { IProps } from './AIRatingFilter.type';
import withMemo from 'HOC/withMemo';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon';
import globalStyles from 'styles';
import CheckBox from 'components/CheckBox';
import Slider from './components/Slider';
import ModalBottom from 'components/ModalBottom';
import RenderHTML from 'react-native-render-html';
import Grabber from 'assets/icon/Grabber.svg';
import Button from 'components/Button';

const AiRatingFilter = (props: IProps) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { state, handlers } = useAiRatingFilterLogic(props);
  const { styles, dynamicColors } = useStyles();
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <HeaderScreen
        goBackAction={navigation.goBack}
        leftButtonIcon={true}
        headerTitle={
          <View style={styles.headerTitleContainer}>
            <Icon size={24} color={dynamicColors.WHITE} name={'filter'} />
            <Text allowFontScaling={false} style={styles.headerTitle}>
              {t('Filter')}
            </Text>
          </View>
        }
      />
      <View style={styles.stockTypeContainer}>
        <CheckBox
          value={state.stockFilter.VN30}
          label="VN30"
          handleOnPress={handlers.vn30Pressed}
          style={styles.stockTypeItem}
        />
        <CheckBox
          value={state.stockFilter.HNX30}
          label="HNX30"
          handleOnPress={handlers.hnx30Pressed}
          style={styles.stockTypeItem}
        />
        <CheckBox
          value={state.stockFilter.UPCOM}
          label="Upcom"
          handleOnPress={handlers.upcomPressed}
          style={styles.stockTypeItem}
        />
      </View>
      <View style={styles.sliderContainer}>
        <TouchableOpacity style={styles.sliderTouchable} onPress={handlers.openModalAIRating}>
          <Text allowFontScaling={false} style={styles.filterTitle}>
            {t('AI Rating')}
          </Text>
        </TouchableOpacity>
        <Slider onRelease={handlers.onAIRatingReleased} initialValue={state.stockFilter.rating} />
      </View>
      <View style={styles.sliderContainer}>
        <TouchableOpacity style={styles.sliderTouchable} onPress={handlers.openModalTechnicalScore}>
          <Text allowFontScaling={false} style={styles.filterTitle}>
            {t('Technical Score')}
          </Text>
        </TouchableOpacity>
        <Slider onRelease={handlers.onTechnicalScoreReleased} initialValue={state.stockFilter.technical} />
      </View>
      <View style={styles.sliderContainer}>
        <TouchableOpacity style={styles.sliderTouchable} onPress={handlers.openModalValuationScore}>
          <Text allowFontScaling={false} style={styles.filterTitle}>
            {t('Valuation Score')}
          </Text>
        </TouchableOpacity>
        <Slider onRelease={handlers.onValuationScoreReleased} initialValue={state.stockFilter.valuation} />
      </View>
      <View style={styles.sliderContainer}>
        <TouchableOpacity style={styles.sliderTouchable} onPress={handlers.openModalQualityScore}>
          <Text allowFontScaling={false} style={styles.filterTitle}>
            {t('Quality Score')}
          </Text>
        </TouchableOpacity>
        <Slider onRelease={handlers.onQualityScoreReleased} initialValue={state.stockFilter.quality} />
      </View>
      <View style={globalStyles.container} />
      <Button label="Apply" buttonType="Primary" onPress={handlers.applyFilter} />
      <Button label="Reset" buttonType="Secondary" onPress={handlers.resetFilter} />

      <ModalBottom visible={state.modalVisible} setVisible={handlers.handleModalVisible}>
        <View style={styles.modalContainer}>
          <View style={globalStyles.centered}>
            <Grabber />
          </View>
          <Text allowFontScaling={false} style={styles.modalTitle}>
            {t(state.modalInfo.title)}
          </Text>
          <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <RenderHTML contentWidth={width} source={{ html: t(state.modalInfo.content) }} />
          </ScrollView>
        </View>
      </ModalBottom>
    </View>
  );
};

export default withMemo(AiRatingFilter);
