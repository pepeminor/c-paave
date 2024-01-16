import { useIsFocused } from '@react-navigation/native';
import DatePicker from 'components/DatePicker';
import ModalOTPKIS from 'components/ModalOTPKIS';
import PriceSelector from 'components/PriceSelector';
import config from 'config';
import { ISpecialPriceType } from 'constants/enum';
import { isAfter, isBefore } from 'date-fns';
import { useFormik } from 'formik';
import { ACCOUNT_TYPE, OrderBookScreenInitOption, SELL_BUY_TYPE, SYSTEM_TYPE } from 'global';
import useKisOTPAvailable from 'hooks/useKisOTPAvailable';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { kisVerifyAndSaveOTPFrom } from 'interfaces/authentication';
import { IKisVerifyAndSaveOTPRequest } from 'interfaces/common';
import { IEquityOrderStopModify, IOrderStopHistoryResponse } from 'interfaces/equity';
import { ReducerStatus } from 'interfaces/reducer';
import { IDerOrderHistoryMappingResponse, IEqtOrderHistoryMappingResponse } from 'interfaces/services';
import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  kisGetDerEnquiryMaxLongShort,
  kisModifyDerOrder,
  kisModifyEqtOrder,
  postModifyEquity,
  putOrderStopModifyEquity,
  setOrderBookSymbol,
} from 'reduxs/global-actions';
import { generateKisCardFrom, generateNewKisCard, resetGenerateNewKisCard } from 'reduxs/global-actions/Authentication';
import { kisVerifyAndSaveOTP } from 'screens/LoginRealAccount/actions';
// import { KIS_CLEAR_OTP_TOKEN } from 'screens/LoginRealAccount/reducers';
import getSchema from 'screens/OrderBook/schemas';
import globalStyles from 'styles';
import { handleAvailableQtt, formatDateToString, formatStringToDate, handleErrors } from 'utils';
import { ModalType } from '..';
import FormBtn from '../BaseModal/FormBtn';
import useStyles from '../styles';
import { useTranslation } from 'react-i18next';
import QuantitySelector from 'components/QuantitySelector';
import { useAppSelector } from 'hooks/useAppSelector';
import { MergeMarketSymbol, SymbolDataSelector } from 'reduxs/SymbolData';
import { kisGetEqtAssetInfo, kisGetEqtGenBuyAllOrderBook } from '../../../../../reduxs/global-actions/KisServicesEqt';

interface ModalModifyFormProps {
  symbol: IEqtOrderHistoryMappingResponse | IOrderStopHistoryResponse | IDerOrderHistoryMappingResponse;
  currentMarketPrice: MergeMarketSymbol;
  setAvlQty: (value: number) => void;
}

type Price = number | ISpecialPriceType;

