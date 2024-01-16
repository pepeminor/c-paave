/* eslint-disable no-console*/
import React, { Dispatch } from 'react';
import ShortUniqueId from 'short-unique-id';
import { Linking, NativeScrollEvent, View, Platform, MeasureOnSuccessCallback } from 'react-native';
import Crashes, { ExceptionModel } from 'appcenter-crashes';
import { showMessage, MessageType } from 'react-native-flash-message';
import { SUCCESS, FAILURE } from 'reduxs/action-type-utils';
import {
  IActionCallBack,
  INavigationAction,
  INotifyMessage,
  IObject,
  IAction,
  ToolkitAction,
  IAccount,
} from 'interfaces/common';
import globalStyles, { Colors, SCREEN_RATIO } from 'styles';
import { ReactElement } from 'react';
import i18n, { t } from 'i18next';
import config from 'config';
import { height, width } from 'styles';
import { ApiResponseStatus, LoggerContentType, SymbolSession, SymbolType } from 'constants/enum';
import fetchToCurl, { FetchOptions } from 'fetch-to-curl';
import { createAction } from '@reduxjs/toolkit';
import { navigationRef } from './rootNavigation';
import { isArray } from 'ramda-adjunct';
import { StackActions } from '@react-navigation/native';
import { setCurrentSymbol } from 'reduxs/SymbolData';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import { debounce } from 'lodash';
import Animated from 'react-native-reanimated';
import { store } from 'screens/App';

