import React, { memo, useCallback, useState } from 'react';
import { FlatList, ListRenderItemInfo, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'components/Modal';
import { lightColors } from 'styles';
import { useTranslation } from 'react-i18next';
import IConBtnClose from 'assets/icon/IConBtnClose.svg';
import { getStylesHook } from 'hooks/useStyles';
import { financialModalData } from 'screens/DiscoverStockInfoOverview/DataStockInfoModal';
import Icon from 'components/Icon';

type IFakeInvestmentInformationDataType = {
  id: string;
  title: string;
};

export const RatioQuestionModal = memo(() => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();
  const [modalVisible, setModalVisible] = useState(false);

  const renderItemQuestion = ({ item, index }: ListRenderItemInfo<IFakeInvestmentInformationDataType>) => {
    return (
      <View style={styles.rowData} key={`RatioQuestionModal_${item.id}_${index}`}>
        <Text allowFontScaling={false} style={styles.rowDataTextBranch}>
          {t(item.id)}
        </Text>
        <Text style={styles.rowDataTextAdd}>{t(item.title)}</Text>
      </View>
    );
  };

  const handleModal = useCallback(() => {
    setModalVisible(pre => !pre);
  }, []);

  return (
    <TouchableOpacity style={styles.pdTouch} onPress={handleModal}>
      <Icon name="question-2" color={dynamicColors.RedColorLogo} size={16} />
      <Modal visible={modalVisible} onRequestClose={handleModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContentContainer}>
            <View style={styles.modalTitle}>
              <Text allowFontScaling={false} style={styles.filterTextOver}>
                {t('Financial Ratio')}
              </Text>
              <TouchableOpacity onPress={handleModal} style={styles.cancelContainer}>
                <IConBtnClose style={styles.iconClose} width={24} height={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.listOverviewContainer}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={financialModalData}
                renderItem={renderItemQuestion}
                style={styles.flatList}
              />
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
});

const useStyles = getStylesHook({
  pdTouch: {
    padding: 10,
  },
  rowData: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  rowDataTextBranch: {
    fontWeight: 'bold',
    fontSize: 14,
    color: lightColors.LIGHTTextBigTitle,
    width: 343,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  rowDataTextAdd: {
    fontWeight: '400',
    fontSize: 12,
    color: lightColors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  modalBackground: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: lightColors.BACKGROUND_MODAL2,
    flexDirection: 'row',
    flex: 1,
  },
  modalContentContainer: {
    backgroundColor: lightColors.WHITE,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    width: '100%',
    paddingBottom: 10,
    marginTop: 48,
    justifyContent: 'center',
  },
  modalTitle: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.BORDER,
    width: '100%',
    justifyContent: 'center',
  },
  filterTextOver: {
    fontWeight: 'bold',
    fontSize: 16,
    color: lightColors.BlueNewColor,
    marginLeft: 16,
    marginRight: 44,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  cancelContainer: {
    position: 'absolute',
    height: '100%',
    right: 0,
    justifyContent: 'center',
  },
  iconClose: {
    marginRight: 16,
  },
  listOverviewContainer: {
    height: '80%',
  },
  flatList: {
    flex: 1,
    flexDirection: 'column',
  },
});