const ModalModifyForm = ({ symbol, currentMarketPrice, setAvlQty }: ModalModifyFormProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [otpKisValue, setOtpKisValue] = useState<string>('');
  const [valueOTPError, setValueOTPError] = useState<boolean>(false);
  const [valueOTPErrorContent, setValueOTPErrorContent] = useState<string>('');
  const [isDisableForm, setIsDisableForm] = useState(false);
  const kisOTPAvailable = useKisOTPAvailable(otpKisValue);

  const type = useAppSelector(state => state.orderBookScreenOption);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const buyableInfo = useAppSelector(state => state.buyableInfoOrderBook);
  const sellableInfo = useAppSelector(state => state.sellableInfoOrderBook);
  const currentSymbol = useAppSelector(
    SymbolDataSelector.selectSymbol((symbol as IEqtOrderHistoryMappingResponse).stockCode),
    {
      ceilingPrice: true,
      floorPrice: true,
      market: true,
      symbolCode: true,
      symbolType: true,
    }
  );
  const kisEqtStockInfo = useAppSelector(state => state.kisEqtStockInfoOrderBook);
  const kisEqtAssetInfo = useAppSelector(state => state.kisEqtAssetInfoOrderBook);
  const kisEqtGenBuyAll = useAppSelector(state => state.kisEqtGenBuyAllOrderBook);
  const kisEquityEnquiryPortfolio = useAppSelector(state => state.kisEquityEnquiryPortfolio);
  const generateKisCardFailedTrigger = useAppSelector(state => state.generateKisCardFailedTrigger);
  const onModalOTPKIS = useAppSelector(state => state.onModalOTPKIS);
  const kisCheckOTP = useAppSelector(state => state.kisCheckOTP);
  const kisOTPToken = useAppSelector(state => state.kisOTPToken);
  const generateKisCardResult = useAppSelector(state => state.generateKisCardResult);
  const isFocus = useIsFocused();
  const kisOTPErrorValue = useAppSelector(state => state.kisOTPErrorValue);
  const kisDerEnquiryMaxLongShort = useAppSelector(state => state.kisDerEnquiryMaxLongShort);

  const closeModal = () => {
    dispatch(setOrderBookSymbol({ symbol: null, type: ModalType.MODIFY }));
  };

  const confirmModify = () => {
    formik.submitForm();
    closeModal();
  };

  const handleConfirm = () => {
    if (selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '')) {
      setIsDisableForm(true);
      const params: IKisVerifyAndSaveOTPRequest = {
        expireTime: config.kisOTPTokenExpireTime,
        verifyType: 'MATRIX_CARD',
        wordMatrixId: generateKisCardResult != null ? generateKisCardResult.wordMatrixId : 0,
        wordMatrixValue: otpKisValue,
      };
      dispatch(kisVerifyAndSaveOTP(params, kisVerifyAndSaveOTPFrom.MODIFY_ORDER));
    } else {
      confirmModify();
    }
  };

  const handleCancel = () => {
    setOtpKisValue('');
    setIsDisableForm(false);
    dispatch(resetGenerateNewKisCard());
    resetForm();
    closeModal();
  };

  const parseDate = (date: string): Date => {
    if ((symbol as IOrderStopHistoryResponse).fromDate?.length <= 8) {
      return new Date(formatStringToDate(date).toISOString());
    } else {
      return formatStringToDate(date, 'HH:mm:ss dd/MM/yyyy');
    }
  };

  const getInitValues = {
    price:
      symbol.orderType.match(/^(LO|ODDLOT)$/) != null
        ? (symbol.orderPrice as Price)
        : (symbol.orderType as ISpecialPriceType),
    stopPrice: (symbol as IOrderStopHistoryResponse).stopPrice,
    limitPrice: symbol.orderPrice as Price,
    quantity: symbol.orderQuantity,
    fromDate: parseDate((symbol as IOrderStopHistoryResponse).fromDate),
    toDate: parseDate((symbol as IOrderStopHistoryResponse).toDate),
  };

  const formik = useFormik({
    initialValues: getInitValues,
    validate: values =>
      getSchema(type, selectedAccount.type, symbol as IEqtOrderHistoryMappingResponse)
        .validate(values, {
          abortEarly: false,
          context: {
            price: values.price,
            currentSymbol,
            symbol,
            fromDate: values.fromDate,
            sellBuyType: symbol.sellBuyType,
            currentMarketPrice: currentMarketPrice,
            optionSelecting: type,
            buyableInfo,
            sellableInfo,
            getAvlQty,
            selectedAccount,
            kisEqtGenBuyAll,
            kisEquityEnquiryPortfolio,
            kisDerEnquiryMaxLongShort,
          },
        })
        .then(() => true, handleErrors),
    onSubmit: values => {
      const { price, quantity, stopPrice, fromDate, toDate, limitPrice } = values;
      switch (type) {
        case OrderBookScreenInitOption.ORDER_BOOK:
          if (currentSymbol != null) {
            let newPrice = price;
            if (typeof newPrice === 'string') {
              newPrice =
                (symbol.sellBuyType === SELL_BUY_TYPE.BUY ? currentSymbol.ceilingPrice : currentSymbol.floorPrice) ?? 0;
            }

            if (
              selectedAccount.type === ACCOUNT_TYPE.KIS &&
              selectedAccount.selectedSubAccount != null &&
              selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY &&
              selectedAccount.username != null
            ) {
              dispatch(
                kisModifyEqtOrder(
                  {
                    accountNo: selectedAccount.selectedSubAccount.accountNumber,
                    orderNo: (symbol as IEqtOrderHistoryMappingResponse).orderID,
                    orderGroupNo: (symbol as IEqtOrderHistoryMappingResponse).orderGroupNo,
                    newPrice,
                    newQuantity: quantity,
                    stockSymbol: (symbol as IEqtOrderHistoryMappingResponse).stockCode,
                    market: currentSymbol.market,
                    originalQuantity: (symbol as IEqtOrderHistoryMappingResponse).orderQuantity,
                  },
                  {
                    message: 'LO_MODIFY_SUCCESS',
                  },
                  undefined,
                  true,
                  undefined,
                  {
                    handleSuccess: () => {
                      dispatch(
                        kisGetEqtAssetInfo({
                          accountNumber: selectedAccount?.selectedSubAccount?.accountNumber!,
                          clientID: selectedAccount.username!,
                          sellBuyType: symbol.sellBuyType,
                          genBuyAllParams: {
                            clientID: selectedAccount.username!,
                            symbolCode: currentSymbol.symbolCode,
                            market: currentSymbol.market,
                            price: formik.values.price as number,
                          },
                        })
                      );
                    },
                  }
                )
              );
            } else if (
              selectedAccount.type === ACCOUNT_TYPE.KIS &&
              selectedAccount.selectedSubAccount != null &&
              selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
            ) {
              dispatch(
                kisModifyDerOrder(
                  {
                    accountNumber: selectedAccount.selectedSubAccount.accountNumber,
                    orderPrice: symbol.orderType.match(/^(LO|ODDLOT)$/) != null ? newPrice : 0,
                    orderQty: quantity,
                    orderInfo: {
                      marketID: (symbol as IDerOrderHistoryMappingResponse).marketID || '',
                      symbol: (symbol as IDerOrderHistoryMappingResponse).stockCode ?? '',
                      commodityName: (symbol as IDerOrderHistoryMappingResponse).commodityName ?? '',
                      contractMonth: (symbol as IDerOrderHistoryMappingResponse).contractMonth ?? '',
                      orderNumber: (symbol as IDerOrderHistoryMappingResponse).orderID ?? '',
                      validity: (symbol as IDerOrderHistoryMappingResponse).validity ?? '',
                      orderType: (symbol as IDerOrderHistoryMappingResponse).orderType ?? '',
                      orderGroupID: (symbol as IDerOrderHistoryMappingResponse).orderGroupID ?? '',
                      sellBuyType: (symbol as IDerOrderHistoryMappingResponse).sellBuyType ?? '',
                      conditionOrderGroupID: (symbol as IDerOrderHistoryMappingResponse).conditionOrderGroupID ?? '',
                      validityDate: (symbol as IDerOrderHistoryMappingResponse).validityDate ?? '',
                      matchedQuantity: (symbol as IDerOrderHistoryMappingResponse).matchedQuantity ?? 0,
                      position: (symbol as IDerOrderHistoryMappingResponse).position ?? '',
                      minQty: (symbol as IDerOrderHistoryMappingResponse).minQty ?? 0,
                      stopType: (symbol as IDerOrderHistoryMappingResponse).stopType ?? '',
                      stopPrice: (symbol as IDerOrderHistoryMappingResponse).stopPrice ?? 0,
                      tPlus1: (symbol as IDerOrderHistoryMappingResponse).tPlus1,
                      userID: (symbol as IDerOrderHistoryMappingResponse).userID,
                      stopOrder: (symbol as IDerOrderHistoryMappingResponse).stopOrder,
                      auctionOrder: (symbol as IDerOrderHistoryMappingResponse).auctionOrder,
                    },
                  },
                  {
                    message: 'LO_MODIFY_SUCCESS',
                  },
                  undefined,
                  true
                )
              );
            } else {
              dispatch(
                postModifyEquity(
                  {
                    orderId: parseInt((symbol as IEqtOrderHistoryMappingResponse).orderID),
                    newPrice,
                    newQuantity: quantity,
                  },
                  {
                    message: 'LO_MODIFY_SUCCESS',
                  },
                  undefined,
                  true
                )
              );
            }
          }
          break;

        case OrderBookScreenInitOption.CONDITION_ORDER: {
          const conditionOrderParams: IEquityOrderStopModify = {
            stopOrderId: (symbol as IOrderStopHistoryResponse).stopOrderID,
            newStopPrice: stopPrice,
            newOrderQuantity: quantity,
            newFromDate: typeof fromDate === 'string' ? fromDate : formatDateToString(fromDate) || '',
            newToDate: typeof toDate === 'string' ? toDate : formatDateToString(toDate) || '',
            orderPrice: typeof limitPrice === 'number' ? limitPrice : undefined,
          };
          dispatch(
            putOrderStopModifyEquity(
              conditionOrderParams,
              {
                message: 'ORDER_MODIFIED_SUCCESS',
              },
              undefined,
              true
            )
          );
          break;
        }
        default:
          break;
      }
    },
  });

  const updateField = async (fieldName: string, value: unknown) => {
    await formik.setFieldValue(fieldName, value);
  };

  const resetForm = () => formik.resetForm({ values: getInitValues });

  const getAvlQty = (): number => {
    if (selectedAccount.type === ACCOUNT_TYPE.KIS && selectedAccount.selectedSubAccount != null) {
      if (symbol.sellBuyType === SELL_BUY_TYPE.BUY) {
        return (
          (selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
            ? kisDerEnquiryMaxLongShort.data?.maxLong ?? 0
            : kisEqtGenBuyAll.data?.maxQtty ?? 0) + symbol.orderQuantity
        );
      }
      const accountPortfolio = kisEquityEnquiryPortfolio.data?.find(
        item => item.accountNumber === selectedAccount.selectedSubAccount?.accountNumber
      )?.portfolioList;
      const sellable = accountPortfolio?.find(item => item.symbol === symbol.stockCode)?.sellable;
      return (sellable ?? 0) + symbol.orderQuantity;
    }
    const tradingFee = (symbol as IEqtOrderHistoryMappingResponse).tradingFee;
    const tradingValue = (symbol as IEqtOrderHistoryMappingResponse).tradingValue;
    const price = formik.values.price;
    if (tradingFee != null) {
      if (symbol.sellBuyType === SELL_BUY_TYPE.BUY) {
        if (buyableInfo.status === ReducerStatus.SUCCESS && buyableInfo.data != null) {
          return currentSymbol != null && currentSymbol.ceilingPrice != null
            ? typeof price === 'number' && price !== 0
              ? handleAvailableQtt((buyableInfo.data.buyingPower + tradingValue + tradingFee) / (config.fee * price))
              : handleAvailableQtt(
                  (buyableInfo.data.buyingPower + tradingValue + tradingFee) / (config.fee * currentSymbol.ceilingPrice)
                )
            : 0;
        }
        return 0;
      }
      return (sellableInfo.data?.sellableQuantity ?? 0) + symbol.orderQuantity;
    }
    return symbol.orderQuantity ?? 0;
  };

  const onUpdatePrice = (value: number) => {
    if (selectedAccount.type === ACCOUNT_TYPE.KIS) {
      selectedAccount.selectedSubAccount != null &&
      selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY &&
      selectedAccount.username != null &&
      currentSymbol != null
        ? selectedAccount.selectedSubAccount.accountNumber.toUpperCase().includes('X')
          ? kisEqtAssetInfo.status === ReducerStatus.SUCCESS &&
            kisEqtAssetInfo.data != null &&
            dispatch(
              kisGetEqtGenBuyAllOrderBook({
                clientID: selectedAccount.username,
                accountNo: selectedAccount.selectedSubAccount.accountNumber,
                symbolCode: currentSymbol.symbolCode,
                market: currentSymbol.market,
                price: (Number(value) || currentSymbol.ceilingPrice) ?? 0,
                sellBuyType: symbol.sellBuyType,
                PP: kisEqtAssetInfo.data.buyingPower.purchasingPower,
              })
            )
          : kisEqtStockInfo.status === ReducerStatus.SUCCESS &&
            kisEqtStockInfo.data != null &&
            dispatch(
              kisGetEqtGenBuyAllOrderBook({
                clientID: selectedAccount.username,
                accountNo: selectedAccount.selectedSubAccount.accountNumber,
                symbolCode: currentSymbol.symbolCode,
                market: currentSymbol.market,
                price: (Number(value) || currentSymbol.ceilingPrice) ?? 0,
                sellBuyType: symbol.sellBuyType,
                PP: kisEqtStockInfo.data.PP,
              })
            )
        : selectedAccount.selectedSubAccount != null &&
          selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES &&
          currentSymbol != null &&
          dispatch(
            kisGetDerEnquiryMaxLongShort({
              accountNumber: selectedAccount.selectedSubAccount.accountNumber,
              price: (Number(value) || currentSymbol.ceilingPrice) ?? 0,
              sellBuyType: symbol.sellBuyType,
              symbolCode: currentSymbol.symbolCode,
            })
          );
    } else {
      setAvlQty(getAvlQty());
    }
  };

  const handleNumberFieldChange = (type: string, isTouched?: boolean) => async (value: string) => {
    if (!isNaN(Number(value))) {
      !isTouched && (await formik.setFieldTouched(type, true, true));
      await updateField(type, Number(value));

      switch (type) {
        case 'price':
          onUpdatePrice(Number(value));
          break;
      }
    } else {
      resetForm(); // TODO: Confirm this
    }
  };

  const handleFromDateChange = (value: Date) => {
    if (isAfter(value, formik.values.toDate)) {
      updateField('toDate', value);
    }
    updateField('fromDate', value);
  };

  const handleToDateChange = (value: Date) => {
    if (isBefore(value, formik.values.fromDate)) {
      updateField('fromDate', value);
    }
    updateField('toDate', value);
  };

  const onChangeOtpKisValue = (value: string) => {
    setOtpKisValue(value);
    if (valueOTPError) {
      setValueOTPError(false);
      setValueOTPErrorContent('');
    }
  };

  useEffect(() => {
    setIsDisableForm(false);
    setOtpKisValue('');
    setValueOTPError(false);
    setValueOTPErrorContent('');
    if (selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '')) {
      dispatch(
        generateNewKisCard({ username: selectedAccount.username ?? '', from: generateKisCardFrom.MODIFY_ORDER })
      );
    }
  }, []);

  useUpdateEffect(() => {
    handleCancel();
  }, [generateKisCardFailedTrigger, onModalOTPKIS]);

  useUpdateEffect(() => {
    if (isFocus) {
      if (kisCheckOTP.status === ReducerStatus.FAILED) {
        setValueOTPError(true);
        kisOTPErrorValue != null && setValueOTPErrorContent(t(kisOTPErrorValue));
        setIsDisableForm(false);
      } else if (kisCheckOTP.status === ReducerStatus.SUCCESS) {
        confirmModify();
        setValueOTPError(false);
        setValueOTPErrorContent('');
        setIsDisableForm(false);
      }
    }
  }, [kisCheckOTP, kisOTPErrorValue, isFocus]);

  useEffect(() => {
    setAvlQty(getAvlQty());
  }, [
    kisEqtGenBuyAll.data,
    kisEquityEnquiryPortfolio.data,
    buyableInfo.data,
    sellableInfo.data,
    kisDerEnquiryMaxLongShort.data,
  ]);

  return currentSymbol ? (
    <View pointerEvents={isDisableForm === true ? 'none' : 'auto'}>
      {type === OrderBookScreenInitOption.ORDER_BOOK && (
        <View style={styles.inputContainer}>
          <PriceSelector
            value={formik.values.price}
            error={Boolean(formik.errors.price) && Boolean(formik.touched.price) && Boolean(formik.values.price)}
            errorContent={formik.errors.price ?? ''}
            onChangeText={handleNumberFieldChange('price', formik.touched.price)}
            label={'Price'}
            placeholder={selectedAccount.type === ACCOUNT_TYPE.KIS ? 'Price' : undefined}
            symbolInfo={currentSymbol}
            isMinusDisabled={
              typeof formik.values.price === 'string' ||
              (typeof formik.values.price === 'number' && formik.values.price <= 0)
            }
            editable={typeof formik.values.price === 'number'}
          />
        </View>
      )}
      {type === OrderBookScreenInitOption.CONDITION_ORDER && (
        <>
          <View style={styles.inputContainer}>
            <PriceSelector
              value={formik.values.stopPrice}
              error={
                Boolean(formik.errors.stopPrice) &&
                Boolean(formik.touched.stopPrice) &&
                Boolean(formik.values.stopPrice)
              }
              errorContent={formik.errors.stopPrice ?? ''}
              onChangeText={handleNumberFieldChange('stopPrice', formik.touched.stopPrice)}
              label={'Stop Price'}
              placeholder={selectedAccount.type === ACCOUNT_TYPE.KIS ? 'Stop Price' : undefined}
              symbolInfo={currentSymbol}
              isMinusDisabled={formik.values.stopPrice <= 0}
            />
          </View>
          {selectedAccount.type === ACCOUNT_TYPE.KIS && symbol.orderPrice && (
            <View style={styles.inputContainer}>
              <PriceSelector
                value={formik.values.limitPrice}
                error={
                  Boolean(formik.errors.limitPrice) &&
                  Boolean(formik.touched.limitPrice) &&
                  Boolean(formik.values.limitPrice)
                }
                errorContent={formik.errors.limitPrice ?? ''}
                onChangeText={handleNumberFieldChange('limitPrice', formik.touched.limitPrice)}
                label={'Limit Price'}
                placeholder={selectedAccount.type === ACCOUNT_TYPE.KIS ? 'Limit Price' : undefined}
                symbolInfo={currentSymbol}
                isMinusDisabled={(formik.values.limitPrice as number) <= 0}
              />
            </View>
          )}
        </>
      )}
      <View style={styles.inputContainer}>
        <QuantitySelector
          value={formik.values.quantity}
          error={Boolean(formik.errors.quantity) && Boolean(formik.values.quantity)}
          errorContent={formik.errors.quantity ?? ''}
          onChangeText={handleNumberFieldChange('quantity', formik.touched.quantity)}
          showPercentPicker={false}
          label={'Quantity'}
          avlQty={
            type === OrderBookScreenInitOption.ORDER_BOOK || type === OrderBookScreenInitOption.CANCEL_ORDER_BOOK
              ? getAvlQty()
              : undefined
          }
          placeholder={selectedAccount.type === ACCOUNT_TYPE.KIS ? 'Quantity' : undefined}
          isMinusDisabled={formik.values.quantity <= 0}
          symbolInfo={currentSymbol}
        />
      </View>
      {type === OrderBookScreenInitOption.CONDITION_ORDER && (
        <View style={[globalStyles.flexDirectionRow, styles.inputContainer]}>
          <View style={[globalStyles.container, styles.marginRight8]}>
            <DatePicker
              label={'From date'}
              onChange={handleFromDateChange}
              value={formik.values.fromDate}
              minDate={new Date()}
            />
          </View>
          <View style={[globalStyles.container, styles.marginLeft8]}>
            <DatePicker
              label={'To date'}
              onChange={handleToDateChange}
              value={formik.values.toDate}
              minDate={new Date()}
            />
          </View>
        </View>
      )}
      {selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '') && (
        <ModalOTPKIS
          valueOTP={otpKisValue}
          onChangeValueOTP={onChangeOtpKisValue}
          generateKisCardResult={generateKisCardResult}
          ListContentModal={true}
          valueOTPError={valueOTPError}
          valueOTPErrorContent={valueOTPErrorContent}
          autoFocus={false}
        />
      )}
      <FormBtn
        isDisable={
          !formik.dirty ||
          Object.keys(formik.errors).length > 0 ||
          (selectedAccount.type === ACCOUNT_TYPE.KIS &&
            (kisOTPToken == null || kisOTPToken.trim() === '') &&
            kisOTPAvailable === false)
        }
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  ) : (
    <></>
  );
};

export default memo(ModalModifyForm);