export const createRequestId = () => {
  return new ShortUniqueId({
    length: 6,
    dictionary: [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'J',
      'K',
      'L',
      'M',
      'N',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ],
  })();
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const insertObjectIf = <T1 extends {}>(condition: any, elements1: T1): Partial<T1> => {
  return condition ? elements1 : ({} as T1);
};

export const insertObjectIfElse = <T1, T2>(condition: boolean, elements1: T1, elements2: T2): Partial<T1 | T2> => {
  return condition ? elements1 : elements2;
};

export function isBlank(str?: string) {
  return str == null || /^\s*$/.test(str);
}

export function maskingNumber(data: string) {
  if (typeof data == 'undefined' || !data) return '';

  return data.replace(/\d{5}$/, '*****');
}

export function isUpper(str: string) {
  return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}

export function getMap<T>(list: T[], key: string) {
  if (!list) {
    return {};
  }

  return list.reduce<{ [s: string]: T }>((map: { [s: string]: T }, item: T) => {
    map[(item as { [s: string]: any })[key]] = item;
    return map;
  }, {});
}

export function getColor(
  value: number | undefined,
  comparePrice: number | undefined,
  ceiling?: number | undefined,
  floor?: number | undefined,
  noReferenceColor?: boolean
) {
  let textStyle = globalStyles.noData;
  let textStyle2 = globalStyles.noData;

  if (value != null && comparePrice != null) {
    switch (value) {
      case ceiling:
        textStyle = globalStyles.colorCeiling;
        break;
      case floor:
        textStyle = globalStyles.colorFloor;
        break;
      case comparePrice:
        textStyle = noReferenceColor === true ? globalStyles.noData : globalStyles.colorReference;
        break;
      default: {
        if (value > comparePrice) {
          textStyle = globalStyles.colorUp;
          textStyle2 = {
            color: Colors.LIGHTGreen,
          };
        } else {
          textStyle = globalStyles.colorDown;
          textStyle2 = {
            color: Colors.LIGHTRed2,
          };
        }
        break;
      }
    }
  }
  return { textStyle, textStyle2 };
}

export function getColorBidAsk(value: string | undefined, bid: string | undefined, ask: string | undefined) {
  let textStyle = globalStyles.noData;
  if (value != null) {
    switch (value) {
      case bid:
        textStyle = globalStyles.colorUp;
        break;
      case ask:
        textStyle = globalStyles.colorDown;
        break;

      default: {
        textStyle = globalStyles.noData;
        break;
      }
    }
  }
  return { textStyle };
}

export function getIconColor(
  value: number | undefined,
  comparePrice: number | undefined,
  ceiling: number | undefined,
  floor: number | undefined,
  iconUp: ReactElement,
  iconDown: ReactElement,
  iconReference?: ReactElement,
  iconCeiling?: ReactElement,
  iconFloor?: ReactElement
): ReactElement {
  if (value != null && comparePrice != null) {
    switch (value) {
      case ceiling:
        return iconCeiling != null ? iconCeiling : iconUp;
      case floor:
        return iconFloor != null ? iconFloor : iconDown;
      case comparePrice:
        return iconReference != null ? iconReference : <View />;
      default: {
        if (value > comparePrice) {
          return iconUp;
        } else {
          return iconDown;
        }
      }
    }
  }
  return <View />;
}

export function getFlex(total: number, value?: number) {
  if (total === 0 || value == null) {
    return 0;
  }
  return 100 - Number((value / total).toFixed(2)) * 100;
}

export function formatNumber(value?: number, digit = 0, offsetRate?: number, toFixed = false) {
  if (value == null || isNaN(value)) {
    return '0';
  }

  if (offsetRate != null) {
    value = value / offsetRate;
  }

  const result = Intl.NumberFormat('en-US', {
    minimumFractionDigits: toFixed ? digit : 0,
    maximumFractionDigits: digit,
  }).format(value);

  // Eliminate result like -0.00
  if (Number(result) === 0 && result.startsWith('-')) return '0';

  return result;
}

export function formatTickNumber(
  value: number,
  fixedNumber = 0,
  delimiter = '',
  unit = undefined as string | undefined
) {
  if (isNaN(Number(value))) return '0';
  if (Math.abs(value) < 10) return value.toFixed(1) + (unit ?? '');
  if (Math.abs(value) < 1000) return value.toFixed(fixedNumber) + (unit ?? '');
  if (Math.abs(value) < 1000000) return (value / 1000).toFixed(fixedNumber) + delimiter + (unit ?? 'K');
  if (Math.abs(value) < 1000000000) return (value / 1000000).toFixed(fixedNumber) + delimiter + (unit ?? t('Mil'));
  return formatNumber(value / 1000000000, fixedNumber, undefined, true) + delimiter + (unit ?? t('Bil'));
}
export function formatCurrency(value?: number, notPrefix?: boolean) {
  if (value == null || isNaN(value) || value === 0) {
    return '0';
  }
  const billion = 1000000000;
  const million = 1000000;

  if (value / billion > 1) {
    return `${formatNumber(value, 2, billion, true)} ${notPrefix ? '' : i18n.t('Bil')}`;
  }

  if (value / million > 1) {
    return `${formatNumber(value, 2, million, true)} ${notPrefix ? '' : i18n.t('Mil')}`;
  }

  return `${formatNumber(value)}`;
}

export function getMapSymbol<T extends { readonly s: string }>(list: T[]) {
  if (!list) {
    return {};
  }

  return list.reduce<{ readonly [s: string]: T }>((map: { readonly [s: string]: T }, item: T) => {
    const result = { ...map, [item.s]: item };
    return result;
  }, {});
}

// Generate with your own error data
export function logger(type: string, message: string, stackTrace: string) {
  const properties = { username: 'C123456' };

  const exceptionModel = ExceptionModel.createFromTypeAndMessage(type, message, stackTrace);

  Crashes.trackError(exceptionModel, properties);
}

// Create an exception model from error.
export function trackExceptrionError(error: Error) {
  const properties = { username: 'C123456' };

  const exceptionModel = ExceptionModel.createFromError(error);

  Crashes.trackError(exceptionModel, properties);
}

export function alertMessage(type: MessageType, message: string, description?: string, requestId?: string) {
  showMessage({
    type,
    message: `${i18n.t(message)}${requestId != null ? ' (' + requestId + ')' : ''}`,
    description: description != null ? i18n.t(description) : undefined,
    icon: {
      icon: type,
      position: 'left',
      props: {},
    },
  });
}

export function alertSagaSuccessMessage(action: IAction<unknown>) {
  if (action.showMessage != undefined && action.showMessage.message != undefined) {
    alertMessage('success', action.showMessage?.message ?? '', action.showMessage?.description);
  }
}

export function capitalizeText(text: string) {
  return text
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
}

export type SagaAction<T> = (
  payload: T,
  showMessage?: INotifyMessage,
  navigation?: INavigationAction,
  showLoading?: boolean,
  differentParams?: IObject,
  callBack?: IActionCallBack
) => IAction<T>;

export function generateAction<T>(type: string): SagaAction<T> {
  return (
    payload?: T,
    showMessage?: INotifyMessage,
    navigation?: INavigationAction,
    showLoading?: boolean,
    differentParams?: IObject,
    callBack?: IActionCallBack
  ) => {
    return {
      type: type,
      response: {
        success: SUCCESS(type),
        fail: FAILURE(type),
      },
      payload,
      showLoading,
      showMessage,
      navigation,
      differentParams,
      callBack,
    } as IAction<T>;
  };
}

export function generateActionObject<T>(type: string) {
  return (
    properties: {
      payload?: T;
      showMessage?: INotifyMessage;
      navigation?: INavigationAction;
      showLoading?: boolean;
      differentParams?: IObject;
      callBack?: IActionCallBack;
    } = {}
  ) => {
    const { payload, showMessage, navigation, showLoading, differentParams, callBack } = properties;
    return {
      type: type,
      response: {
        success: SUCCESS(type),
        fail: FAILURE(type),
      },
      payload,
      showLoading,
      showMessage,
      navigation,
      differentParams,
      callBack,
    } as IAction<T>;
  };
}

export function generateToolkitAction<T, K = Record<string, unknown>>(type: string, defaultMeta: K = {} as K) {
  const action = createAction(
    type,
    (
      properties: {
        payload?: T;
        showMessage?: INotifyMessage;
        navigation?: INavigationAction;
        showLoading?: boolean;
        differentParams?: IObject;
        callBack?: IActionCallBack;
        error?: boolean;
      } & Partial<K> = {}
    ) => {
      const { payload, error = false, ...customMeta } = properties;
      return {
        type: type,
        payload,
        meta: {
          response: {
            success: SUCCESS(type),
            fail: FAILURE(type),
          },
          ...defaultMeta,
          ...customMeta,
        },
        error,
      } as ToolkitAction<T, K>;
    }
  );
  Object.defineProperty(action, 'pending', {
    value: type,
    writable: false,
  });
  Object.defineProperty(action, 'fulfilled', {
    value: SUCCESS(type),
    writable: false,
  });
  Object.defineProperty(action, 'rejected', {
    value: FAILURE(type),
    writable: false,
  });
  return action as typeof action & {
    pending: string;
    fulfilled: string;
    rejected: string;
  };
}

export function generateRandomArray(count: number) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 40));
}

