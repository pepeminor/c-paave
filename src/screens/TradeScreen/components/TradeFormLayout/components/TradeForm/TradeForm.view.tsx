import React, { forwardRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTradeFormLogic } from './TradeForm.logic';
import useStyles from './TradeForm.style';
import { IProps, ITradeFormRef } from './TradeForm.type';
import withMemo from 'HOC/withMemo';
import { t } from 'i18next';
import { ORDER_TYPE, SELL_BUY_TYPE } from 'global';
import { IconWithBackground } from 'components/Icon';
import PriceSelector from 'components/PriceSelector';
import { InputAccessoryViewID } from 'constants/enum';
import QuantitySelector from 'components/QuantitySelector';
import DatePicker from 'components/DatePicker';
import { formatNumber, handleAvailableQtt, isDerivativesAccount } from 'utils';
import ButtonOrderType from './components/ButtonOrderType';
import { IS_IOS } from 'constants/main';
import ExecuteButton from '../ExecuteButton';
import useIsProhibitedStock from 'hooks/useIsProhibitedStock';
import OddLotResultModal from './components/OddLotResultModal';
import TradeFormEmpty from './TradeFormEmpty';
import ExpiryCheckbox from './components/ExpiryCheckbox';
import ItemInputAccessoriesView from 'screens/TradeScreen/components/ItemInputAccessoriesView';

