import React from 'react';
import { Text, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import useStyles from './styles';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import StopOrderImageEn from 'assets/icon/stopOrderEn.svg';
import StopOrderImageVi from 'assets/icon/stopOrderVi.svg';
import { useTranslation } from 'react-i18next';
import { LANG } from 'global';
import { useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import QuestionRedIcon from 'assets/icon/QuestionRedIcon.svg';
import ExclamationMarkIcon from 'assets/icon/ExclamationMarkIcon.svg';
import RenderHTML from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'components/Modal';

interface TPropsModalOrder {
  isVisible: boolean;
  handleVisible?(): void;
}

const StopModal = ({ isVisible, handleVisible }: TPropsModalOrder) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const lang: LANG = useSelector((state: IState) => state.lang);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={handleVisible}
      childrenContent={
        <View style={styles.modalBackground}>
          <ScrollView stickyHeaderIndices={[0]} style={styles.containerStyle}>
            <SafeAreaView>
              <View style={styles.modalTitle}>
                <Text allowFontScaling={false} style={styles.filterText}>
                  {t('Stop Order')}
                </Text>
                <TouchableOpacity style={styles.closeModalTextList} onPress={handleVisible}>
                  <CloseFilter />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
            <View style={styles.paddingHorizontal}>
              <Text style={styles.normalText}>{t('STOP_ORD_DEFINITION')}</Text>
            </View>
            {lang === LANG.VI ? (
              <StopOrderImageVi width={Dimensions.get('screen').width} />
            ) : (
              <StopOrderImageEn width={Dimensions.get('screen').width} />
            )}
            <View style={styles.modalBackground2}>
              <Text style={styles.titleText}>{t('For example')}:</Text>
              <RenderHTML source={{ html: t('Stop_Order_Ex') }} />
              <View style={styles.modalRow2}>
                <QuestionRedIcon />
                <View style={styles.paddingLeft6}>
                  <Text style={styles.exampleText}>{t('Stop_Ord_Ques')}</Text>
                </View>
              </View>
              <View style={styles.sizeContent}>
                <ExclamationMarkIcon />
                <View style={styles.paddingLeft8}>
                  <Text style={styles.exampleText}>{t('Stop_Ord_Ans')}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      }
    />
  );
};

export default React.memo(StopModal);