// 0.xx and 0.5 to 0
export function handleNumberAI(number: number) {
  return Number(formatNumber(number % 1, 2)) === 0.55
    ? Math.round((number - 0.01) * 10) / 10
    : formatNumber(number, 1, undefined, true);
}

export function equalsIgnoreOrder(a: any[], b: any[]) {
  if (a.length !== b.length) return false;
  const uniqueValues = new Set([...a, ...b]);
  for (const v of uniqueValues) {
    const aCount = a.filter(e => e === v).length;
    const bCount = b.filter(e => e === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
}

export function handleAvailableQtt(number: number) {
  return Math.floor(number / 100) * 100;
}

export function generateAvatarBG() {
  return config.avatarColors[Math.floor(Math.random() * config.avatarColors.length)];
}

export function generateNameAbbreviations(fullName: string | undefined) {
  if (typeof fullName === 'string' && fullName != null && fullName.length) {
    if (fullName.trim().length === 1) {
      return fullName.trim();
    } else {
      return fullName.trim().split(' ').length === 1
        ? fullName.trim().charAt(0).toUpperCase()
        : fullName
            .trim()
            .split(' ')
            .reduce((prev, curr) => {
              return (prev.charAt(0) + curr.charAt(0)).toUpperCase();
            });
    }
  }
  return '';
}

export const over = width / height >= config.ratioScreen;

export const isCloseToBottom = (
  { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent,
  paddingToBottom = 10
) => {
  // console.log(layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom);
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

export const getSessionPrice = (ss: string | undefined, ep: number | undefined, c: number | undefined, re?: number) => {
  switch (ss) {
    case SymbolSession.ATO:
    case SymbolSession.ATC:
      return (ep || c) ?? 0;

    default:
      return (c || re) ?? 0;
  }
};

export const getSessionBasedValue = (isOpenClosedTradingSession = false, expectedValue?: number, currentValue = 0) => {
  if (isOpenClosedTradingSession) {
    return expectedValue ?? currentValue;
  }
  return currentValue;
};

export const goToEmailSupport = () => {
  const url = `mailto:support@paave.io`;
  Linking.openURL(url).catch(err => console.error('Open URL failed', err));
};

export const LoggerContent = (content: any, type: LoggerContentType) => {
  let background: string;
  switch (type) {
    case 'SUCCESS':
      background = '#15A25E';
      break;
    case 'ERROR':
      background = '#B80300';
      break;
    case 'WARNING':
      background = '#C8A104';
      break;

    default:
      background = '#1B4079';
      break;
  }

  if ((typeof content).match(/^(bigint|boolean|number|string)$/)) {
    console.log(`%c${content}`, `background: ${background}; color: #fff`);
    return;
  }

  console.groupCollapsed(`%cLogger object`, `background: ${background}; color: #fff`);
  console.log(content);
  console.log('-----------------------END-----------------------');
  console.groupEnd();
};

export const Logger = {
  info: (content: any) => {
    LoggerContent(content, 'INFO');
  },
  success: (content: any) => {
    LoggerContent(content, 'SUCCESS');
  },
  error: (content: any) => {
    LoggerContent(content, 'ERROR');
  },
  warning: (content: any) => {
    LoggerContent(content, 'WARNING');
  },
};

export const logApiResponse = (
  success: ApiResponseStatus,
  uri: string,
  finalUrl: string,
  localRequestOptions: RequestInit,
  statusCode?: number,
  data?: any
) => {
  switch (success) {
    case 'SUCCESS':
      console.groupCollapsed(`%c SUCCESS [${statusCode}]: ${uri} `, 'background: #15A25E; color: #fff');
      break;
    case 'FAILED':
      console.groupCollapsed(`%c FAILED [${statusCode}]: ${uri} `, 'background: #B80300; color: #fff');
      break;
    case 'TIMEOUT':
      console.groupCollapsed(`%c TIMEOUT: ${uri} `, 'background: #f45d01; color: #fff');
      break;
    default:
      console.groupCollapsed();
  }
  console.log('Request:', finalUrl);
  console.log(localRequestOptions);
  try {
    console.log('Curl:', fetchToCurl(finalUrl, localRequestOptions as FetchOptions));
  } catch (error) {
    console.log(error);
  }
  if (data) {
    console.log('Response:');
    console.log(data);
  }
  console.log('-----------------------END-----------------------');
  console.groupEnd();
};

export function hexToRgba(hex: string, alpha?: number) {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
  return hex;
}

const getSymbolType = (symbolCode: string) => store.getState().SymbolData.marketData.symbolMap[symbolCode]?.symbolType;
export const navigateToSymbolInfoOverview = debounce(
  (symbol: string, dispatch?: Dispatch<any>) => {
    const state = store.getState();
    const isDerivative = state?.accountList?.KIS?.subAccounts?.find(item => item.accountSubs[0].type === 'DERIVATIVES');
    const isFutureCode = state.SymbolData.marketData.symbolMap[symbol]?.symbolType === SymbolType.FUTURES;

    if (!isDerivative && isFutureCode) return alertMessage('warning', t('common.no.derivatives.account'));
    const pushAction = StackActions.push('SymbolInfoOverview', { symbolType: getSymbolType(symbol) });
    dispatch && dispatch(setCurrentSymbol(symbol));
    navigationRef.dispatch(pushAction);
  },
  Platform.OS === 'ios' ? 500 : 2000,
  { leading: true, trailing: false }
);

export function getSymbolFactor(type: string) {
  switch (type) {
    case 'INDEX':
      return 100000;
    case 'BOND':
      return 10000;
    default:
      return 1;
  }
}
export const mapV2 = <T, S>(input: T[] | undefined, callback: (value: T, index: number, array: T[]) => S): S[] => {
  if (isArray(input)) return input.map(callback);

  return [];
};

export const filterV2 = <T extends object | number>(
  input: T[],
  callback: (value: T, index: number, array: T[]) => boolean
): T[] => {
  if (!isArray(input)) return [];

  return input.filter(callback);
};

export const oneOf =
  <T extends (...args: A) => any, U, A extends any[]>(truthy: T | undefined, falsy: U) =>
  (...args: Parameters<T>): ReturnType<T> | U => {
    return truthy ? truthy(...args) : falsy;
  };

export const findUrl = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex);
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
};

export const formatMeasureData = (
  input: Parameters<MeasureOnSuccessCallback>,
  animatedValue: Animated.SharedValue<number>,
  onChangeIndex?: (newIndex: number) => void
) => {
  return {
    animatedValue,
    onChangeIndex,
    x: input[0] || 0,
    y: input[1] || 0,
    width: input[2] || 0,
    height: input[3] || 0,
    pageX: input[4] || 0,
    pageY: input[5] || 0,
  };
};

export const getImgSize = (
  metadata: {
    width: number;
    height: number;
    aspect: number;
  },
  defaultSize: { width: number; height: number },
  isLimitSize?: boolean,
  maxHeight = height
) => {
  if (metadata.width || metadata.height) {
    return defaultSize;
  }
  const ratio = metadata.width / metadata.height;
  const width = defaultSize.width;
  const height = isLimitSize ? width / ratio : Math.min(width / ratio, width / SCREEN_RATIO);

  if (height >= maxHeight) {
    return {
      height: maxHeight,
      width: maxHeight * ratio,
    };
  }

  return {
    width,
    height,
  };
};

export const isObjectEmpty = (objectName: { [s: string]: any }) => {
  return Object.keys(objectName).length === 0;
};

export const isVirtualAccount = (selectedAccount: IAccount) => {
  return selectedAccount.type === ACCOUNT_TYPE.VIRTUAL;
};

export const isKisAccount = (selectedAccount: IAccount) => {
  return selectedAccount.type === ACCOUNT_TYPE.KIS;
};

export const isDerivativesAccount = (selectedAccount: IAccount) => {
  return selectedAccount.selectedSubAccount?.accountSubs[0]?.type === SYSTEM_TYPE.DERIVATIVES;
};

export const isEquityAccount = (selectedAccount: IAccount) => {
  return selectedAccount.selectedSubAccount?.accountSubs?.[0]?.type === SYSTEM_TYPE.EQUITY;
};
