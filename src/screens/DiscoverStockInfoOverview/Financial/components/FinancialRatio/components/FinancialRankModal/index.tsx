import React, { memo, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';
import useStyles from './styles';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import { useTranslation } from 'react-i18next';
import Modal from 'components/Modal';
import Icon from 'components/Icon';

const StickyHeaderIndices = [0];

export const FinancialRankModal = memo(() => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = useCallback(() => {
    setModalVisible(pre => !pre);
  }, []);

  return (
    <TouchableOpacity style={styles.pdTouch} onPress={handleModal}>
      <Icon name="question-2" color={dynamicColors.RedColorLogo} size={16} />
      <Modal
        visible={modalVisible}
        onRequestClose={handleModal}
        childrenContent={
          <View style={styles.modalBackground}>
            <View style={styles.viewRankingModal}>
              <ScrollView stickyHeaderIndices={StickyHeaderIndices}>
                <SafeAreaView>
                  <View style={styles.modalTitle}>
                    <Text allowFontScaling={false} style={styles.filterText}>
                      {t('How Financial Ratios are ranked?')}
                    </Text>
                    <TouchableOpacity style={styles.closeModalTextList} onPress={handleModal}>
                      <CloseFilter />
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
                <View style={styles.marginContent}>
                  <Text style={styles.normalText}>{t('Financial_Ranking_Explanation')}</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        }
      />
    </TouchableOpacity>
  );
});
