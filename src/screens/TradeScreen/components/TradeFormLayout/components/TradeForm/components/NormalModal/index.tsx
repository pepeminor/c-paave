import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, SafeAreaView } from 'react-native';

import globalStyles from 'styles';
import useStyles from './styles';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import RowData from 'components/RowData';
import { useTranslation } from 'react-i18next';
import Modal from 'components/Modal';

interface TPropsModalOrder {
  isVisible: boolean;
  handleVisible?(): void;
}

const NormalModal = ({ isVisible, handleVisible }: TPropsModalOrder) => {
  const { styles } = useStyles();
  const TRADE_NORMAL_ORDER_MODAL_CONTAINER = [globalStyles.container, styles.containerStyle];

  const TRADE_NORMAL_ORDER_MODAL_BACKGROUND = [globalStyles.container, styles.modalContainer];

  const TRADE_NORMAL_ORDER_MODAL_TITLE = [globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.modalTitle];

  const TRADE_NORMAL_ORDER_MODAL_TITLE_TEXT = [globalStyles.container, styles.filterText];

  const TRADE_NORMAL_ORDER_MODAL_TABLE = [
    globalStyles.flexDirectionRow,
    globalStyles.alignCenter,
    globalStyles.justifySpaceBetween,
    styles.marginTop4,
  ];

  const TRADE_NORMAL_ORDER_MODAL_TABLE_1 = [
    styles.itemContainer5,
    styles.marginTop4,
    styles.tableItem2,
    styles.backgroundItem3,
  ];

  const TRADE_NORMAL_ORDER_MODAL_TABLE_2 = [
    globalStyles.flexDirectionRow,
    globalStyles.alignCenter,
    globalStyles.justifySpaceBetween,
    styles.marginTop14,
  ];

  const TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM1 = [styles.tableContainer, styles.marginRight2];

  const TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM2 = [styles.itemContainer1, styles.marginTop4, styles.backgroundItem1];

  const TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM3 = [styles.itemContainer2, styles.backgroundItem2, styles.marginTop4];

  const TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM4 = [styles.itemContainer2, styles.backgroundItem3, styles.marginTop4];

  const TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM5 = [styles.itemContainer2, styles.marginTop4, styles.backgroundItem3];

  const TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM6 = [
    styles.itemContainer3,
    styles.marginTop4,
    styles.tableItem1,
    styles.backgroundItem3,
  ];

  const TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM7 = [styles.itemContainer2, styles.marginTop4, styles.backgroundItem2];

  const TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM8 = [styles.itemContainer2, styles.marginTop4, styles.backgroundItem5];

  const TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM10 = [
    globalStyles.flexDirectionRow,
    globalStyles.alignCenter,
    globalStyles.justifySpaceBetween,
    styles.marginTop10,
  ];
  const TRADE_NORMAL_ORDER_MODAL_EXPAND = [globalStyles.container, styles.textWrapExpand];
  const [isATOExpand, setIsATOExpand] = useState<boolean>(true);
  const [isLOExpand, setIsLOExpand] = useState<boolean>(false);
  const [isMPExpand, setIsMPExpand] = useState<boolean>(false);
  const [isMTLExpand, setIsMTLExpand] = useState<boolean>(false);
  const [isATCExpand, setIsATCExpand] = useState<boolean>(false);

  const { t } = useTranslation();

  const expandATO = () => {
    setIsATOExpand(pre => !pre);
  };

  const expandLO = () => {
    setIsLOExpand(pre => !pre);
  };

  const expandMP = () => {
    setIsMPExpand(pre => !pre);
  };

  const expandMTL = () => {
    setIsMTLExpand(pre => !pre);
  };

  const expandATC = () => {
    setIsATCExpand(pre => !pre);
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={handleVisible}
      childrenContent={
        <View style={styles.modalBackground}>
          <View style={TRADE_NORMAL_ORDER_MODAL_BACKGROUND}>
            <ScrollView stickyHeaderIndices={[0]} style={TRADE_NORMAL_ORDER_MODAL_CONTAINER}>
              <SafeAreaView>
                <View style={TRADE_NORMAL_ORDER_MODAL_TITLE}>
                  <Text allowFontScaling={false} style={TRADE_NORMAL_ORDER_MODAL_TITLE_TEXT}>
                    {t('Normal Order')}
                  </Text>
                  <TouchableOpacity style={styles.closeModalTextList} onPress={handleVisible}>
                    <CloseFilter />
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
              <View style={[styles.paddingHorizontal16, styles.marginTop12]}>
                <Text style={styles.normalTextTitle2}>
                  1. {t('How does Normal Order work on Paave Virtual Trading')}
                </Text>
                <Text style={[styles.normalTextContent, styles.paddingVertical8]}>
                  {t(
                    'Matching process is based on the signal of quote on the market. The order will be matched once there is a new quote meeting the matching requirements'
                  )}
                </Text>
              </View>
              <View style={styles.tableWrapper}>
                <Text style={[styles.normalTextTitle2, styles.paddingHorizontal16, styles.paddingBottom8]}>
                  2. {t('Which orders are Paave Virtual Trading providing')}?
                </Text>
                <View style={TRADE_NORMAL_ORDER_MODAL_TABLE}>
                  <View style={styles.tableContainer1}>
                    <Text style={styles.tableText1}>{t('Trading Hours')}</Text>
                  </View>
                  <View style={styles.tableContainer}>
                    <Text style={styles.tableText}>HOSE</Text>
                  </View>
                  <View style={styles.tableContainer}>
                    <Text style={styles.tableText}>HNX</Text>
                  </View>
                  <View style={TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM1}>
                    <Text style={styles.tableText}>UPCOM</Text>
                  </View>
                </View>
                <View style={TRADE_NORMAL_ORDER_MODAL_TABLE}>
                  <View style={styles.tableItem1}>
                    <View style={[TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM2]}>
                      <Text style={styles.tableItemText}>09h00 - 09h15</Text>
                    </View>
                    <View style={[TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM2]}>
                      <Text style={styles.tableItemText}>09h15 - 11h30</Text>
                    </View>
                  </View>
                  <View style={styles.tableItem1}>
                    <View style={TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM3}>
                      <Text style={styles.tableItemText}>ATO/ LO</Text>
                    </View>
                    <View style={TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM5}>
                      <Text style={styles.tableItemText}>LO/ MP</Text>
                    </View>
                  </View>
                  <View style={TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM6}>
                    <Text style={styles.tableItemText}>LO/ MTL</Text>
                  </View>
                  <View style={TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM6}>
                    <Text style={styles.tableItemText}>LO</Text>
                  </View>
                </View>
                <View style={TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM10}>
                  <View style={styles.tableItem1}>
                    <View style={[TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM2]}>
                      <Text style={styles.tableItemText}>11h30 - 13h00</Text>
                    </View>
                  </View>
                  <View style={[styles.itemContainer4, styles.backgroundItem4]}>
                    <Text style={styles.tableItemText}>{t('Intermission')}</Text>
                  </View>
                </View>
                <View style={TRADE_NORMAL_ORDER_MODAL_TABLE_2}>
                  <View style={styles.tableItem1}>
                    <View style={[TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM2]}>
                      <Text style={styles.tableItemText}>13h00 - 14h30</Text>
                    </View>
                    <View style={[TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM2]}>
                      <Text style={styles.tableItemText}>14h30 - 14h45</Text>
                    </View>
                    <View style={[TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM2]}>
                      <Text style={styles.tableItemText}>14h45 - 15h00</Text>
                    </View>
                  </View>
                  <View style={styles.tableItem1}>
                    <View style={[TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM4]}>
                      <Text style={styles.tableItemText}>LO/ MP</Text>
                    </View>
                    <View style={TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM7}>
                      <Text style={styles.tableItemText}>ATC/ LO</Text>
                    </View>
                    <View style={TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM8}>
                      <Text style={styles.tableItemText}>{t('Closed')}</Text>
                    </View>
                  </View>
                  <View style={styles.tableItem1}>
                    <View style={[TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM4]}>
                      <Text style={styles.tableItemText}>LO/ MTL</Text>
                    </View>
                    <View style={TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM7}>
                      <Text style={styles.tableItemText}>ATC/ LO</Text>
                    </View>
                    <View style={TRADE_NORMAL_ORDER_MODAL_TABLE_ITEM8}>
                      <Text style={styles.tableItemText}>{t('Closed')}</Text>
                    </View>
                  </View>
                  <View style={TRADE_NORMAL_ORDER_MODAL_TABLE_1}>
                    <Text style={styles.tableItemText}>LO</Text>
                  </View>
                </View>
                <View style={styles.padding16}>
                  <Text style={styles.noteText}>{t('Note_Normal_Ord')}</Text>
                </View>
              </View>
              <RowData
                title="ATO - At the Opening Order"
                titleStyle={isATOExpand ? styles.titleStyleHighlight : styles.titleStyle}
                containerStyle={isATOExpand ? styles.titleContainerExpand : styles.titleContainer}
                isDown={isATOExpand}
                navigate={expandATO}
              />
              {isATOExpand && (
                <View style={TRADE_NORMAL_ORDER_MODAL_EXPAND}>
                  <Text style={styles.normalTextExpand}>{t('ATO_DEFINITION')}</Text>
                </View>
              )}
              <RowData
                title="LO - Limit Order"
                titleStyle={isLOExpand ? styles.titleStyleHighlight : styles.titleStyle}
                containerStyle={isLOExpand ? styles.titleContainerExpand : styles.titleContainer}
                isDown={isLOExpand}
                navigate={expandLO}
              />
              {isLOExpand && (
                <View style={TRADE_NORMAL_ORDER_MODAL_EXPAND}>
                  <Text style={styles.normalTextExpand}>{t('LO_DEFINITION')}</Text>
                </View>
              )}
              <RowData
                title="MP - Market Price Order"
                titleStyle={isMPExpand ? styles.titleStyleHighlight : styles.titleStyle}
                containerStyle={isMPExpand ? styles.titleContainerExpand : styles.titleContainer}
                isDown={isMPExpand}
                navigate={expandMP}
              />
              {isMPExpand && (
                <View style={TRADE_NORMAL_ORDER_MODAL_EXPAND}>
                  <Text style={styles.normalTextExpand}>{t('MP_DEFINITION')}</Text>
                </View>
              )}
              <RowData
                title="MTL - Market To Limit"
                titleStyle={isMTLExpand ? styles.titleStyleHighlight : styles.titleStyle}
                containerStyle={isMTLExpand ? styles.titleContainerExpand : styles.titleContainer}
                isDown={isMTLExpand}
                navigate={expandMTL}
              />
              {isMTLExpand && (
                <View style={TRADE_NORMAL_ORDER_MODAL_EXPAND}>
                  <Text style={styles.normalTextExpand}>{t('MTL_DEFINITION')}</Text>
                </View>
              )}
              <RowData
                title="ATC - At the Close Order"
                titleStyle={isATCExpand ? styles.titleStyleHighlight : styles.titleStyle}
                containerStyle={isATCExpand ? styles.titleContainerExpand : styles.titleContainer}
                isDown={isATCExpand}
                navigate={expandATC}
              />
              {isATCExpand && (
                <View style={TRADE_NORMAL_ORDER_MODAL_EXPAND}>
                  <Text style={styles.normalTextExpand}>{t('ATC_DEFINITION')}</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      }
    />
  );
};

export default React.memo(NormalModal);
