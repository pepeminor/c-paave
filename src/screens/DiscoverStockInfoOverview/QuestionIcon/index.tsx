import React, { memo } from 'react';
import { FlatList, ListRenderItemInfo, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'components/Modal';
import Question from 'assets/icon/Question.svg';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import { InvestmentInformation } from '../DataStockInfoModal';
import IConBtnClose from 'assets/icon/IConBtnClose.svg';

type IFakeInvestmentInformationDataType = {
  id: string;
  title: string;
};

export const QuestionIcon = memo(() => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const [overViewModalVisible, setOverViewModalVisible] = React.useState(false);

  const closeModal = () => {
    setOverViewModalVisible(false);
  };

  const onTouchOverview = () => {
    setOverViewModalVisible(true);
  };

  const renderItemQuestion = ({ item }: ListRenderItemInfo<IFakeInvestmentInformationDataType>) => {
    return (
      <TouchableOpacity style={styles.rowData}>
        <Text allowFontScaling={false} style={styles.rowDataTextBranch}>
          {t(item.id)}
        </Text>
        <Text style={styles.rowDataTextAdd}>{t(item.title)}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity style={styles.IConQuestion} onPress={onTouchOverview}>
      <Question width={scaleSize(16)} height={scaleSize(16)} />
      <Modal visible={overViewModalVisible} onRequestClose={closeModal}>
        <View style={[globalStyles.container, globalStyles.flexDirectionRow, styles.modalBackground, styles.modalView]}>
          <View style={[globalStyles.justifyEnd, styles.modalContentContainer]}>
            <View
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.justifyStart,
                globalStyles.fillWidth,
                styles.modalTitle,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[globalStyles.alignStart, globalStyles.justifyStart, styles.filterTextOver]}
              >
                {t('Financial Ratio')}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.iconCloseAbs}>
                <IConBtnClose style={styles.iconClose} width={scaleSize(24)} height={scaleSize(24)} />
              </TouchableOpacity>
            </View>

            <View style={[styles.listOverviewContainer]}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={InvestmentInformation}
                renderItem={renderItemQuestion}
                style={[globalStyles.container, globalStyles.flexDirectionCol]}
                keyExtractor={(_item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
});
