import React, { useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, useWindowDimensions } from 'react-native';
import globalStyles from 'styles';
import useStyles from './styles';
import RowData from 'components/RowData';
import { useTranslation } from 'react-i18next';
import RenderHtml, { HTMLSource } from 'react-native-render-html';
import Modal from 'components/Modal';
import { IconWithBackground } from 'components/Icon/icons';
interface TPropsModalOrder {
  isVisibleText?: boolean;

  handleVisible(): void;
  goToAIRatingScreen?(): void;
}

const AIRatingModal_stickyHeaderIndices = [0];

const AIRatingModal = ({ isVisibleText, handleVisible, goToAIRatingScreen }: TPropsModalOrder) => {
  const [isTechExpand, setIsTechExpand] = useState<boolean>(false);
  const [isValExpand, setIsValExpand] = useState<boolean>(false);
  const [isQuaExpand, setIsQuaExpand] = useState<boolean>(false);

  const { width } = useWindowDimensions();

  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const expandTech = useCallback(() => {
    setIsTechExpand(pre => !pre);
  }, []);

  const expandQua = useCallback(() => {
    setIsQuaExpand(pre => !pre);
  }, []);

  const expandVal = useCallback(() => {
    setIsValExpand(pre => !pre);
  }, []);

  const htmlSource1 = useMemo<HTMLSource>(() => ({ html: t('AIRATING_DEFINITION') }), [t]);
  const htmlSource2 = useMemo<HTMLSource>(() => ({ html: t('TECHSCORE_DEFINITION') }), [t]);
  const htmlSource3 = useMemo<HTMLSource>(() => ({ html: t('VALUESCORE_DEFINITION') }), [t]);
  const htmlSource4 = useMemo<HTMLSource>(() => ({ html: t('QUALITYSCORE_DEFINITION') }), [t]);

  return (
    <Modal
      visible={true}
      onRequestClose={handleVisible}
      childrenContent={
        <View style={styles.modalBackground}>
          <ScrollView stickyHeaderIndices={AIRatingModal_stickyHeaderIndices} style={styles.containerStyle}>
            <View style={styles.modalTitle}>
              <Text allowFontScaling={false} style={styles.filterText}>
                {t('What is AI Rating?')}
              </Text>
              <IconWithBackground
                backgroundColor={dynamicColors.AirCraftWhite}
                name="close"
                containerStyle={styles.closeModalTextList}
                onPress={handleVisible}
              />
            </View>

            <View style={styles.textWrap}>
              <RenderHtml contentWidth={width} source={htmlSource1} />
            </View>
            <RowData
              title="What is Technical Score?"
              titleStyle={isTechExpand ? styles.titleStyleHighlight : styles.titleStyle}
              containerStyle={isTechExpand ? styles.titleContainerExpand : styles.titleContainer}
              isDown={isTechExpand}
              navigate={expandTech}
            />
            {isTechExpand && (
              <View style={styles.textWrapExpand}>
                <RenderHtml contentWidth={width} source={htmlSource2} />
              </View>
            )}
            <RowData
              title="What is Valuation Score?"
              titleStyle={isValExpand ? styles.titleStyleHighlight : styles.titleStyle}
              containerStyle={isValExpand ? styles.titleContainerExpand : styles.titleContainer}
              isDown={isValExpand}
              navigate={expandVal}
            />
            {isValExpand && (
              <View style={styles.textWrapExpand}>
                <RenderHtml contentWidth={width} source={htmlSource3} />
              </View>
            )}
            <RowData
              title="What is Quality Score?"
              titleStyle={isQuaExpand ? styles.titleStyleHighlight : styles.titleStyle}
              containerStyle={isQuaExpand ? styles.titleContainerExpand : styles.titleContainer}
              isDown={isQuaExpand}
              navigate={expandQua}
            />
            {isQuaExpand && (
              <View style={styles.textWrapExpand}>
                <RenderHtml contentWidth={width} source={htmlSource4} />
              </View>
            )}
            {!isVisibleText && (
              <TouchableOpacity onPress={goToAIRatingScreen}>
                <View style={styles.learnMoreContainer}>
                  <Text style={styles.blueBold14}>{t('Learn more about our AI Rating')}</Text>
                </View>
              </TouchableOpacity>
            )}
          </ScrollView>
          <TouchableOpacity style={globalStyles.invisibleBackground} onPress={handleVisible} />
        </View>
      }
    />
  );
};

export default React.memo(AIRatingModal);