const TradeForm = forwardRef((props: IProps, ref: ITradeFormRef) => {
  const { modals, handlers, state, refs, getAvlQty, getBuyingPower, getMaxBuySellForDerivatives, getMarginRatio } =
    useTradeFormLogic(props, ref);
  const { styles, dynamicColors } = useStyles();
  const {
    currentSymbol,
    isHaveCurrentSymbol,
    selectedAccount,
    accessToken,
    isRealAccount,
    kisEqtGenBuyAll,
    sellBuyType,
  } = props;
  const { quantityInput, limitPriceInput, expiryDate, expiryDateEnable } = refs;
  const {
    price,
    filterSelecting,
    limitPrice,
    limitPriceError,
    limitPriceErrorContent,
    quantity,
    quantityError,
    quantityErrorContent,
    priceError,
    stopPriceError,
    stopLimitPriceError,
    tradingValue,
    stopPrice,
    stopLimitPrice,
    fromDate,
    toDate,
    showModalExecute,
  } = state;
  const { ModalExecute } = modals;
  const { isProhibited, showProhibitedAlert } = useIsProhibitedStock(currentSymbol?.symbolCode);

  const IS_NORMAL_ORDER = filterSelecting === ORDER_TYPE.NORMAL_ORDER;
  const IS_STOP_ORDER = filterSelecting === ORDER_TYPE.STOP_ORDER;
  const IS_STOP_LIMIT_ORDER = filterSelecting === ORDER_TYPE.STOP_LIMIT_ORDER;
  const IS_FUTURES_CODE = currentSymbol?.symbolType === 'FUTURES';
  const IS_BUY = sellBuyType === SELL_BUY_TYPE.BUY;
  const IS_SELL = sellBuyType === SELL_BUY_TYPE.SELL;

  if (!isHaveCurrentSymbol) {
    return <TradeFormEmpty />;
  }
  return (
    <View style={styles.rightArea}>
      <View style={styles.screenOption}>
        <TouchableOpacity
          onPress={handlers.onSelectBuy}
          style={[styles.optionContainer, IS_BUY && styles.optionContainerSelected]}
        >
          <Text allowFontScaling={false} style={IS_BUY ? styles.selectedText : styles.unselectedText}>
            {t('Buy')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlers.onSelectSell}
          style={[styles.optionContainer, IS_SELL && styles.optionContainerSelected]}
        >
          <Text allowFontScaling={false} style={IS_SELL ? styles.selectedTextSell : styles.unselectedText}>
            {t('Sell')}
          </Text>
        </TouchableOpacity>
      </View>

      <ButtonOrderType filterSelecting={filterSelecting} onSelectFilter={handlers.onSelectFilter} />

      <View style={styles.eachPriceInput}>
        {IS_NORMAL_ORDER ? (
          <PriceSelector
            containerStyle={styles.selectorContainer}
            value={state.price}
            error={state.priceError}
            errorContent={state.priceErrorContent}
            onChangeText={handlers.onChangePrice}
            placeholder={'Price'}
            inputAccessoryViewID={IS_IOS ? InputAccessoryViewID.PRICE : undefined}
            onFocus={handlers.onFocusPrice}
            returnKeyType={IS_IOS ? undefined : 'next'}
            onSubmitEditing={quantityInput.current?.focus}
            symbolInfo={currentSymbol!}
          />
        ) : IS_STOP_ORDER ? (
          <PriceSelector
            containerStyle={styles.selectorContainer}
            value={state.stopPrice}
            error={state.stopPriceError}
            errorContent={state.stopPriceErrorContent}
            onChangeText={handlers.onChangeStopPrice}
            symbolInfo={currentSymbol!}
            placeholder={'Stop Price'}
            inputAccessoryViewID={IS_IOS ? InputAccessoryViewID.STOP_PRICE : undefined}
            onFocus={handlers.onFocusStopPrice}
            returnKeyType={IS_IOS ? undefined : 'next'}
            onSubmitEditing={quantityInput.current?.focus}
          />
        ) : (
          <PriceSelector
            containerStyle={styles.selectorContainer}
            value={state.stopLimitPrice}
            error={state.stopLimitPriceError}
            errorContent={state.stopLimitPriceErrorContent}
            onChangeText={handlers.onChangeStopLimitPrice}
            symbolInfo={currentSymbol!}
            placeholder={'Stop Price'}
            onFocus={handlers.onFocusStopLimitPrice}
            inputAccessoryViewID={IS_IOS ? InputAccessoryViewID.STOP_LIMIT_PRICE : undefined}
            returnKeyType={IS_IOS ? undefined : 'next'}
            onSubmitEditing={limitPriceInput.current?.focus}
          />
        )}
      </View>
      {IS_STOP_LIMIT_ORDER && (
        <View style={styles.eachPriceInput}>
          <PriceSelector
            containerStyle={styles.selectorContainer}
            value={limitPrice}
            error={limitPriceError}
            errorContent={limitPriceErrorContent}
            onChangeText={handlers.onChangeLimitPrice}
            symbolInfo={currentSymbol!}
            placeholder={'Limit Price'}
            onFocus={handlers.onFocusLimitPrice}
            inputAccessoryViewID={IS_IOS ? InputAccessoryViewID.LIMIT_PRICE : undefined}
            returnKeyType={IS_IOS ? undefined : 'next'}
            onSubmitEditing={quantityInput.current?.focus}
            ref1={limitPriceInput}
          />
        </View>
      )}
      {props.priceAccessoriesData.length > 0 && (
        <View style={styles.containerInputPrice}>
          {props.priceAccessoriesData.map((item, index) => {
            return (
              <View style={styles.containerItemPrice} key={`${item.label}_${item.value}`}>
                <View style={styles.containerRowPrice}>
                  <ItemInputAccessoriesView
                    key={`ItemInputAccessoriesView_priceAccessoriesData_${index}_${item.value}`}
                    item={item}
                    index={index}
                    nativeID={props.nativeIDForAndroid}
                    containerStyle={styles.containerPrice}
                    textStyle={styles.textPrice}
                    onPress={handlers.onPressAccessoriesPrice}
                  />
                </View>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.eachPriceInput}>
        <QuantitySelector
          containerStyle={styles.selectorContainer}
          value={quantity}
          error={quantityError}
          errorContent={quantityErrorContent}
          onChangeText={handlers.onChangeQuantity}
          onFocus={handlers.onFocusQuantity}
          showPercentPicker={IS_NORMAL_ORDER}
          placeholder={'Quantity'}
          symbolInfo={currentSymbol!}
          inputAccessoryViewID={IS_IOS ? InputAccessoryViewID.QUANTITY : undefined}
          avlQty={IS_NORMAL_ORDER ? getAvlQty : undefined}
          ref1={quantityInput}
        />
      </View>
      {(IS_STOP_ORDER || IS_STOP_LIMIT_ORDER) && (
        <View style={styles.datePickerContainer}>
          <DatePicker onChange={handlers.onChangeFromDate} value={state.fromDate} minDate={new Date()} isTrade={true} />
        </View>
      )}
      {(IS_STOP_ORDER || IS_STOP_LIMIT_ORDER) && (
        <View style={styles.datePickerContainer2}>
          <DatePicker onChange={handlers.onChangeToDate} value={state.toDate} minDate={new Date()} isTrade={true} />
        </View>
      )}
      {IS_NORMAL_ORDER && isRealAccount && !isDerivativesAccount(selectedAccount) && (
        <ExpiryCheckbox
          onDateChange={handlers.onDateChange}
          onEnableChange={handlers.onEnableChange}
          value={state.expiryDate}
        />
      )}
      {(!IS_FUTURES_CODE ? IS_BUY && IS_NORMAL_ORDER : IS_NORMAL_ORDER) && (
        <View style={styles.formInfo}>
          <Text allowFontScaling={false} style={styles.formInfoLabel}>
            {t('Buying power')}
          </Text>
          <View style={styles.formItem}>
            <Text allowFontScaling={false} style={styles.formInfoValue}>
              {accessToken ? formatNumber(getBuyingPower, 2) : 0}
            </Text>
          </View>
          {isRealAccount && (
            <IconWithBackground
              containerStyle={styles.iconContainer}
              backgroundColor={dynamicColors.BlueNewColor}
              iconColor={dynamicColors.WHITE}
              name={'plus'}
              onPress={handlers.navigateDepositGuideLine}
            />
          )}
        </View>
      )}
      {IS_NORMAL_ORDER && !IS_FUTURES_CODE && (
        <View style={styles.formInfo}>
          <Text allowFontScaling={false} style={styles.formInfoLabel}>
            {t('Avbl. quantity')}
          </Text>

          <Text allowFontScaling={false} style={styles.formInfoValue}>
            {accessToken &&
            !(priceError || stopPriceError || stopLimitPriceError || quantityError || limitPriceError) ? (
              isRealAccount ? (
                IS_BUY ? (
                  kisEqtGenBuyAll.data?.maxQtty != null ? (
                    formatNumber(getAvlQty)
                  ) : (
                    <ActivityIndicator size="small" color={dynamicColors.DARK_GREEN} />
                  )
                ) : (
                  formatNumber(getAvlQty)
                )
              ) : (
                formatNumber(handleAvailableQtt(getAvlQty))
              )
            ) : (
              0
            )}
          </Text>
        </View>
      )}

      {isRealAccount && IS_NORMAL_ORDER && !IS_FUTURES_CODE && (
        <View style={styles.formInfo}>
          <Text allowFontScaling={false} style={styles.formInfoLabel}>
            {t('Margin Ratio')}
          </Text>
          <Text allowFontScaling={false} style={styles.formInfoValue}>
            {getMarginRatio}
          </Text>
        </View>
      )}
      {IS_NORMAL_ORDER && IS_FUTURES_CODE && IS_BUY && (
        <View style={styles.formInfo}>
          <Text allowFontScaling={false} style={styles.formInfoLabel}>
            {t('Max Buy')}
          </Text>
          <Text allowFontScaling={false} style={styles.formInfoValue}>
            {typeof getMaxBuySellForDerivatives === 'number'
              ? formatNumber(getMaxBuySellForDerivatives as number, 2)
              : getMaxBuySellForDerivatives}
          </Text>
        </View>
      )}
      {IS_NORMAL_ORDER && IS_FUTURES_CODE && IS_SELL && (
        <View style={styles.formInfo}>
          <Text allowFontScaling={false} style={styles.formInfoLabel}>
            {t('Max Sell')}
          </Text>
          <Text allowFontScaling={false} style={styles.formInfoValue}>
            {typeof getMaxBuySellForDerivatives === 'number'
              ? formatNumber(getMaxBuySellForDerivatives as number, 2)
              : getMaxBuySellForDerivatives}
          </Text>
        </View>
      )}

      {!IS_FUTURES_CODE && IS_NORMAL_ORDER && (
        <View style={styles.formInfo2}>
          <Text allowFontScaling={false} style={styles.formInfoLabel}>
            {t('Trading Value')}
          </Text>
          <Text allowFontScaling={false} style={styles.formInfoValue}>
            {typeof tradingValue === 'number' ? formatNumber(tradingValue, 2) : tradingValue}
          </Text>
        </View>
      )}
      <ExecuteButton
        isShowButton={props.isHaveCurrentSymbol}
        getDisableButton={handlers.getDisableButton()}
        isProhibited={isProhibited}
        sellBuyType={sellBuyType}
        showProhibitedAlert={showProhibitedAlert}
        onExecuteForm={handlers.onExecuteForm}
      />

      {ModalExecute.current && (
        <ModalExecute.current
          visible={showModalExecute}
          filterSelecting={filterSelecting}
          sellBuyType={sellBuyType}
          price={price}
          stopPrice={stopPrice}
          stopLimitPrice={stopLimitPrice}
          limitPrice={limitPrice}
          quantity={quantity}
          tradingValue={tradingValue}
          fromDate={fromDate}
          toDate={toDate}
          expiryDate={expiryDate.current}
          isToggleExpiryDate={expiryDateEnable.current}
          closeExecuteModal={handlers.onHideExecuteForm}
          onPressConfirmExecuteForm={handlers.onConfirmExecuteForm}
          isFuturesCode={IS_FUTURES_CODE}
        />
      )}
      <OddLotResultModal />
    </View>
  );
});

export default withMemo(TradeForm);
