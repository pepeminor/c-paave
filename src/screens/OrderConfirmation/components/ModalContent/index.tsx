import React, { memo, useMemo } from 'react';
import { View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
import { SELL_BUY_TYPE } from 'global';
import globalStyles, { scaleSize } from 'styles';
import { formatNumber, formatTimeToDisplay } from 'utils';
import { IGetEnquirySignOrderResponse } from 'interfaces/equity';
import useKisOTP from 'hooks/useKisOTP';
import { useDispatch } from 'react-redux';
import { submitOrderConfirmation } from 'reduxs/global-actions';
import { useAppSelector } from 'hooks';

const cellStyle = [globalStyles.container2, globalStyles.centered];

interface IBaseModalContentProps {
  closeModal: () => void;
  selectedSymbol: IGetEnquirySignOrderResponse[];
  clearSelected: () => void;
}

function ModalContent({ closeModal, selectedSymbol, clearSelected }: IBaseModalContentProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const accountNo = useAppSelector(state => state.selectedAccount.selectedSubAccount?.accountNumber);
  const keyboardHeight = useAppSelector(state => state.keyboardHeight);

  const configOrderConfirmationDataGridModal: ISheetDataConfig = useMemo(
    () => ({
      columnFrozen: 5,
      maxHeightPerRow: 36,
      header: [
        {
          label: ['Symbol'],
          width: 60,
          element: (_key: string, rowData: IGetEnquirySignOrderResponse) => (
            <View style={[cellStyle, styles.border]}>
              <Text allowFontScaling={false} style={styles.text} numberOfLines={1}>
                {rowData.stockSymbol}
              </Text>
            </View>
          ),
        },
        {
          label: ['B/S'],
          width: 55,
          element: (_key: string, rowData: IGetEnquirySignOrderResponse) => (
            <View style={[cellStyle, styles.border]}>
              <Text
                allowFontScaling={false}
                style={rowData.orderType === SELL_BUY_TYPE.BUY ? styles.textBuy : styles.textSell}
              >
                {rowData.orderType === SELL_BUY_TYPE.BUY ? 'Buy' : 'Sell'}
              </Text>
            </View>
          ),
        },
        {
          label: ['Qtt'],
          width: 77,
          element: (_key: string, rowData: IGetEnquirySignOrderResponse) => (
            <View style={[cellStyle, styles.border, globalStyles.alignEnd]}>
              <Text allowFontScaling={false} style={[styles.text, styles.textDinOtLight]}>
                {formatNumber(rowData.volume, 2)}
              </Text>
            </View>
          ),
        },
        {
          label: ['Price'],
          width: 90,
          element: (_key: string, rowData: IGetEnquirySignOrderResponse) => (
            <View style={[cellStyle, styles.border, globalStyles.alignEnd]}>
              <Text allowFontScaling={false} style={[styles.text, styles.textDinOtLight]}>
                {formatNumber(rowData.price, 2)}
              </Text>
            </View>
          ),
        },
        {
          label: ['Date'],
          width: 95,
          element: (_key: string, rowData: IGetEnquirySignOrderResponse) => (
            <View style={[cellStyle, styles.border]}>
              <Text allowFontScaling={false} style={styles.text}>
                {formatTimeToDisplay(rowData.date, 'dd/MM/yyyy', 'yyyyMMdd')}
              </Text>
            </View>
          ),
        },
      ],
    }),
    []
  );

  const handleSuccess = () => {
    closeModal();
    clearSelected();
  };

  const submit = () => {
    accountNo != null &&
      dispatch(
        submitOrderConfirmation(
          {
            accountNo,
            mvOrderList: selectedSymbol.map(item => [item.orderNo, item.isHistory, item.refID]),
          },
          undefined,
          undefined,
          undefined,
          undefined,
          { handleSuccess }
        )
      );
  };

  const [ModalOTP, handleConfirm, handleCancel, isSubmitBtnDisabled, isFormDisabled] = useKisOTP({
    visible: true,
    submitAction: submit,
    hideModal: closeModal,
  });

  return (
    <View pointerEvents={isFormDisabled ? 'none' : 'auto'}>
      <View style={styles.modalHeader}>
        <Text allowFontScaling={false} style={styles.typeText}>
          {t('Order Confirmation')}
        </Text>
      </View>
      <SheetData
        data={selectedSymbol}
        config={configOrderConfirmationDataGridModal}
        containerStyle={{ maxHeight: keyboardHeight > 0 ? scaleSize(108) : scaleSize(252) }}
        noFlex
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          {ModalOTP != null && <View style={styles.otpContainer}>{ModalOTP}</View>}
          <Text style={[globalStyles.textAlignCenter, styles.textModal]}>
            {t('Are you sure you want to confirm orders?')}
          </Text>
          <TouchableOpacity
            disabled={isSubmitBtnDisabled}
            onPress={handleConfirm}
            style={[
              globalStyles.centered,
              styles.executeFormButton2,
              isSubmitBtnDisabled === true && globalStyles.disableBackground,
            ]}
          >
            <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
              {t('Confirm')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel} style={[globalStyles.centered, styles.cancelExecuteFormButton2]}>
            <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
              {t('Cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default memo(ModalContent);
