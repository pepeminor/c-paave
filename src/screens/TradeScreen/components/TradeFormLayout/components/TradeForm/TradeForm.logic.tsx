import { track } from '@amplitude/analytics-react-native';
import { useIsFocused } from '@react-navigation/core';
import config from 'config';
import APIList from 'config/api';
import { IOrderType, ISpecialPriceType, InputAccessoryViewID, SymbolType } from 'constants/enum';
import { IS_ANDROID } from 'constants/main';
import { addBusinessDays, isAfter, isBefore, isEqual } from 'date-fns';
import { ACCOUNT_TYPE, ITradeTabOption, MARKET, ORDER_TYPE, SELL_BUY_TYPE, SYSTEM_TYPE } from 'global';
import useHandlers from 'hooks/useHandlers';
import useMergingState from 'hooks/useMergingState';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { IDerivativesPurchasingPowerRequest, IMaxBuySellRequest } from 'interfaces/common';
import { IEquityOrderParams, IEquityOrderStopParams } from 'interfaces/equity';
import { IAccountBuyableParams, IAccountSellableParams } from 'interfaces/market';
import { ReducerStatus } from 'interfaces/reducer';
import { FunctionComponent, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { Keyboard, TextInput } from 'react-native';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import {
  formatDateToString,
  insertObjectIf,
  isDerivativesAccount,
  isEquityAccount,
  isKisAccount,
  isVirtualAccount,
  navigate,
  priceStep,
} from 'utils';
import { IExecuteModalBaseProps } from '../ExecuteModal';
import { getTempListPrice } from './TradeForm.helper';
import {
  IProps,
  ITempListPriceType,
  ITradeFormRef,
  LIST_ORDER_TYPE_KIS,
  LIST_ORDER_TYPE_VIRTUAL,
} from './TradeForm.type';

const initializeState = {
  filterSelecting: ORDER_TYPE.NORMAL_ORDER,
  price: 0 as number | ISpecialPriceType,
  priceError: false,
  priceErrorContent: '',
  stopPrice: 0 as number,
  stopPriceError: false,
  stopPriceErrorContent: '',
  stopLimitPrice: 0 as number,
  stopLimitPriceError: false,
  stopLimitPriceErrorContent: '',
  limitPrice: 0 as number | ISpecialPriceType,
  limitPriceError: false,
  limitPriceErrorContent: '',
  quantity: 0,
  quantityError: false,
  quantityErrorContent: '',
  fromDate: new Date(),
  toDate: new Date(),
  expiryDate: new Date(),
  tradingValue: 0 as number | '-',
  visibleModalOrderType: false,

  showModalExecute: false,
};

const useTradeFormLogic = (props: IProps, ref: ITradeFormRef) => {
  const [state, setState] = useMergingState(initializeState);

  const getBuyingPower = useMemo((): number => {
    const {
      isRealAccount,
      selectedAccount,
      kisEqtAssetInfo,
      kisEqtStockInfo,
      buyableInfo,
      derivativesPurchasingPower,
    } = props;
    if (isRealAccount) {
      if (
        selectedAccount.selectedSubAccount?.accountNumber?.toUpperCase?.().includes('X') &&
        kisEqtAssetInfo.status === ReducerStatus.SUCCESS &&
        kisEqtAssetInfo.data != null
      ) {
        return kisEqtAssetInfo.data.buyingPower.purchasingPower;
      } else if (
        !selectedAccount.selectedSubAccount?.accountNumber?.toUpperCase?.().includes('D') &&
        kisEqtStockInfo.status === ReducerStatus.SUCCESS &&
        kisEqtStockInfo.data != null
      ) {
        return kisEqtStockInfo.data.PP;
      } else if (
        derivativesPurchasingPower.status === ReducerStatus.SUCCESS &&
        derivativesPurchasingPower.data != null
      ) {
        return derivativesPurchasingPower.data;
      }

      return 0;
    }

    return buyableInfo.data?.buyingPower ?? 0;
  }, [
    props.isRealAccount,
    props.selectedAccount,
    props.kisEqtAssetInfo,
    props.kisEqtStockInfo,
    props.buyableInfo,
    props.derivativesPurchasingPower,
  ]);

  const propsRefJson = {
    ...props,
    ...state,
    getBuyingPower,
  };

  const propsRef = useRef(propsRefJson);
  propsRef.current = propsRefJson;

  const quantityInput = useRef<TextInput>(null);
  const limitPriceInput = useRef<TextInput>(null);
  const priceEdited = useRef(false);
  const prevSelectedSymbol = useRef<string | null>(null);
  const expiryDate = useRef<Date>(addBusinessDays(new Date(), 1));
  const expiryDateEnable = useRef(false);
  const refreshingSymbolData = useRef<boolean>(false);
  const ModalExecute = useRef<FunctionComponent<IExecuteModalBaseProps>>();

  const isFocused = useIsFocused();

  const handlers = useHandlers({
    onSelectBuy: () => {
      if (propsRef.current.sellBuyType === SELL_BUY_TYPE.SELL) {
        propsRef.current.setSellBuyType(SELL_BUY_TYPE.BUY);
        handlers.doQueryEquityAvailableQuantity({ sellBuyTypeParam: SELL_BUY_TYPE.BUY });
        setState({
          quantity: 0,
        });
      }
    },
    onSelectSell: () => {
      if (propsRef.current.sellBuyType === SELL_BUY_TYPE.BUY) {
        propsRef.current.setSellBuyType(SELL_BUY_TYPE.SELL);
        handlers.doQueryEquityAvailableQuantity({ sellBuyTypeParam: SELL_BUY_TYPE.SELL });
        setState({
          quantity: 0,
        });
      }
    },
    onSelectFilter: (filterSelecting: ORDER_TYPE) => {
      const { currentSymbol, selectedAccount, onChangeNativeIDForAndroid } = propsRef.current;
      const defaultPrice = currentSymbol?.currentPrice ?? currentSymbol?.referencePrice ?? 0;
      onChangeNativeIDForAndroid({
        tempListPrice: getTempListPrice(
          filterSelecting,
          currentSymbol?.market!,
          selectedAccount.type,
          currentSymbol?.symbolType === 'FUTURES' ? SYSTEM_TYPE.DERIVATIVES : SYSTEM_TYPE.EQUITY
        ),
      });
      setState({
        ...initializeState,
        filterSelecting,
        price: defaultPrice,
        // limitPrice: defaultPrice,
        stopPrice: defaultPrice,
        stopLimitPrice: defaultPrice,
      });

      priceEdited.current = false;
      expiryDate.current = addBusinessDays(new Date(), 1);
      expiryDateEnable.current = false;
      Keyboard.dismiss();
    },
    doValidatePrice: (value?: number): boolean => {
      const { currentSymbol, price } = propsRef.current;
      const isCurrentPrice =
        value == null && currentSymbol != null && prevSelectedSymbol.current !== currentSymbol.symbolCode;

      const finalValue = isCurrentPrice
        ? currentSymbol?.currentPrice ?? currentSymbol?.referencePrice ?? 0
        : value ?? (price as number);

      if (finalValue < (currentSymbol?.floorPrice ?? 0) || finalValue > (currentSymbol?.ceilingPrice ?? 0)) {
        setState({
          priceError: true,
          priceErrorContent: 'ORDER_PRICE_RANGE_INVALID',
        });

        return false;
      }

      if ((currentSymbol?.symbolType === 'FUTURES' && !Number.isInteger(finalValue * 10)) || finalValue <= 0) {
        setState({
          priceError: true,
          priceErrorContent: 'WRONG_PRICESTEP',
        });

        return false;
      }

      if (
        currentSymbol?.symbolType !== 'FUTURES' &&
        currentSymbol?.market &&
        finalValue % priceStep(finalValue, currentSymbol.market, currentSymbol.symbolType) !== 0
      ) {
        setState({
          priceError: true,
          priceErrorContent: 'WRONG_PRICESTEP',
        });

        return false;
      }

      setState({
        priceError: false,
        priceErrorContent: '',
      });

      return true;
    },
    queryKisEquityAvailableQuantity: ({
      sellBuyTypeParam,
      priceParam,
    }: {
      sellBuyTypeParam: string | null | undefined;
      priceParam: number | null | undefined;
    }) => {
      const { selectedAccount, currentSymbol, kisEqtAssetInfo, kisEqtStockInfo } = propsRef.current;
      if (
        selectedAccount.username != null &&
        selectedAccount.selectedSubAccount != null &&
        currentSymbol != null &&
        currentSymbol.symbolCode != null &&
        currentSymbol.market != null &&
        sellBuyTypeParam != null &&
        priceParam != null
      ) {
        if (sellBuyTypeParam === SELL_BUY_TYPE.BUY) {
          const params = {
            clientID: selectedAccount.username,
            accountNo: selectedAccount.selectedSubAccount.accountNumber,
            symbolCode: currentSymbol.symbolCode,
            market: currentSymbol.market,
            price: priceParam,
            sellBuyType: sellBuyTypeParam,
          };
          selectedAccount.selectedSubAccount.accountNumber.toUpperCase().includes('X')
            ? kisEqtAssetInfo.data?.buyingPower.purchasingPower != null &&
              props.kisGetEqtGenBuyAll({
                ...params,
                PP: kisEqtAssetInfo.data.buyingPower.purchasingPower,
              })
            : kisEqtStockInfo.data?.PP != null &&
              props.kisGetEqtGenBuyAll({
                ...params,
                PP: kisEqtStockInfo.data.PP,
              });
        } else {
          props.kisGetEqtEnquiryPortfolio({
            accountNumber: selectedAccount.selectedSubAccount.accountNumber,
          });
        }
      }
    },
    queryEquityAvailableQuantity: (sellBuyTypeParam: string | null | undefined) => {
      const { currentSymbol } = propsRef.current;
      if (currentSymbol != null && sellBuyTypeParam != null) {
        const params: IAccountBuyableParams | IAccountSellableParams = {
          stockCode: currentSymbol?.symbolCode,
        };

        if (sellBuyTypeParam === SELL_BUY_TYPE.BUY) {
          props.queryEquityBuyable({
            ...params,
            marketType: (currentSymbol.market as MARKET) || MARKET.HNX,
            orderPrice: 1,
          });
        } else {
          props.queryEquitySellable(params);
        }
      }
    },
    doQueryEquityAvailableQuantity: ({
      sellBuyTypeParam,
      priceParam,
    }: {
      sellBuyTypeParam?: SELL_BUY_TYPE;
      priceParam?: number;
    }) => {
      const { selectedAccount, currentSymbol, accessToken, sellBuyType } = propsRef.current;
      if (accessToken && currentSymbol != null) {
        selectedAccount.type === ACCOUNT_TYPE.KIS && isEquityAccount(selectedAccount)
          ? handlers.queryKisEquityAvailableQuantity({
              sellBuyTypeParam: sellBuyTypeParam ?? sellBuyType,
              priceParam: priceParam ?? currentSymbol.referencePrice,
            })
          : handlers.queryEquityAvailableQuantity(sellBuyTypeParam ?? sellBuyType);
      }
    },
    onChangePrice: (value: string) => {
      const { isRealAccount, filterSelecting, quantity, currentSymbol } = propsRef.current;
      if (!isNaN(Number(value))) {
        setState({
          price: Number(value),
        });

        priceEdited.current = true;
        if (handlers.doValidatePrice(Number(value)) && isRealAccount) {
          handlers.doQueryEquityAvailableQuantity({
            priceParam: Number(value),
          });
        }
        if (filterSelecting === ORDER_TYPE.NORMAL_ORDER) {
          if (quantity === 0) {
            setState({
              tradingValue: 0,
            });
          } else {
            setState({
              tradingValue: quantity * Number(value),
            });
          }
        }
      } else {
        setState({
          price: currentSymbol?.floorPrice ?? 0,
        });
        priceEdited.current = true;
        handlers.doValidatePrice(0);
        if (filterSelecting === ORDER_TYPE.NORMAL_ORDER) {
          setState({
            tradingValue: 0,
          });
        }
      }
    },
    onFocusPrice: () => {
      const { currentSymbol, filterSelecting, selectedAccountType, onChangeNativeIDForAndroid } = propsRef.current;
      onChangeNativeIDForAndroid({
        ...insertObjectIf(IS_ANDROID, { nativeID: InputAccessoryViewID.PRICE }),
        tempListPrice: getTempListPrice(
          filterSelecting,
          currentSymbol?.market != null ? currentSymbol.market : MARKET.UPCOM,
          selectedAccountType,
          currentSymbol?.symbolType === SymbolType.FUTURES ? SYSTEM_TYPE.DERIVATIVES : SYSTEM_TYPE.EQUITY,
          InputAccessoryViewID.PRICE
        ),
      });
    },
    doValidateStopPrice: ({ value, fromDate2 }: { value?: number; fromDate2?: Date }) => {
      const { currentSymbol, sellBuyType, stopPrice, fromDate } = propsRef.current;
      const finalValue = value ?? stopPrice;
      const finalFromDate = fromDate2 ?? fromDate;
      if (currentSymbol?.market != null && finalValue % priceStep(finalValue, currentSymbol.market) !== 0) {
        setState({
          stopPriceError: true,
          stopPriceErrorContent: 'WRONG_PRICESTEP',
        });

        return false;
      }
      if (isEqual(finalFromDate.setHours(0, 0, 0, 0), new Date().setHours(0, 0, 0, 0))) {
        if (finalValue < (currentSymbol?.floorPrice ?? 0) || finalValue > (currentSymbol?.ceilingPrice ?? 0)) {
          setState({
            stopPriceError: true,
            stopPriceErrorContent: 'STOP_PRICE_RANGE_INVALID',
          });
          return false;
        }

        if (sellBuyType === SELL_BUY_TYPE.BUY) {
          if (currentSymbol?.currentPrice != null) {
            if (finalValue <= currentSymbol?.currentPrice || finalValue <= currentSymbol.referencePrice) {
              setState({
                stopPriceError: true,
                stopPriceErrorContent: 'BUY_STOP_PRICE_INVALID',
              });
              return false;
            }
          } else {
            setState({
              stopPriceError: true,
              stopPriceErrorContent: 'BUY_STOP_PRICE_INVALID',
            });
            return false;
          }
        } else {
          if (currentSymbol?.currentPrice != null) {
            if (finalValue >= currentSymbol?.currentPrice || finalValue >= currentSymbol.referencePrice) {
              setState({
                stopPriceError: true,
                stopPriceErrorContent: 'SELL_STOP_PRICE_INVALID',
              });
              return false;
            }
          } else {
            setState({
              stopPriceError: true,
              stopPriceErrorContent: 'SELL_STOP_PRICE_INVALID',
            });
            return false;
          }
        }
      }

      setState({
        stopPriceError: false,
        stopPriceErrorContent: '',
      });
      return true;
    },
    onChangeStopPrice: (value: string) => {
      if (!isNaN(Number(value))) {
        setState({
          stopPrice: Number(value),
        });
        handlers.doValidateStopPrice({ value: Number(value) });
      } else {
        setState({
          stopPrice: 0,
        });
        handlers.doValidateStopPrice({ value: 0 });
      }
    },
    onFocusStopPrice: () => {
      if (IS_ANDROID) {
        propsRef.current.onChangeNativeIDForAndroid({
          nativeID: InputAccessoryViewID.STOP_PRICE,
        });
      }
    },
    doValidateStopLimitPrice: ({ value, fromDate2 }: { value?: number; fromDate2?: Date }) => {
      const { currentSymbol, sellBuyType, stopLimitPrice, fromDate } = propsRef.current;
      const finalValue = value ?? stopLimitPrice;
      const finalFromDate = fromDate2 ?? fromDate;
      if (currentSymbol?.market != null && finalValue % priceStep(finalValue, currentSymbol.market) !== 0) {
        setState({
          stopLimitPriceError: true,
          stopLimitPriceErrorContent: 'WRONG_PRICESTEP',
        });
        return false;
      }

      if (isEqual(finalFromDate.setHours(0, 0, 0, 0), new Date().setHours(0, 0, 0, 0))) {
        if (finalValue < (currentSymbol?.floorPrice ?? 0) || finalValue > (currentSymbol?.ceilingPrice ?? 0)) {
          setState({
            stopLimitPriceError: true,
            stopLimitPriceErrorContent: 'STOP_PRICE_RANGE_INVALID',
          });
          return false;
        } else {
          if (sellBuyType === SELL_BUY_TYPE.BUY) {
            if (currentSymbol?.currentPrice != null) {
              if (
                finalValue <= currentSymbol?.currentPrice ||
                (currentSymbol.currentPrice === 0 && finalValue <= currentSymbol?.referencePrice)
              ) {
                setState({
                  stopLimitPriceError: true,
                  stopLimitPriceErrorContent: 'BUY_STOP_PRICE_INVALID',
                });
                return false;
              }
            } else {
              setState({
                stopLimitPriceError: true,
                stopLimitPriceErrorContent: 'BUY_STOP_PRICE_INVALID',
              });
              return false;
            }
          } else {
            if (currentSymbol?.currentPrice != null) {
              if (
                finalValue >= currentSymbol.currentPrice ||
                (currentSymbol.currentPrice === 0 && finalValue >= currentSymbol.referencePrice)
              ) {
                setState({
                  stopLimitPriceError: true,
                  stopLimitPriceErrorContent: 'SELL_STOP_PRICE_INVALID',
                });
                return false;
              }
            } else {
              setState({
                stopLimitPriceError: true,
                stopLimitPriceErrorContent: 'SELL_STOP_PRICE_INVALID',
              });
              return false;
            }
          }
        }
      }

      setState({
        stopLimitPriceError: false,
        stopLimitPriceErrorContent: '',
      });
      return true;
    },
    onChangeStopLimitPrice: (value: string) => {
      if (!isNaN(Number(value))) {
        setState({
          stopLimitPrice: Number(value),
        });
        handlers.doValidateStopLimitPrice({ value: Number(value) });
      } else {
        setState({
          stopLimitPrice: 0,
        });
        handlers.doValidateStopLimitPrice({ value: 0 });
      }
    },
    onFocusStopLimitPrice: () => {
      const { currentSymbol, filterSelecting, selectedAccountType, onChangeNativeIDForAndroid } = propsRef.current;
      onChangeNativeIDForAndroid({
        ...insertObjectIf(IS_ANDROID, { nativeID: InputAccessoryViewID.STOP_LIMIT_PRICE }),
        tempListPrice: getTempListPrice(
          filterSelecting,
          currentSymbol?.market != null ? currentSymbol.market : MARKET.UPCOM,
          selectedAccountType,
          currentSymbol?.symbolType === SymbolType.FUTURES ? SYSTEM_TYPE.DERIVATIVES : SYSTEM_TYPE.EQUITY,
          InputAccessoryViewID.STOP_LIMIT_PRICE
        ),
      });
    },
    doValidateLimitPrice: ({ value, fromDate2 }: { value?: number; fromDate2?: Date }) => {
      const { currentSymbol, limitPrice, fromDate } = propsRef.current;
      const finalValue = value ?? (limitPrice as number);
      const finalFromDate = fromDate2 ?? fromDate;
      if (currentSymbol?.market != null && finalValue % priceStep(finalValue, currentSymbol.market) !== 0) {
        setState({
          limitPriceError: true,
          limitPriceErrorContent: 'WRONG_PRICESTEP',
        });
        return false;
      } else if (isEqual(finalFromDate.setHours(0, 0, 0, 0), new Date().setHours(0, 0, 0, 0))) {
        if (finalValue < (currentSymbol?.floorPrice ?? 0) || finalValue > (currentSymbol?.ceilingPrice ?? 0)) {
          setState({
            limitPriceError: true,
            limitPriceErrorContent: 'STOP_LIMIT_PRICE_RANGE_INVALID',
          });
          return false;
        }
      }

      setState({
        limitPriceError: false,
        limitPriceErrorContent: '',
      });
      return true;
    },
    onChangeLimitPrice: (value: string) => {
      if (!isNaN(Number(value))) {
        setState({
          limitPrice: Number(value),
        });
        handlers.doValidateLimitPrice({ value: Number(value) });
      } else {
        setState({
          limitPrice: 0,
        });
        handlers.doValidateLimitPrice({ value: 0 });
      }
    },
    onFocusLimitPrice: () => {
      const { currentSymbol, filterSelecting, selectedAccount, onChangeNativeIDForAndroid } = propsRef.current;
      onChangeNativeIDForAndroid({
        ...insertObjectIf(IS_ANDROID, { nativeID: InputAccessoryViewID.LIMIT_PRICE }),
        tempListPrice: getTempListPrice(
          filterSelecting,
          currentSymbol?.market != null ? currentSymbol.market : MARKET.UPCOM,
          selectedAccount.type,
          currentSymbol?.symbolType === SymbolType.FUTURES ? SYSTEM_TYPE.DERIVATIVES : SYSTEM_TYPE.EQUITY,
          InputAccessoryViewID.LIMIT_PRICE
        ),
      });
    },
    doValidateQuantity: (value?: number): boolean => {
      const {
        kisEqtGenBuyAll,
        currentSymbol,
        quantity,
        selectedAccount,
        filterSelecting,
        sellBuyType,
        price,
        buyableInfo,
        maxBuySell,
        sellableInfo,
        kisEquityEnquiryPortfolio,
        getBuyingPower,
      } = propsRef.current;
      const finalValue = value ?? quantity;
      if (finalValue > (currentSymbol?.symbolType === SymbolType.FUTURES ? 500 : 500000)) {
        setState({
          quantityError: true,
          quantityErrorContent: 'ORDER_QUANTITY_LOTS_INVALID',
        });
        return false;
      }

      if (
        (isVirtualAccount(selectedAccount) ||
          filterSelecting !== ORDER_TYPE.NORMAL_ORDER ||
          typeof price !== 'number') &&
        finalValue % 100 !== 0
      ) {
        setState({
          quantityError: true,
          quantityErrorContent: 'ORDER_QUANTITY_BATCH_INVALID',
        });
        return false;
      }

      if (filterSelecting === ORDER_TYPE.NORMAL_ORDER) {
        if (sellBuyType === SELL_BUY_TYPE.BUY) {
          if (selectedAccount.type !== ACCOUNT_TYPE.KIS) {
            const isFailed = buyableInfo.status === ReducerStatus.FAILED;
            const isSuccess = buyableInfo.status === ReducerStatus.SUCCESS;
            const buyableInfoData = buyableInfo.data;

            if (finalValue > 0 && (isFailed || isSuccess)) {
              let isError = true;

              if (isSuccess && buyableInfoData != null) {
                let avlQty = 0;
                if (typeof price === 'number' && price) {
                  avlQty = buyableInfoData.buyingPower / (config.fee * price);
                } else if (currentSymbol?.ceilingPrice) {
                  avlQty = buyableInfoData.buyingPower / (config.fee * currentSymbol.ceilingPrice);
                }

                if (finalValue <= avlQty) {
                  isError = false;
                }
              }

              if (isError) {
                setState({
                  quantityError: true,
                  quantityErrorContent: 'OVER_AVAILABLE',
                });
                return false;
              }
            }
            setState({
              quantityError: false,
              quantityErrorContent: '',
            });
            return true;
          } else {
            if (isEquityAccount(selectedAccount)) {
              const isFailed = kisEqtGenBuyAll.status === ReducerStatus.FAILED;
              const isSuccess = kisEqtGenBuyAll.status === ReducerStatus.SUCCESS;
              const genBuyAllData = kisEqtGenBuyAll.data;
              const maxQuantity = getBuyingPower / (price as number);

              if (
                finalValue > 0 &&
                (isFailed || (isSuccess && finalValue > genBuyAllData?.maxQtty! && finalValue > maxQuantity))
              ) {
                setState({
                  quantityError: true,
                  quantityErrorContent: 'OVER_AVAILABLE',
                });
                return false;
              }
            } else {
              const isFailed = maxBuySell.status === ReducerStatus.FAILED;
              const isSuccess = maxBuySell.status === ReducerStatus.SUCCESS;
              const maxBuySellData = maxBuySell.data;

              if (
                finalValue > 0 &&
                (isFailed || (isSuccess && (maxBuySellData == null || finalValue > maxBuySellData.maxLong)))
              ) {
                setState({
                  quantityError: true,
                  quantityErrorContent: 'OVER_AVAILABLE',
                });
                return false;
              }
            }
            setState({
              quantityError: false,
              quantityErrorContent: '',
            });
            return true;
          }
        } else {
          if (selectedAccount.type !== ACCOUNT_TYPE.KIS) {
            const isFailed = sellableInfo.status === ReducerStatus.FAILED;
            const isSuccess = sellableInfo.status === ReducerStatus.SUCCESS;
            const sellableInfoData = sellableInfo.data;

            if (
              finalValue > 0 &&
              (isFailed || (isSuccess && (sellableInfoData == null || finalValue > sellableInfoData.sellableQuantity)))
            ) {
              setState({
                quantityError: true,
                quantityErrorContent: 'OVER_AVAILABLE',
              });
              return false;
            }

            setState({
              quantityError: false,
              quantityErrorContent: '',
            });
            return true;
          } else {
            if (selectedAccount?.selectedSubAccount?.accountSubs[0] != null) {
              if (isEquityAccount(selectedAccount)) {
                const selectedAccountNumber = selectedAccount.selectedSubAccount.accountNumber;
                const isFailed = kisEquityEnquiryPortfolio.status === ReducerStatus.FAILED;
                const isSuccess = kisEquityEnquiryPortfolio.status === ReducerStatus.SUCCESS;
                const kisEquityEnquiryPortfolioData = kisEquityEnquiryPortfolio.data;

                if (isFailed || isSuccess) {
                  let isError = true;

                  if (isSuccess && kisEquityEnquiryPortfolioData != null) {
                    let avlQty = 0;

                    const accountPortfolio = kisEquityEnquiryPortfolioData.find(
                      item => item.accountNumber === selectedAccountNumber
                    )?.portfolioList;

                    const sellable = accountPortfolio?.find(
                      item => item.symbol === currentSymbol?.symbolCode
                    )?.sellable;

                    if (sellable) {
                      avlQty = sellable;
                    }

                    if (finalValue <= avlQty) {
                      isError = false;
                    }
                  }

                  if (isError) {
                    setState({
                      quantityError: true,
                      quantityErrorContent: 'OVER_AVAILABLE',
                    });
                    return false;
                  }
                }
                setState({
                  quantityError: false,
                  quantityErrorContent: '',
                });
                return true;
              } else {
                const isFailed = maxBuySell.status === ReducerStatus.FAILED;
                const isSuccess = maxBuySell.status === ReducerStatus.SUCCESS;
                const maxBuySellData = maxBuySell.data;

                if (
                  finalValue > 0 &&
                  (isFailed || (isSuccess && (maxBuySellData == null || finalValue > maxBuySellData.maxShort)))
                ) {
                  setState({
                    quantityError: true,
                    quantityErrorContent: 'OVER_AVAILABLE',
                  });
                  return false;
                }

                setState({
                  quantityError: false,
                  quantityErrorContent: '',
                });
                return true;
              }
            } else {
              setState({
                quantityError: true,
                quantityErrorContent: 'OVER_AVAILABLE',
              });
              return false;
            }
          }
        }
      } else {
        setState({
          quantityError: false,
          quantityErrorContent: '',
        });
        return true;
      }
    },
    onChangeQuantity: (value: string) => {
      const { filterSelecting, price } = propsRef.current;
      if (!isNaN(Number(value))) {
        setState({
          ...insertObjectIf(filterSelecting === ORDER_TYPE.NORMAL_ORDER, {
            tradingValue: typeof price === 'number' ? price * (value as unknown as number) : '-',
          }),
          quantity: Number(value),
        });
        handlers.doValidateQuantity(Number(value));
      } else {
        setState({
          ...insertObjectIf(filterSelecting === ORDER_TYPE.NORMAL_ORDER, { tradingValue: 0 }),
          quantity: 0,
        });
        handlers.doValidateQuantity(0);
      }
    },
    onFocusQuantity: () => {
      if (IS_ANDROID) {
        propsRef.current.onChangeNativeIDForAndroid({
          nativeID: InputAccessoryViewID.QUANTITY,
        });
      }
    },
    onChangeFromDate: (value: Date) => {
      const { toDate, filterSelecting, limitPrice } = propsRef.current;
      if (filterSelecting === ORDER_TYPE.STOP_ORDER) {
        handlers.doValidateStopPrice({ fromDate2: value });
      } else if (filterSelecting === ORDER_TYPE.STOP_LIMIT_ORDER) {
        handlers.doValidateStopLimitPrice({ fromDate2: value });
        typeof limitPrice === 'number' && handlers.doValidateLimitPrice({ fromDate2: value });
      }
      if (isAfter(value, toDate)) {
        setState({
          toDate: value,
        });
      }
      setState({
        fromDate: value,
      });
    },
    onChangeToDate: (value: Date) => {
      const { fromDate } = propsRef.current;
      if (isBefore(value, fromDate)) {
        setState({
          fromDate: value,
        });
      }
      setState({
        toDate: value,
      });
    },
    onDateChange: (value: Date) => {
      expiryDate.current = value;
    },
    onEnableChange: (value: boolean) => {
      expiryDateEnable.current = value;
    },
    navigateDepositGuideLine: () => {
      navigate({
        key: ScreenNames.DepositGuideLine,
      });
    },
    validateAll: () => {
      const { filterSelecting, limitPrice, price } = propsRef.current;
      if (filterSelecting === ORDER_TYPE.NORMAL_ORDER) {
        if (typeof price === 'number' && handlers.doValidatePrice() === false) {
          return false;
        }
        if (handlers.doValidateQuantity() === false) {
          return false;
        }
      } else if (filterSelecting === ORDER_TYPE.STOP_ORDER) {
        if (handlers.doValidateStopPrice({}) === false) {
          return false;
        }
        if (handlers.doValidateQuantity() === false) {
          return false;
        }
      } else {
        if (handlers.doValidateStopLimitPrice({}) === false) {
          return false;
        }
        if (typeof limitPrice === 'number' && handlers.doValidateLimitPrice({}) === false) {
          return false;
        }
        if (handlers.doValidateQuantity() === false) {
          return false;
        }
      }
      return true;
    },
    onExecuteForm: () => {
      if (props.selectedAccount.type === ACCOUNT_TYPE.DEMO) {
        propsRef.current.showNonLoginModal();
        return;
      }

      if (handlers.validateAll()) {
        if (ModalExecute) {
          ModalExecute.current = require('../ExecuteModal/index.tsx').default;
        }
        setState({
          showModalExecute: true,
        });
      }
    },
    onHideExecuteForm: () => {
      ModalExecute.current = undefined;
      setState({
        showModalExecute: false,
      });
    },
    resetWholeForm: (cachePrice?: boolean) => {
      const { currentSymbol, price, limitPrice, stopPrice, stopLimitPrice, filterSelecting } = propsRef.current;
      const defaultPrice = currentSymbol?.currentPrice ?? currentSymbol?.referencePrice ?? 0;
      setState({
        ...initializeState,
        filterSelecting,
        price: cachePrice ? price : defaultPrice,
        limitPrice: cachePrice ? limitPrice : defaultPrice,
        stopPrice: cachePrice ? stopPrice : defaultPrice,
        stopLimitPrice: cachePrice ? stopLimitPrice : defaultPrice,
        tradingValue: (currentSymbol?.currentPrice ?? 0) * 0,
      });

      priceEdited.current = false;
      expiryDate.current = addBusinessDays(new Date(), 1);
      expiryDateEnable.current = false;
      Keyboard.dismiss();
    },
    orderStopEquityAction: () => {
      const {
        fromDate,
        toDate,
        quantity,
        filterSelecting,
        sellBuyType,
        currentSymbol,
        limitPrice,
        stopPrice,
        stopLimitPrice,
        postOrderStopEquity,
      } = propsRef.current;
      if (currentSymbol?.symbolType == null || currentSymbol?.symbolCode == null) return;
      const params: IEquityOrderStopParams = {
        sellBuyType,
        securitiesType: currentSymbol.symbolType,
        stopPrice: filterSelecting === ORDER_TYPE.STOP_ORDER ? stopPrice : stopLimitPrice,
        stockCode: currentSymbol.symbolCode,
        fromDate: formatDateToString(fromDate, 'yyyyMMdd') ?? '',
        toDate: formatDateToString(toDate, 'yyyyMMdd') ?? '',
        orderType: typeof limitPrice === 'number' && limitPrice > 0 ? IOrderType.STOP_LIMIT : IOrderType.STOP,
        orderQuantity: quantity,
        orderPrice: typeof limitPrice === 'number' ? limitPrice : undefined,
        macAddress: config.uniqueId,
      };
      postOrderStopEquity(
        params,
        {
          message: 'Order has been placed successfully',
        },
        undefined,
        true,
        undefined,
        {
          handleSuccess: () => {
            handlers.resetWholeForm(true);
          },
        }
      );
    },
    onConfirmExecuteForm: () => {
      handlers.onHideExecuteForm();
      const {
        realTradingPostEqtOrder,
        filterSelecting,
        currentSymbol,
        selectedAccount,
        isRealAccount,
        price,
        quantity,
        sellBuyType,
        handleOrderKisSuccess,
        setTradeTabOption,
        realTradingPostEqtOrderOddLot,
        realTradingPostDerOrder,
        postOrderEquity,
      } = propsRef.current;
      switch (filterSelecting) {
        case ORDER_TYPE.NORMAL_ORDER:
          if (currentSymbol?.symbolCode != null && currentSymbol.market != null) {
            if (isRealAccount) {
              if (selectedAccount?.selectedSubAccount?.accountSubs?.[0] != null) {
                if (isEquityAccount(selectedAccount)) {
                  const params = {
                    sellBuyType,
                    accountNumber: selectedAccount.selectedSubAccount.accountNumber,
                    code: currentSymbol.symbolCode,
                    orderPrice: typeof price === 'number' ? price : undefined,
                    marketType: currentSymbol.market,
                    orderQuantity: quantity,
                    expiryDate: expiryDateEnable.current
                      ? formatDateToString(expiryDate.current, 'yyyyMMdd') ?? ''
                      : '',
                    orderType: ISpecialPriceType.LO,
                    macAddress: config.uniqueId,
                  };
                  if (typeof price === 'string' || quantity % 100 === 0) {
                    realTradingPostEqtOrder(
                      {
                        ...params,
                        orderType: typeof price === 'string' ? price : ISpecialPriceType.LO,
                      },
                      {
                        message: 'Order has been placed successfully',
                      },
                      undefined,
                      true,
                      undefined,
                      {
                        handleSuccess: () => {
                          handlers.resetWholeForm(true);
                          setTradeTabOption(ITradeTabOption.ORDER_BOOK);
                          handleOrderKisSuccess({});
                        },
                      }
                    );
                  } else if (quantity % 100 !== 0) {
                    realTradingPostEqtOrderOddLot(
                      { ...params, orderType: ISpecialPriceType.ODDLOT },
                      {
                        message: 'Order has been placed successfully',
                      },
                      undefined,
                      true,
                      undefined,
                      {
                        handleSuccess: () => {
                          handlers.resetWholeForm();
                          setTradeTabOption(ITradeTabOption.ORDER_BOOK);
                          handleOrderKisSuccess({});
                        },
                      }
                    );
                  }
                } else if (currentSymbol.symbolType === SymbolType.FUTURES) {
                  const params = {
                    code: currentSymbol.symbolCode,
                    validity: 'Day',
                    orderType: typeof price === 'string' ? price : ISpecialPriceType.LO,
                    orderPrice: typeof price === 'number' ? price : undefined,
                    sellBuyType,
                    accountNumber: selectedAccount.selectedSubAccount.accountNumber,
                    orderQuantity: quantity,
                    macAddress: config.uniqueId,
                  };
                  realTradingPostDerOrder(
                    params,
                    {
                      message: 'Order has been placed successfully',
                    },
                    undefined,
                    true,
                    undefined,
                    {
                      handleSuccess: () => {
                        handlers.resetWholeForm(true);
                        setTradeTabOption(ITradeTabOption.ORDER_BOOK);
                      },
                    }
                  );
                }
              }
            } else if (selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
              const params: IEquityOrderParams = {
                code: currentSymbol.symbolCode,
                quantity: quantity,
                action: sellBuyType,
                orderCommand: typeof price === 'string' ? price : ISpecialPriceType.LO,
                price: typeof price === 'number' ? price : undefined,
                macAddress: config.uniqueId,
              };
              postOrderEquity(
                params,
                {
                  message: 'Order has been placed successfully',
                },
                undefined,
                true,
                undefined,
                {
                  handleSuccess: () => {
                    handlers.resetWholeForm(true);
                  },
                }
              );
            } else {
              handlers.resetWholeForm();
            }
          }
          break;
        case ORDER_TYPE.STOP_ORDER:
          handlers.orderStopEquityAction();
          break;
        case ORDER_TYPE.STOP_LIMIT_ORDER:
          handlers.orderStopEquityAction();

          break;

        default:
          break;
      }
    },
    getDisableButton: () => {
      const {
        maxBuySell,
        filterSelecting,
        selectedAccount,
        currentSymbol,
        sellBuyType,
        price,
        quantity,
        priceError,
        quantityError,
        kisEqtGenBuyAll,
        kisEquityEnquiryPortfolio,
        buyableInfo,
        sellableInfo,
        stopPrice,
        stopPriceError,
        stopLimitPrice,
        limitPrice,
        stopLimitPriceError,
        limitPriceError,
        accessToken,
      } = propsRef.current;
      if (currentSymbol == null) return true;
      switch (filterSelecting) {
        case ORDER_TYPE.NORMAL_ORDER:
          if (price == null || price === 0 || quantity === 0 || priceError || quantityError) {
            return true;
          }

          const isDerivatives = isDerivativesAccount(selectedAccount);
          const isFuturesType = currentSymbol.symbolType === SymbolType.FUTURES;
          if (isFuturesType && !isDerivatives) {
            return true;
          }

          if (isKisAccount(selectedAccount)) {
            if (isDerivatives) {
              return maxBuySell.status !== ReducerStatus.SUCCESS;
            } else {
              return (
                (sellBuyType === SELL_BUY_TYPE.BUY ? kisEqtGenBuyAll : kisEquityEnquiryPortfolio).status !==
                ReducerStatus.SUCCESS
              );
            }
          }

          if (isVirtualAccount(selectedAccount)) {
            const isBuy = sellBuyType === SELL_BUY_TYPE.BUY;
            return (isBuy ? buyableInfo : sellableInfo).status !== ReducerStatus.SUCCESS;
          }

          break;
        case ORDER_TYPE.STOP_ORDER:
          if (stopPrice === 0 || quantity === 0 || stopPriceError || quantityError) {
            return true;
          }
          break;
        default:
          if (
            stopLimitPrice === 0 ||
            limitPrice === 0 ||
            quantity === 0 ||
            stopLimitPriceError ||
            limitPriceError ||
            quantityError
          ) {
            return true;
          }
          break;
      }
      if (!accessToken) {
        return true;
      }
      return false;
    },
    onPressAccessories: ({ item, nativeID }: { item: ITempListPriceType; nativeID: InputAccessoryViewID }) => {
      const { price, filterSelecting, isRealAccount } = propsRef.current;
      if (nativeID === InputAccessoryViewID.PRICE) {
        setState({
          price: item.value,
          priceError: false,
          priceErrorContent: '',
          ...insertObjectIf(filterSelecting === ORDER_TYPE.NORMAL_ORDER, {
            tradingValue: '-',
          }),
        });
        priceEdited.current = true;
        isRealAccount && handlers.doQueryEquityAvailableQuantity({});
      } else if (nativeID === InputAccessoryViewID.LIMIT_PRICE) {
        setState({
          limitPrice: item.value,
          limitPriceError: false,
          limitPriceErrorContent: '',
        });
      } else if (nativeID === InputAccessoryViewID.QUANTITY) {
        if (typeof item.value === 'number') {
          setState({
            quantity: item.value,
            ...insertObjectIf(filterSelecting === ORDER_TYPE.NORMAL_ORDER && typeof price === 'number', {
              tradingValue: (price as number) * item.value,
            }),
            ...insertObjectIf(filterSelecting === ORDER_TYPE.NORMAL_ORDER && typeof price !== 'number', {
              tradingValue: '-',
            }),
          });
          handlers.doValidateQuantity(item.value);
        }
      }
    },
    onPressAccessoriesPrice: ({ item }: { item: ITempListPriceType; nativeID: InputAccessoryViewID }) => {
      const { filterSelecting, isRealAccount } = propsRef.current;
      setState({
        price: item.value,
        priceError: false,
        priceErrorContent: '',
        ...insertObjectIf(filterSelecting === ORDER_TYPE.NORMAL_ORDER, {
          tradingValue: '-',
        }),
        limitPrice: item.value,
        limitPriceError: false,
        limitPriceErrorContent: '',
      });
      priceEdited.current = true;
      isRealAccount && handlers.doQueryEquityAvailableQuantity({});
    },
  });

  const getAvlQty = useMemo((): number => {
    const {
      selectedAccount,
      sellBuyType,
      currentSymbol,
      price,
      kisEqtGenBuyAll,
      kisEquityEnquiryPortfolio,
      buyableInfo,
      sellableInfo,
    } = propsRef.current;
    if (isKisAccount(selectedAccount)) {
      if (isDerivativesAccount(selectedAccount)) {
        return typeof getMaxBuySellForDerivatives === 'string' ? 0 : getMaxBuySellForDerivatives;
      }

      if (sellBuyType === SELL_BUY_TYPE.BUY) {
        return kisEqtGenBuyAll.data?.maxQtty ?? 0;
      }

      if (currentSymbol?.symbolCode != null) {
        let accountPortfolio;
        if (kisEquityEnquiryPortfolio.status === ReducerStatus.SUCCESS) {
          accountPortfolio = kisEquityEnquiryPortfolio.data.find(
            item => item.accountNumber === selectedAccount.selectedSubAccount?.accountNumber
          )?.portfolioList;
        }

        return accountPortfolio?.find(item => item.symbol === currentSymbol?.symbolCode)?.sellable ?? 0;
      }

      return 0;
    }
    if (sellBuyType === SELL_BUY_TYPE.BUY) {
      if (typeof price === 'number') {
        return price && buyableInfo.data?.buyingPower ? buyableInfo.data.buyingPower / (config.fee * price) : 0;
      }
      return currentSymbol?.ceilingPrice && buyableInfo.data?.buyingPower
        ? buyableInfo.data.buyingPower / (config.fee * currentSymbol.ceilingPrice)
        : 0;
    }
    return sellableInfo.data?.sellableQuantity ?? 0;
  }, [
    props.selectedAccount,
    props.sellBuyType,
    props.currentSymbol,
    state.price,
    props.kisEqtGenBuyAll,
    props.kisEquityEnquiryPortfolio,
    props.buyableInfo,
    props.sellableInfo,
  ]);

  const getMaxBuySellForDerivatives = useMemo((): number | '-' => {
    const { currentSymbol, maxBuySell, sellBuyType, price } = propsRef.current;
    if (
      currentSymbol?.symbolType === SymbolType.FUTURES &&
      maxBuySell.status === ReducerStatus.SUCCESS &&
      maxBuySell.data != null &&
      price !== 0
    ) {
      return sellBuyType === SELL_BUY_TYPE.BUY ? maxBuySell.data.maxLong : maxBuySell.data.maxShort;
    }
    return '-';
  }, [props.currentSymbol, props.maxBuySell, props.sellBuyType, state.price]);

  const getMarginRatio = useMemo((): number => {
    const { selectedAccount, kisEqtStockInfo, currentSymbol, filterSelecting } = propsRef.current;
    if (selectedAccount.type === ACCOUNT_TYPE.KIS && currentSymbol && filterSelecting === ORDER_TYPE.NORMAL_ORDER) {
      return kisEqtStockInfo.data?.marginRatio ?? 0;
    }
    return 0;
  }, [props.selectedAccount, props.kisEqtStockInfo, props.currentSymbol, state.filterSelecting]);

  useEffect(() => {
    const {
      selectedAccount,
      currentSymbol,
      price,
      queryAIRatingScore,
      getInvestmentListRequest,
      kisGetEqtStockInfo,
      kisGetEqtAssetInfo,
      sellBuyType,
      queryDerivativesPurchasingPower,
      queryMaxBuySellAction,
      filterSelecting,
    } = propsRef.current;
    if (currentSymbol?.symbolCode != null) {
      // Track focus trade
      track('TradeTab', {
        selectedAccount: selectedAccount?.selectedSubAccount?.accountName,
        currentSymbol: currentSymbol.symbolCode,
      });

      // query ai rating score
      queryAIRatingScore({
        start: 0,
        limit: 1,
        sort: 'rank:asc',
        date: '',
        filter: { code: currentSymbol.symbolCode },
      });
    }
    // query account info
    switch (selectedAccount.type) {
      case ACCOUNT_TYPE.KIS:
        if (selectedAccount.selectedSubAccount == null) return;
        if (isEquityAccount(selectedAccount)) {
          getInvestmentListRequest({
            api: APIList.getKisProfitLoss,
            params: {
              subAccount: selectedAccount.selectedSubAccount.accountNumber,
              forced: true,
            },
            callBack: undefined,
            isLoading: false,
          });
          if (currentSymbol != null && selectedAccount.username != null) {
            kisGetEqtStockInfo({
              accountNumber: selectedAccount.selectedSubAccount.accountNumber,
              symbolCode: currentSymbol.symbolCode,
              market: currentSymbol.market,
              sellBuyType,
              clientID: selectedAccount.username,
              genBuyAllParams: {
                clientID: selectedAccount.username,
                symbolCode: currentSymbol.symbolCode,
                market: currentSymbol.market,
                price:
                  typeof price === 'number' && price > 0
                    ? price
                    : currentSymbol.currentPrice ?? currentSymbol.referencePrice,
              },
            });
            if (selectedAccount.selectedSubAccount.accountNumber.toUpperCase().includes('X')) {
              kisGetEqtAssetInfo({
                accountNumber: selectedAccount.selectedSubAccount.accountNumber,
                clientID: selectedAccount.username,
                sellBuyType,
                genBuyAllParams: {
                  clientID: selectedAccount.username,
                  symbolCode: currentSymbol.symbolCode,
                  market: currentSymbol.market,
                  price:
                    typeof price === 'number' && price > 0
                      ? price
                      : currentSymbol.currentPrice ?? currentSymbol.referencePrice,
                },
              });
            }
          }
        } else {
          getInvestmentListRequest({
            api: APIList.getKisClientPortfolio,
            params: {
              accountNo: selectedAccount.selectedSubAccount.accountNumber,
              forced: true,
            },
            callBack: undefined,
            isLoading: false,
          });
          const params: IDerivativesPurchasingPowerRequest = {
            accountNo: selectedAccount.selectedSubAccount.accountNumber,
          };
          queryDerivativesPurchasingPower(params);
          if (currentSymbol?.symbolType === SymbolType.FUTURES && (typeof price === 'number' ? price > 0 : true)) {
            const params: IMaxBuySellRequest = {
              accountNumber: selectedAccount.selectedSubAccount.accountNumber,
              symbolCode: currentSymbol.symbolCode,
              sellBuyType,
              price:
                typeof price === 'number'
                  ? price
                  : (sellBuyType === SELL_BUY_TYPE.BUY ? currentSymbol.ceilingPrice : currentSymbol.floorPrice) ?? 0,
            };
            queryMaxBuySellAction(params);
          }
        }

        break;
      case ACCOUNT_TYPE.VIRTUAL:
        getInvestmentListRequest({
          api: APIList.getProfitLoss,
          callBack: undefined,
          isLoading: false,
        });
        break;
      default:
        break;
    }
    // query avl qty if selecting normal order
    if (filterSelecting === ORDER_TYPE.NORMAL_ORDER) {
      handlers.doQueryEquityAvailableQuantity({
        sellBuyTypeParam: sellBuyType,
        priceParam: typeof price === 'number' ? price : undefined,
      });
    }

    propsRef.current.onChangeNativeIDForAndroid({
      tempListPrice: getTempListPrice(
        filterSelecting,
        currentSymbol?.market!,
        selectedAccount.type,
        currentSymbol?.symbolType === SymbolType.FUTURES ? SYSTEM_TYPE.DERIVATIVES : SYSTEM_TYPE.EQUITY
      ),
    });
  }, []); //call when mount

  useUpdateEffect(() => {
    if (!props.triggerReload) return;

    const {
      currentSymbol,
      price,
      sellBuyType,
      setCurrentSymbol,
      getDerivativePortfolio,
      kisGetDerEnquiryOrder,
      selectedAccount,
      initMarket,
    } = propsRef.current;
    handlers.resetWholeForm();
    refreshingSymbolData.current = true;
    if (currentSymbol?.symbolCode != null) {
      // re-subscribe
      setCurrentSymbol(currentSymbol.symbolCode);
      handlers.doQueryEquityAvailableQuantity({
        sellBuyTypeParam: sellBuyType,
        priceParam: typeof price === 'number' ? price : undefined,
      });
    } else {
      initMarket();
    }
    if (isDerivativesAccount(selectedAccount) && selectedAccount.selectedSubAccount != null) {
      getDerivativePortfolio({ accountNo: selectedAccount.selectedSubAccount.accountNumber });
      kisGetDerEnquiryOrder(null);
    }
  }, [props.triggerReload]); //call when reload

  useUpdateEffect(() => {
    const {
      queryMaxBuySellAction,
      sellBuyType,
      currentSymbol,
      selectedAccount,
      queryDerivativesPurchasingPower,
      price,
      filterSelecting,
      queryAIRatingScore,
      kisGetEqtStockInfo,
      kisGetEqtAssetInfo,
      onChangeNativeIDForAndroid,
    } = propsRef.current;
    if (currentSymbol?.symbolCode != null) {
      if (isFocused) {
        // reset quantity to zero
        setState({
          quantity: 0,
        });
        // set list ordertype and selecting order type depend on selected account
        switch (selectedAccount.type) {
          case ACCOUNT_TYPE.VIRTUAL:
            setState({
              ...insertObjectIf(!LIST_ORDER_TYPE_VIRTUAL.some(ele => ele.value === filterSelecting), {
                filterSelecting: LIST_ORDER_TYPE_VIRTUAL[1].value,
              }),
            });
            onChangeNativeIDForAndroid({
              tempListPrice: getTempListPrice(
                filterSelecting,
                currentSymbol.market,
                selectedAccount.type,
                currentSymbol.symbolType === SymbolType.FUTURES ? SYSTEM_TYPE.DERIVATIVES : SYSTEM_TYPE.EQUITY
              ),
            });
            break;
          case ACCOUNT_TYPE.KIS:
            setState({
              ...insertObjectIf(!LIST_ORDER_TYPE_KIS.some(ele => ele.value === filterSelecting), {
                filterSelecting: LIST_ORDER_TYPE_KIS[1].value,
              }),
            });
            onChangeNativeIDForAndroid({
              tempListPrice: getTempListPrice(
                filterSelecting,
                currentSymbol.market,
                selectedAccount.type,
                currentSymbol.symbolType === SymbolType.FUTURES ? SYSTEM_TYPE.DERIVATIVES : SYSTEM_TYPE.EQUITY
              ),
            });
            // query purchasing power if choosing derivatives account
            if (selectedAccount?.selectedSubAccount?.accountNumber?.toLocaleUpperCase().includes('D')) {
              const params: IDerivativesPurchasingPowerRequest = {
                accountNo: selectedAccount.selectedSubAccount.accountNumber,
              };
              queryDerivativesPurchasingPower(params);

              if (currentSymbol.symbolType === SymbolType.FUTURES && (typeof price === 'number' ? price > 0 : true)) {
                const params: IMaxBuySellRequest = {
                  accountNumber: selectedAccount.selectedSubAccount.accountNumber,
                  symbolCode: currentSymbol.symbolCode,
                  sellBuyType,
                  price:
                    typeof price === 'number'
                      ? price
                      : (sellBuyType === SELL_BUY_TYPE.BUY ? currentSymbol.ceilingPrice : currentSymbol.floorPrice) ??
                        0,
                };
                queryMaxBuySellAction(params);
              }
            } else if (selectedAccount.username != null && selectedAccount.selectedSubAccount != null) {
              kisGetEqtStockInfo({
                accountNumber: selectedAccount.selectedSubAccount.accountNumber,
                symbolCode: currentSymbol.symbolCode,
                market: currentSymbol.market,
                sellBuyType,
                clientID: selectedAccount.username,
                genBuyAllParams: {
                  clientID: selectedAccount.username,
                  symbolCode: currentSymbol.symbolCode,
                  market: currentSymbol.market,
                  price:
                    (price as number) > 0
                      ? (price as number)
                      : currentSymbol.currentPrice ?? currentSymbol.referencePrice,
                },
              });
              if (selectedAccount.selectedSubAccount.accountNumber.toUpperCase().includes('X')) {
                kisGetEqtAssetInfo({
                  accountNumber: selectedAccount.selectedSubAccount.accountNumber,
                  clientID: selectedAccount.username,
                  sellBuyType,
                  genBuyAllParams: {
                    clientID: selectedAccount.username,
                    symbolCode: currentSymbol.symbolCode,
                    market: currentSymbol.market,
                    price:
                      (price as number) > 0
                        ? (price as number)
                        : currentSymbol.currentPrice ?? currentSymbol.referencePrice,
                  },
                });
              }
            }
            break;
          default:
            setState({
              ...insertObjectIf(!LIST_ORDER_TYPE_VIRTUAL.some(ele => ele.value === filterSelecting), {
                filterSelecting: LIST_ORDER_TYPE_VIRTUAL[1].value,
              }),
            });
            onChangeNativeIDForAndroid({
              tempListPrice: getTempListPrice(
                filterSelecting,
                currentSymbol.market,
                selectedAccount.type,
                currentSymbol.symbolType === SymbolType.FUTURES ? SYSTEM_TYPE.DERIVATIVES : SYSTEM_TYPE.EQUITY
              ),
            });
            break;
        }
        // Track focus trade
        track('TradeTab', {
          selectedAccount: selectedAccount?.selectedSubAccount?.accountName,
          currentSymbol: currentSymbol.symbolCode,
        });

        // query ai rating score
        queryAIRatingScore({
          start: 0,
          limit: 1,
          sort: 'rank:asc',
          date: '',
          filter: { code: currentSymbol.symbolCode },
        });
        // query avl qty if selecting normal order
        if (filterSelecting === ORDER_TYPE.NORMAL_ORDER) {
          handlers.doQueryEquityAvailableQuantity({
            sellBuyTypeParam: sellBuyType,
            priceParam: typeof price === 'number' ? price : undefined,
          });
        }
      } else {
        prevSelectedSymbol.current = null;
        handlers.resetWholeForm();
      }
    }
  }, [isFocused]); // call when focused change

  useUpdateEffect(() => {
    if (isFocused) {
      const {
        queryMaxBuySellAction,
        filterSelecting,
        accessToken,
        currentSymbol,
        selectedAccount,
        sellBuyType,
        price,
        isRealAccount,
      } = propsRef.current;
      // query avl qty if selecting normal order (just re-query when choosing kis when price change because in virtual trading, price always pass to param is 1)
      if (filterSelecting === ORDER_TYPE.NORMAL_ORDER) {
        if (accessToken && currentSymbol != null && isRealAccount && isEquityAccount(selectedAccount)) {
          handlers.queryKisEquityAvailableQuantity({
            sellBuyTypeParam: sellBuyType,
            priceParam: typeof price === 'number' ? price : currentSymbol.referencePrice,
          });
        }
      }
      if (
        currentSymbol?.symbolType === SymbolType.FUTURES &&
        selectedAccount.type === ACCOUNT_TYPE.KIS &&
        selectedAccount?.selectedSubAccount?.accountSubs?.[0]?.type === SYSTEM_TYPE.DERIVATIVES &&
        typeof price === 'number' &&
        price > 0
      ) {
        const params: IMaxBuySellRequest = {
          accountNumber: selectedAccount.selectedSubAccount.accountNumber,
          symbolCode: currentSymbol.symbolCode,
          sellBuyType,
          price,
        };
        queryMaxBuySellAction(params);
      }
    }
  }, [state.price]); // call when price input in normal order form change

  useUpdateEffect(() => {
    if (!isFocused) return;
    const { currentSymbol, filterSelecting, stopPrice, quantity, tradingValue, price } = propsRef.current;

    if (currentSymbol == null) {
      if (filterSelecting === ORDER_TYPE.NORMAL_ORDER) {
        setState({
          price: 0,
          tradingValue: 0,
        });
      } else if (filterSelecting === ORDER_TYPE.STOP_ORDER) {
        if (stopPrice !== 0) {
          setState({
            stopPrice: 0,
          });
        }
      }
    } else if (
      currentSymbol?.currentPrice != null &&
      (prevSelectedSymbol.current == null ||
        prevSelectedSymbol.current !== currentSymbol.symbolCode ||
        (prevSelectedSymbol.current === currentSymbol.symbolCode && refreshingSymbolData.current))
    ) {
      if (priceEdited.current === false) {
        if (stopPrice !== 0) {
          setState({
            stopPrice: 0,
          });
        }
        if (currentSymbol.currentPrice * quantity !== tradingValue) {
          setState({
            tradingValue: currentSymbol.currentPrice * quantity,
          });
        }
        if ((currentSymbol.currentPrice ?? currentSymbol.referencePrice) !== price) {
          setState({
            price: currentSymbol.currentPrice || currentSymbol.referencePrice,
          });
        }
        if (refreshingSymbolData.current) {
          refreshingSymbolData.current = false;
        }
      }
      prevSelectedSymbol.current = currentSymbol.symbolCode;
    }
  }, [props.currentSymbol?.currentPrice]); // trigger when receive currentPrice for the first time after select a new symbol (maybe receive from get symbol latest api or quote from realtime data. choose which come first)

  useUpdateEffect(() => {
    const { currentSymbol, selectedAccount, sellBuyType, price, queryMaxBuySellAction } = propsRef.current;
    if (isFocused) {
      if (
        currentSymbol?.symbolType === SymbolType.FUTURES &&
        selectedAccount.type === ACCOUNT_TYPE.KIS &&
        selectedAccount.selectedSubAccount != null &&
        selectedAccount.selectedSubAccount.accountSubs[0] != null &&
        selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES &&
        typeof price !== 'number' &&
        sellBuyType === SELL_BUY_TYPE.BUY
      ) {
        const params: IMaxBuySellRequest = {
          accountNumber: selectedAccount.selectedSubAccount.accountNumber,
          symbolCode: currentSymbol.symbolCode,
          sellBuyType,
          price: currentSymbol.ceilingPrice ?? 0,
        };
        queryMaxBuySellAction(params);
      }
    }
  }, [props.currentSymbol?.ceilingPrice]); // call when ce change

  useUpdateEffect(() => {
    const { currentSymbol, selectedAccount, sellBuyType, price, queryMaxBuySellAction } = propsRef.current;
    if (
      isFocused &&
      currentSymbol?.symbolType === SymbolType.FUTURES &&
      selectedAccount.type === ACCOUNT_TYPE.KIS &&
      selectedAccount?.selectedSubAccount?.accountSubs?.[0]?.type === SYSTEM_TYPE.DERIVATIVES &&
      typeof price !== 'number' &&
      sellBuyType === SELL_BUY_TYPE.SELL
    ) {
      const params: IMaxBuySellRequest = {
        accountNumber: selectedAccount.selectedSubAccount.accountNumber,
        symbolCode: currentSymbol.symbolCode,
        sellBuyType,
        price: currentSymbol.floorPrice ?? 0,
      };
      queryMaxBuySellAction(params);
    }
  }, [props.currentSymbol?.floorPrice]); // call when fl change

  useUpdateEffect(() => {
    const { filterSelecting, sellBuyType, price } = propsRef.current;

    // query avl qty if selecting normal order
    if (isFocused && filterSelecting === ORDER_TYPE.NORMAL_ORDER) {
      handlers.doQueryEquityAvailableQuantity({
        sellBuyTypeParam: sellBuyType,
        priceParam: typeof price === 'number' ? price : undefined,
      });
    }
  }, [state.filterSelecting]); // call when form change (normal order, stop order, stop limit order)

  useUpdateEffect(() => {
    const {
      kisGetEqtGenBuyAll,
      filterSelecting,
      accessToken,
      currentSymbol,
      selectedAccount,
      sellBuyType,
      kisEqtAssetInfo,
      price,
    } = propsRef.current;
    if (
      isFocused &&
      filterSelecting === ORDER_TYPE.NORMAL_ORDER &&
      accessToken &&
      currentSymbol != null &&
      selectedAccount?.selectedSubAccount?.accountNumber.toUpperCase().includes('X') &&
      selectedAccount.username != null &&
      currentSymbol.symbolCode != null &&
      currentSymbol.market != null &&
      sellBuyType === SELL_BUY_TYPE.BUY &&
      kisEqtAssetInfo.data?.buyingPower.purchasingPower != null
    ) {
      const params = {
        clientID: selectedAccount.username,
        accountNo: selectedAccount.selectedSubAccount.accountNumber,
        symbolCode: currentSymbol.symbolCode,
        market: currentSymbol.market,
        price: typeof price === 'number' ? price : currentSymbol.referencePrice,
        sellBuyType: sellBuyType,
      };
      kisGetEqtGenBuyAll({
        ...params,
        PP: kisEqtAssetInfo.data.buyingPower.purchasingPower,
      });
    }
  }, [props.kisEqtAssetInfo.data?.buyingPower.purchasingPower]); // call when receive kisEqtAssetInfo.data from api

  useUpdateEffect(() => {
    const {
      filterSelecting,
      accessToken,
      currentSymbol,
      selectedAccount,
      sellBuyType,
      kisEqtStockInfo,
      price,
      kisGetEqtGenBuyAll,
    } = propsRef.current;
    if (
      isFocused &&
      filterSelecting === ORDER_TYPE.NORMAL_ORDER &&
      accessToken &&
      currentSymbol != null &&
      selectedAccount.type === ACCOUNT_TYPE.KIS &&
      selectedAccount.selectedSubAccount != null &&
      isEquityAccount(selectedAccount) &&
      !selectedAccount.selectedSubAccount.accountNumber.toUpperCase().includes('X') &&
      selectedAccount.username != null &&
      currentSymbol.symbolCode != null &&
      currentSymbol.market != null &&
      sellBuyType === SELL_BUY_TYPE.BUY &&
      kisEqtStockInfo.data?.PP != null
    ) {
      const params = {
        clientID: selectedAccount.username,
        accountNo: selectedAccount.selectedSubAccount.accountNumber,
        symbolCode: currentSymbol.symbolCode,
        market: currentSymbol.market,
        price: typeof price === 'number' ? price : currentSymbol.referencePrice,
        sellBuyType: sellBuyType,
      };
      kisGetEqtGenBuyAll({
        ...params,
        PP: kisEqtStockInfo.data.PP,
      });
    }
  }, [props.kisEqtStockInfo.data?.PP]); // call when receive kisEqtStockInfo.data from api

  useUpdateEffect(() => {
    const {
      selectedAccount,
      queryMaxBuySellAction,
      queryAIRatingScore,
      kisGetEqtStockInfo,
      currentSymbol,
      filterSelecting,
      sellBuyType,
      price,
      kisGetEqtAssetInfo,
    } = propsRef.current;
    if (currentSymbol?.symbolCode != null && isFocused) {
      // reset quantity to zero
      setState({
        quantity: 0,
      });
      // query ai rating score
      queryAIRatingScore({
        start: 0,
        limit: 1,
        sort: 'rank:asc',
        date: '',
        filter: { code: currentSymbol.symbolCode },
      });

      if (
        currentSymbol.symbolType === SymbolType.FUTURES &&
        selectedAccount.type === ACCOUNT_TYPE.KIS &&
        selectedAccount?.selectedSubAccount?.accountSubs?.[0]?.type === SYSTEM_TYPE.DERIVATIVES &&
        (typeof price === 'number' ? price > 0 : true)
      ) {
        const params: IMaxBuySellRequest = {
          accountNumber: selectedAccount.selectedSubAccount.accountNumber,
          symbolCode: currentSymbol.symbolCode,
          sellBuyType,
          price:
            typeof price === 'number'
              ? price
              : (sellBuyType === SELL_BUY_TYPE.BUY ? currentSymbol.ceilingPrice : currentSymbol.floorPrice) ?? 0,
        };
        queryMaxBuySellAction(params);
      }
      if (
        selectedAccount.type === ACCOUNT_TYPE.KIS &&
        selectedAccount.selectedSubAccount?.accountSubs?.[0]?.type !== SYSTEM_TYPE.DERIVATIVES &&
        selectedAccount.username != null
      ) {
        kisGetEqtStockInfo({
          accountNumber: selectedAccount?.selectedSubAccount?.accountNumber!,
          symbolCode: currentSymbol.symbolCode,
          market: currentSymbol.market,
          sellBuyType,
          clientID: selectedAccount.username,
          genBuyAllParams: {
            clientID: selectedAccount.username,
            symbolCode: currentSymbol.symbolCode,
            market: currentSymbol.market,
            price:
              typeof price === 'number' && price > 0
                ? price
                : currentSymbol.currentPrice ?? currentSymbol.referencePrice,
          },
        });

        if (selectedAccount?.selectedSubAccount?.accountNumber.toUpperCase().includes('X')) {
          kisGetEqtAssetInfo({
            accountNumber: selectedAccount?.selectedSubAccount?.accountNumber,
            clientID: selectedAccount.username,
            sellBuyType,
            genBuyAllParams: {
              clientID: selectedAccount.username,
              symbolCode: currentSymbol.symbolCode,
              market: currentSymbol.market,
              price:
                typeof price === 'number' && price > 0
                  ? price
                  : currentSymbol.currentPrice ?? currentSymbol.referencePrice,
            },
          });
        }
      }
      // query avl qty if selecting normal order
      if (filterSelecting === ORDER_TYPE.NORMAL_ORDER) {
        handlers.doQueryEquityAvailableQuantity({
          sellBuyTypeParam: sellBuyType,
          priceParam: typeof price === 'number' ? price : undefined,
        });
      }

      propsRef.current.onChangeNativeIDForAndroid({
        tempListPrice: getTempListPrice(
          filterSelecting,
          currentSymbol.market,
          selectedAccount.type,
          currentSymbol.symbolType === SymbolType.FUTURES ? SYSTEM_TYPE.DERIVATIVES : SYSTEM_TYPE.EQUITY
        ),
      });
    }
  }, [props.currentSymbol?.symbolCode]); // call when change symbolCode

  useUpdateEffect(() => {
    if (isFocused) {
      const {
        selectedAccount,
        currentSymbol,
        filterSelecting,
        sellBuyType,
        price,
        getInvestmentListRequest,
        kisGetEqtStockInfo,
        kisGetEqtAssetInfo,
        queryDerivativesPurchasingPower,
        queryMaxBuySellAction,
        onChangeNativeIDForAndroid,
      } = propsRef.current;
      switch (selectedAccount.type) {
        case ACCOUNT_TYPE.KIS:
          if (selectedAccount.selectedSubAccount == null) return;
          setState({
            ...insertObjectIf(!LIST_ORDER_TYPE_KIS.some(ele => ele.value === filterSelecting), {
              filterSelecting: LIST_ORDER_TYPE_KIS[1].value,
            }),
          });
          currentSymbol != null &&
            onChangeNativeIDForAndroid({
              tempListPrice: getTempListPrice(
                filterSelecting,
                currentSymbol?.market,
                selectedAccount.type,
                currentSymbol?.symbolType === SymbolType.FUTURES ? SYSTEM_TYPE.DERIVATIVES : SYSTEM_TYPE.EQUITY
              ),
            });
          if (isEquityAccount(selectedAccount)) {
            getInvestmentListRequest({
              api: APIList.getKisProfitLoss,
              params: {
                subAccount: selectedAccount.selectedSubAccount.accountNumber,
                forced: true,
              },
              callBack: undefined,
              isLoading: false,
            });
            if (currentSymbol != null && selectedAccount.username != null) {
              kisGetEqtStockInfo({
                accountNumber: selectedAccount.selectedSubAccount.accountNumber,
                symbolCode: currentSymbol.symbolCode,
                market: currentSymbol.market,
                sellBuyType,
                clientID: selectedAccount.username,
                genBuyAllParams: {
                  clientID: selectedAccount.username,
                  symbolCode: currentSymbol.symbolCode,
                  market: currentSymbol.market,
                  price:
                    typeof price === 'number' && price > 0
                      ? price
                      : currentSymbol.currentPrice ?? currentSymbol.referencePrice,
                },
              });
              if (selectedAccount.selectedSubAccount.accountNumber.toUpperCase().includes('X')) {
                kisGetEqtAssetInfo({
                  accountNumber: selectedAccount.selectedSubAccount.accountNumber,
                  clientID: selectedAccount.username,
                  sellBuyType,
                  genBuyAllParams: {
                    clientID: selectedAccount.username,
                    symbolCode: currentSymbol.symbolCode,
                    market: currentSymbol.market,
                    price:
                      typeof price === 'number' && price > 0
                        ? price
                        : currentSymbol.currentPrice ?? currentSymbol.referencePrice,
                  },
                });
              }
            }
            if (filterSelecting === ORDER_TYPE.NORMAL_ORDER && currentSymbol?.symbolCode != null) {
              handlers.queryKisEquityAvailableQuantity({
                sellBuyTypeParam: sellBuyType,
                priceParam: typeof price === 'number' ? price : undefined,
              });
            }
          } else {
            getInvestmentListRequest({
              api: APIList.getKisClientPortfolio,
              params: {
                accountNo: selectedAccount.selectedSubAccount.accountNumber,
                forced: true,
              },
              callBack: undefined,
              isLoading: false,
            });
            const params: IDerivativesPurchasingPowerRequest = {
              accountNo: selectedAccount.selectedSubAccount.accountNumber,
            };
            queryDerivativesPurchasingPower(params);
            if (currentSymbol?.symbolType === SymbolType.FUTURES && (typeof price === 'number' ? price > 0 : true)) {
              const params: IMaxBuySellRequest = {
                accountNumber: selectedAccount.selectedSubAccount.accountNumber,
                symbolCode: currentSymbol.symbolCode,
                sellBuyType,
                price:
                  typeof price === 'number'
                    ? price
                    : (sellBuyType === SELL_BUY_TYPE.BUY ? currentSymbol.ceilingPrice : currentSymbol.floorPrice) ?? 0,
              };
              queryMaxBuySellAction(params);
            }
          }

          break;
        case ACCOUNT_TYPE.VIRTUAL:
          setState({
            ...insertObjectIf(!LIST_ORDER_TYPE_VIRTUAL.some(ele => ele.value === filterSelecting), {
              filterSelecting: LIST_ORDER_TYPE_VIRTUAL[1].value,
            }),
          });
          onChangeNativeIDForAndroid({
            tempListPrice: getTempListPrice(
              filterSelecting,
              currentSymbol?.market!,
              selectedAccount.type,
              currentSymbol?.symbolType === SymbolType.FUTURES ? SYSTEM_TYPE.DERIVATIVES : SYSTEM_TYPE.EQUITY
            ),
          });
          getInvestmentListRequest({
            api: APIList.getProfitLoss,
            callBack: undefined,
            isLoading: false,
          });
          if (filterSelecting === ORDER_TYPE.NORMAL_ORDER && currentSymbol?.symbolCode != null) {
            handlers.queryEquityAvailableQuantity(sellBuyType);
          }
          break;
        default:
          onChangeNativeIDForAndroid({
            tempListPrice: getTempListPrice(
              filterSelecting,
              currentSymbol?.market!,
              selectedAccount.type,
              currentSymbol?.symbolType === SymbolType.FUTURES ? SYSTEM_TYPE.DERIVATIVES : SYSTEM_TYPE.EQUITY
            ),
          });
          break;
      }
      handlers.resetWholeForm();
    }
  }, [props.selectedAccount.selectedSubAccount]); // call when selected account type change or selected sub account change

  useUpdateEffect(() => {
    if (isFocused) {
      const { filterSelecting, fillPriceTriggered, quantity } = propsRef.current;
      switch (filterSelecting) {
        case ORDER_TYPE.NORMAL_ORDER:
          setState({
            price: fillPriceTriggered.value,
          });
          priceEdited.current = true;
          if (typeof fillPriceTriggered.value === 'number') {
            handlers.doValidatePrice(fillPriceTriggered.value);
          } else {
            setState({
              priceError: false,
              priceErrorContent: '',
            });
          }
          if (typeof fillPriceTriggered.value === 'number') {
            setState({
              tradingValue: fillPriceTriggered.value * quantity,
            });
          }
          break;
        case ORDER_TYPE.STOP_ORDER:
          if (typeof fillPriceTriggered.value === 'number') {
            setState({
              stopPrice: fillPriceTriggered.value,
            });
            handlers.doValidateStopPrice({ value: fillPriceTriggered.value });
          }
          break;
        case ORDER_TYPE.STOP_LIMIT_ORDER:
          // priceEdited.current = true; TODO xem có fill currentPrice vào đây ko
          if (typeof fillPriceTriggered.value === 'number') {
            setState({
              stopLimitPrice: fillPriceTriggered.value,
              limitPrice: fillPriceTriggered.value,
            });
            handlers.doValidateStopLimitPrice({ value: fillPriceTriggered.value });
            handlers.doValidateLimitPrice({ value: fillPriceTriggered.value });
          }

          break;
        default:
          break;
      }
    }
  }, [props.fillPriceTriggered]); // trigger when press a price in SymbolHeader or bid offer list

  useUpdateEffect(() => {
    if (!isFocused) return;

    const { price, kisGetEqtAssetInfo, kisGetEqtStockInfo, currentSymbol, selectedAccount, sellBuyType } =
      propsRef.current;
    if (
      selectedAccount.type === ACCOUNT_TYPE.KIS &&
      selectedAccount?.selectedSubAccount?.accountSubs?.[0]?.type !== SYSTEM_TYPE.DERIVATIVES &&
      selectedAccount.username != null &&
      currentSymbol != null
    ) {
      kisGetEqtStockInfo({
        accountNumber: selectedAccount?.selectedSubAccount?.accountNumber!,
        symbolCode: currentSymbol.symbolCode,
        market: currentSymbol.market,
        sellBuyType,
        clientID: selectedAccount.username,
        genBuyAllParams: {
          clientID: selectedAccount.username,
          symbolCode: currentSymbol.symbolCode,
          market: currentSymbol.market,
          price:
            typeof price === 'number' && price > 0 ? price : currentSymbol.currentPrice ?? currentSymbol.referencePrice,
        },
      });

      if (selectedAccount?.selectedSubAccount?.accountNumber.toUpperCase().includes('X')) {
        kisGetEqtAssetInfo({
          accountNumber: selectedAccount.selectedSubAccount.accountNumber,
          clientID: selectedAccount.username,
          sellBuyType,
          genBuyAllParams: {
            clientID: selectedAccount.username,
            symbolCode: currentSymbol.symbolCode,
            market: currentSymbol.market,
            price:
              typeof price === 'number' && price > 0
                ? price
                : currentSymbol.currentPrice ?? currentSymbol.referencePrice,
          },
        });
      }
    }
  }, [props.orderKISSuccess]); // trigger when order in KIS success

  useUpdateEffect(() => {
    if (!isFocused) return;
    if (props.selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
      handlers.queryEquityAvailableQuantity(props.sellBuyType);
    }
  }, [props.orderSuccess]); // trigger when order success

  useUpdateEffect(() => {
    const { selectedAccount, currentSymbol, queryMaxBuySellSuccessTrigger, quantity } = propsRef.current;
    if (
      queryMaxBuySellSuccessTrigger != null &&
      quantity !== 0 &&
      selectedAccount.type === ACCOUNT_TYPE.KIS &&
      selectedAccount.selectedSubAccount?.accountSubs?.[0].type === SYSTEM_TYPE.DERIVATIVES &&
      currentSymbol?.symbolType === SymbolType.FUTURES
    ) {
      handlers.doValidateQuantity();
    }
  }, [props.queryMaxBuySellSuccessTrigger]); // validate quantity when get max buy sell success

  // reference
  useImperativeHandle(ref, () => ({
    setPrice: handlers.onPressAccessories,
  }));

  return {
    state,
    handlers,
    getAvlQty,
    getBuyingPower,
    getMaxBuySellForDerivatives,
    getMarginRatio,
    refs: {
      quantityInput,
      limitPriceInput,
      expiryDate,
      expiryDateEnable,
    },
    modals: {
      ModalExecute,
    },
  };
};

export { useTradeFormLogic };
