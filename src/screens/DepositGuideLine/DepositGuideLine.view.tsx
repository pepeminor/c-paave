import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, ListRenderItemInfo } from 'react-native';
import { useDepositGuideLineLogic } from './DepositGuideLine.logic';
import useStyles from './DepositGuideLine.style';
import { IProps } from './DepositGuideLine.type';
import { useTranslation } from 'react-i18next';
import TextFieldList from 'components/TextFieldList';
import { TAB, BANK_LIST, IBank } from 'constants/bank';
import { goToEmailSupport, removeAccents } from 'utils';
import CopyButton from 'components/CopyButton';
import HeaderScreen from 'components/HeaderScreen';

const DepositGuideLine = (props: IProps) => {
  const { state, handlers, modals } = useDepositGuideLineLogic(props);
  const { ModalAccountList } = modals;
  const { t } = useTranslation();
  const { styles } = useStyles();

  const isBankTransfer = state.tab === TAB.BANK_TRANSFER;

  const accountName = removeAccents(props.selectedAccount?.selectedSubAccount?.accountName ?? '');

  const renderItemBank = useCallback(
    ({ item, index }: ListRenderItemInfo<IBank>) => {
      const isSelected = state.selectedBank.id === item.id;
      return (
        <TouchableOpacity
          style={[styles.containerItemBank, index === BANK_LIST.length - 1 && styles.lastItemBank]}
          key={index}
          onPress={handlers.onChangeBank(item)}
        >
          <View style={[styles.containerIconBank, isSelected && styles.selectedIconBank]}>
            <Image style={styles.imageBank} source={item.image} resizeMode={'contain'} />
          </View>

          <Text allowFontScaling={false} style={[styles.nameBank, isSelected && styles.selectedNameBank]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [state.selectedBank]
  );

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={t('Deposit GuideLine')} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.container_2}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tab}>
          <TouchableOpacity
            onPress={handlers.onSelectTabBankTransfer}
            style={[styles.buttonTab, isBankTransfer && styles.selectedTab]}
          >
            <Text allowFontScaling={false} style={isBankTransfer ? styles.selectedText : styles.unselectedText}>
              {t('Bank transfer')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlers.onSelectTabKISCounter}
            style={[styles.buttonTab, !isBankTransfer && styles.selectedTab]}
          >
            <Text allowFontScaling={false} style={!isBankTransfer ? styles.selectedText : styles.unselectedText}>
              {t('At KIS counter')}
            </Text>
          </TouchableOpacity>
        </View>

        {isBankTransfer ? (
          <>
            <View style={styles.containerSubAccount}>
              <Text allowFontScaling={false} style={styles.title}>
                {t('Deposit to sub account')}
              </Text>
              <TextFieldList
                input={state.selectedAcc?.accountNumber ?? ''}
                onChange={handlers.onClickAccountList}
                containerStyle={styles.containerTextField}
              />
            </View>

            <View style={styles.containerBlock}>
              <Text allowFontScaling={false} style={styles.title}>
                {t('Select beneficiary bank')}
              </Text>
              <FlatList
                renderItem={renderItemBank}
                data={BANK_LIST}
                initialNumToRender={10}
                style={styles.scrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View style={styles.containerBlock}>
              <Text allowFontScaling={false} style={styles.title}>
                {t('Please transfer to one of the following bank accounts:')}
              </Text>
              {state.accountList.map((item, index) => {
                return (
                  <View key={index} style={styles.containerData}>
                    <View>
                      <Text allowFontScaling={false} style={styles.textNumberAccount}>
                        {item.id}
                      </Text>
                      <Text allowFontScaling={false} style={styles.subBank}>
                        {item.name}
                      </Text>
                    </View>

                    <CopyButton content={item.id} />
                  </View>
                );
              })}
            </View>

            <View style={styles.containerBlock}>
              <Text allowFontScaling={false} style={styles.title}>
                {t('Beneficiary name')}
              </Text>

              <View style={styles.containerData}>
                <Text allowFontScaling={false} style={styles.subBank}>
                  {state.selectedBank.BeneficiaryName}
                </Text>

                <CopyButton content={state.selectedBank.BeneficiaryName} />
              </View>
            </View>

            <View style={styles.containerBlock}>
              <Text allowFontScaling={false} style={styles.title}>
                {t('Transfer content')}
              </Text>

              <View style={styles.containerData}>
                <Text allowFontScaling={false} style={styles.subBank}>
                  {t('Deposit to', {
                    subAccount: `057${state.selectedAcc?.accountNumber}`,
                    accountName: accountName,
                  })}
                </Text>

                <CopyButton
                  content={t('Deposit to', {
                    subAccount: `057${state.selectedAcc?.accountNumber}`,
                    accountName: accountName,
                  })}
                />
              </View>
            </View>

            <View style={styles.containerBlock}>
              <Text allowFontScaling={false} style={styles.title}>
                {t('Notice')}
              </Text>

              <View style={styles.textNotice}>
                <View style={styles.dot} />

                <Text allowFontScaling={false} style={styles.subBank}>
                  {t('Please deposit to the account with correct transfer content format below')}
                </Text>
              </View>

              <View style={styles.notice}>
                <Text allowFontScaling={false} style={styles.noticeText}>
                  {t('Deposit to [Account Number] - Account holder’s full name')}
                </Text>
              </View>

              <View style={styles.textNotice}>
                <View style={styles.dot} />

                <Text allowFontScaling={false} style={styles.subBank}>
                  {t(
                    'Transfer times: \n Morning: 08h30 - 11h30 \n Afternoon: 13h00 - 16h30 \n (From Monday to Friday, except for holidays)'
                  )}
                </Text>
              </View>

              <View style={styles.textNotice}>
                <View style={styles.dot} />

                <Text allowFontScaling={false} style={styles.subBank}>
                  {t(
                    'The deposit money transaction executed outside the transfer time will be processed in the next working day.'
                  )}
                </Text>
              </View>

              <View style={styles.textNotice}>
                <View style={styles.dot} />

                <View>
                  <Text allowFontScaling={false} style={styles.subBank}>
                    {t('For further support, please contact us at')}
                    <Text allowFontScaling={false} style={styles.textSupport} onPress={goToEmailSupport}>
                      {' support@paave.io'}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          <View>
            <View style={styles.textNotice}>
              <Text allowFontScaling={false} style={styles.subBank}>
                {t(
                  'For customers based in HCM city, you can deposit money into your securities account directly at KIS'
                )}
              </Text>
            </View>
            <View style={styles.textNotice}>
              <View style={styles.dot} />

              <Text allowFontScaling={false} style={styles.subBank}>
                {t(
                  'Carry your ID card and visit KIS Sài Gòn branch at Level 04, 190 - 192 Nguyen Cong Tru St, Nguyen Thai Binh ward, Dist. 1, HCMC'
                )}
              </Text>
            </View>
            <View style={styles.textNotice}>
              <View style={styles.dot} />

              <Text allowFontScaling={false} style={styles.subBank}>
                {t('Inform KIS staff to support deposit money to your securities account')}
              </Text>
            </View>
            <View style={styles.textNotice}>
              <View>
                <Text allowFontScaling={false} style={styles.subBank}>
                  {t('For further support, please contact us at')}
                  <Text allowFontScaling={false} style={styles.textSupport} onPress={goToEmailSupport}>
                    {' support@paave.io'}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )}
        {ModalAccountList.current && (
          <ModalAccountList.current
            selectedAcc={state.selectedAcc}
            isVisible={state.isVisibleModalAccountList}
            onCloseModal={handlers.onCloseModalAccountList}
            onPressAccount={handlers.onPressAccount}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default DepositGuideLine;
