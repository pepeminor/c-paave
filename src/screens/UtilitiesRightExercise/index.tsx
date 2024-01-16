import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import HeaderScreen from 'components/HeaderScreen';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import useSstyles from './styles';
import DatePicker from 'components/DatePicker';
import {
  formatNumber,
  navigateToSymbolInfoOverview,
  formatDateToString,
  formatStringToDate,
  isSymbolExist,
  navigateBack,
} from 'utils';
import { useTranslation } from 'react-i18next';
import CustomPicker, { IItemList } from 'components/CustomPicker';
import Down from 'assets/icon/Down.svg';
import Right from 'assets/icon/Right.svg';
import TabSelector from 'components/TabSelector';
import { useAppSelector } from 'hooks';
import { Table, TGridList } from './components/Table';
import {
  IGetAdditionIssueShareInfoResponse,
  IGetAllRightListResponse,
  IGetEntitlementHistoryResponse,
} from 'interfaces/equity';
import { ColumnItem } from './components/Table/ColumnItem';
import { useDispatch } from 'react-redux';
import {
  getAdditionIssueShareInfo,
  getAllRightList,
  getEntitlementHistory,
  setItemPurchaseRight,
} from 'reduxs/global-actions';
import { RightType } from 'global';
import { subDays } from 'date-fns';
import PurchaseRightModal from './components/PurchaseRightModal';
import { setSelectedAccount } from 'components/AccountPicker/actions';
import { getEquityKisAccount } from 'reduxs/global-reducers/AccountList';
import { IAccount } from 'interfaces/common';
import { store } from 'screens/App';

const RightTypeSelectData = [
  {
    label: RightType.ALL,
    value: RightType.ALL,
    default: true,
  },
  {
    label: 'Cash Dividend',
    value: RightType.CASH_DIVIDEND,
  },
  {
    label: 'Stock Dividend',
    value: RightType.STOCK_DIVIDEND,
  },
  {
    label: 'Additional Issue',
    value: RightType.ADDITIONAL_ISSUE,
  },
  {
    label: 'Bonus Share',
    value: RightType.BONUS_SHARE,
  },
];

export const RightExerciseTab = {
  CORPORATE: 'Corporate Actions',
  PURCHASE_RIGHT: 'Stock Purchase Right',
  HISTORY: 'History',
} as const;
export type RightExerciseTab = keyof typeof RightExerciseTab;

const goChangedRegister = (item: IGetAdditionIssueShareInfoResponse) => () => {
  store.dispatch(setItemPurchaseRight(item));
};

const parseDate = (dateString: string) => {
  if (!dateString) return '-';
  const result: Date = formatStringToDate(dateString, dateString.length === 8 ? 'yyyyMMdd' : 'yyyyMMddHHmmss');
  return formatDateToString(result, 'dd/MM/yyyy') as string;
};

const UtilitiesRightExercise = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useSstyles();

  const [tab, setTab] = useState<RightExerciseTab>('CORPORATE');
  const [fromDate, setFromDate] = useState<Date>(subDays(new Date(), 7));
  const [toDate, setToDate] = useState<Date>(new Date());
  const [rightType, setRightType] = useState<RightType>(RightType.ALL);
  const accountListEqtKis = useAppSelector(state => state.accountList);
  const accountNumber = useAppSelector(state => state.selectedAccount.selectedSubAccount?.accountNumber);

  useEffect(() => {
    switch (tab) {
      case 'CORPORATE':
        dispatch(
          getAllRightList({
            accountNo: accountNumber ?? '',
            fromDate: formatDateToString(fromDate) ?? '',
            toDate: formatDateToString(toDate) ?? '',
            symbol: 'ALL',
            rightType: rightType,
          })
        );
        break;
      case 'PURCHASE_RIGHT':
        dispatch(
          getAdditionIssueShareInfo({
            accountNumber: accountNumber ?? '',
          })
        );
        break;
      case 'HISTORY':
        dispatch(
          getEntitlementHistory({
            accountNumber: accountNumber ?? '',
            fromDate: formatDateToString(fromDate) ?? '',
            toDate: formatDateToString(toDate) ?? '',
          })
        );
        break;
    }
  }, [tab, fromDate, toDate, rightType, accountNumber]);

  const onSelectRightType = useCallback((item: IItemList) => {
    setRightType(item.value as RightType);
  }, []);

  const onChangeToDate = useCallback(
    (value: Date) => {
      if (value < fromDate) {
        setFromDate(value);
      }
      setToDate(value);
    },
    [fromDate]
  );

  const onChangeFromDate = useCallback(
    (value: Date) => {
      if (value > toDate) {
        setToDate(value);
      }
      setFromDate(value);
    },
    [toDate]
  );

  const goToSymbolInfo = useCallback(
    (symbol: string) => () => {
      if (!isSymbolExist(symbol)) return;
      navigateToSymbolInfoOverview(symbol, dispatch);
    },
    []
  );

  useEffect(() => {
    dispatch(
      setSelectedAccount(getEquityKisAccount(accountListEqtKis) as IAccount, undefined, undefined, undefined, {
        notSetCurrentSymbol: true,
      })
    );
  }, []);

  const configGrid = useMemo((): TGridList[] => {
    switch (tab) {
      case 'PURCHASE_RIGHT':
        return [
          {
            title: 'Action',
            width: scaleSize(95),
            column: (item: IGetAdditionIssueShareInfoResponse) => (
              <ColumnItem style={styles.firstColumn}>
                <View style={[styles.containerFirstCol, globalStyles.flexDirectionRow]}>
                  <TouchableOpacity onPress={goChangedRegister(item)}>
                    <Text
                      allowFontScaling={false}
                      style={[styles.boldText, styles.stockTextStyle, styles.largeTextStyle]}
                    >
                      {t('Register')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ColumnItem>
            ),
          },
          {
            title: 'Symbol',
            width: scaleSize(65),
            column: (item: IGetAdditionIssueShareInfoResponse) => (
              <ColumnItem style={styles.firstColumn}>
                <View style={[styles.containerFirstCol, globalStyles.flexDirectionRow]}>
                  <TouchableOpacity onPress={goToSymbolInfo(item.symbol)}>
                    <Text
                      allowFontScaling={false}
                      style={[styles.boldText, styles.stockTextStyle, styles.largeTextStyle]}
                    >
                      {item.symbol}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ColumnItem>
            ),
          },
          {
            title: 'Last Register Date',
            width: scaleSize(140),
            column: (item: IGetAdditionIssueShareInfoResponse) => (
              <ColumnItem style={styles.firstColumn}>
                <View style={styles.containerFirstCol}>
                  <Text allowFontScaling={false} style={[styles.normalTextStyle, styles.largeTextStyle]}>
                    {parseDate(item.lastRegistrationDate)}
                  </Text>
                </View>
              </ColumnItem>
            ),
          },
          {
            title: 'Qtt',
            width: scaleSize(75),
            column: (item: IGetAdditionIssueShareInfoResponse) => (
              <ColumnItem style={styles.firstColumn}>
                <View style={[styles.containerFirstCol, globalStyles.alignEnd]}>
                  <Text allowFontScaling={false} style={[styles.normalTextStyle, styles.alignRight]}>
                    {formatNumber(item.qtyAtClosedDate)}
                  </Text>
                </View>
              </ColumnItem>
            ),
          },
        ];
      case 'HISTORY':
        return [
          {
            title: 'Symbol',
            width: scaleSize(65),
            column: (item: IGetEntitlementHistoryResponse) => (
              <ColumnItem style={styles.firstColumn}>
                <TouchableOpacity onPress={goToSymbolInfo(item.symbol)}>
                  <View style={[styles.containerFirstCol, globalStyles.flexDirectionRow]}>
                    <Right style={[styles.labelIconStyle, styles.pR]} rotation={270} />
                    <Text
                      allowFontScaling={false}
                      style={[styles.boldText, styles.stockTextStyle, styles.largeTextStyle]}
                    >
                      {item.symbol}
                    </Text>
                  </View>
                </TouchableOpacity>
              </ColumnItem>
            ),
          },
          {
            title: 'Register Date',
            width: scaleSize(125),
            column: (item: IGetEntitlementHistoryResponse) => (
              <ColumnItem style={styles.firstColumn}>
                <View style={[styles.containerFirstCol, globalStyles.flexDirectionRow]}>
                  <Text allowFontScaling={false} style={[styles.normalTextStyle, styles.largeTextStyle]}>
                    {parseDate(item.registeredTime)}
                  </Text>
                </View>
              </ColumnItem>
            ),
          },
          {
            title: 'Quantity',
            width: scaleSize(85),
            column: (item: IGetEntitlementHistoryResponse) => (
              <ColumnItem style={styles.firstColumn}>
                <View style={[styles.containerFirstCol, globalStyles.alignEnd]}>
                  <Text allowFontScaling={false} style={[styles.normalTextStyle, styles.largeTextStyle]}>
                    {formatNumber(item.registeredQty)}
                  </Text>
                </View>
              </ColumnItem>
            ),
          },
          {
            title: 'Status',
            width: scaleSize(100),
            column: (item: IGetEntitlementHistoryResponse) => (
              <ColumnItem style={styles.firstColumn}>
                <View style={[styles.containerFirstCol]}>
                  <Text allowFontScaling={false} style={[styles.normalTextStyle, styles.alignRight]}>
                    {t(item.status)}
                  </Text>
                </View>
              </ColumnItem>
            ),
          },
        ];
      default:
        return [
          {
            title: 'Symbol',
            width: scaleSize(65),
            column: (item: IGetAllRightListResponse) => (
              <ColumnItem style={styles.firstColumn}>
                <TouchableOpacity onPress={goToSymbolInfo(item.symbol)}>
                  <View style={[styles.containerFirstCol, globalStyles.flexDirectionRow]}>
                    <Right style={[styles.labelIconStyle, styles.pR]} />
                    <Text
                      allowFontScaling={false}
                      style={[styles.boldText, styles.stockTextStyle, styles.largeTextStyle]}
                    >
                      {item.symbol}
                    </Text>
                  </View>
                </TouchableOpacity>
              </ColumnItem>
            ),
          },
          {
            title: 'Event',
            width: scaleSize(120),
            column: (item: IGetAllRightListResponse) => (
              <ColumnItem style={styles.firstColumn}>
                <View style={styles.containerFirstCol}>
                  <Text allowFontScaling={false} style={[styles.normalTextStyle, styles.largeTextStyle]}>
                    {t(item.rightType)}
                  </Text>
                </View>
              </ColumnItem>
            ),
          },
          {
            title: 'Exercise Date',
            width: scaleSize(100),
            column: (item: IGetAllRightListResponse) => (
              <ColumnItem style={styles.firstColumn}>
                <View style={styles.containerFirstCol}>
                  <Text allowFontScaling={false} style={[styles.normalTextStyle, styles.largeTextStyle]}>
                    {parseDate(item.exerciseDate)}
                  </Text>
                </View>
              </ColumnItem>
            ),
          },
          {
            title: 'Owning Qtt',
            width: scaleSize(90),
            column: (item: IGetAllRightListResponse) => (
              <ColumnItem style={styles.firstColumn}>
                <View style={[styles.containerFirstCol, globalStyles.alignEnd]}>
                  <Text allowFontScaling={false} style={[styles.normalTextStyle, styles.alignRight]}>
                    {formatNumber(item.qtyAtClosedDate)}
                  </Text>
                </View>
              </ColumnItem>
            ),
          },
        ];
    }
  }, [tab, styles, goToSymbolInfo, goChangedRegister]);

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={navigateBack}
        headerTitle={'Right Exercise'}
        subAccountVisible={true}
        disableVirtualAccount={true}
        isNotSubD={true}
      />
      <TabSelector value={tab} setValue={setTab} listValue={RightExerciseTab} />
      <View style={[globalStyles.justifyCenter, globalStyles.alignCenter, styles.containerBackground]}>
        <View
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.justifySpaceBetween,
            globalStyles.alignCenter,
            styles.chooseTypeBlock,
          ]}
        >
          <Text style={styles.chooseTypeLabel}>{t('Type')}</Text>
          <CustomPicker
            touchAbleWidth={272}
            touchAbleHeight={44}
            itemList={RightTypeSelectData}
            label={'Event'}
            labelIcon={<Down style={styles.labelIconStyle} />}
            borderWidth={1}
            borderRadius={10}
            borderColor={Colors.BORDER}
            modalAlign="bottom"
            closeButton
            modalContentContainerStyle={styles.pB16}
            onChange={onSelectRightType}
            chosenValue={rightType}
          />
        </View>
      </View>
      <View style={[globalStyles.flexDirectionRow, globalStyles.fillWidth, styles.marginBottom16]}>
        <View style={[globalStyles.container, styles.marginLeft16, styles.marginRight16]}>
          <DatePicker label={'From date'} onChange={onChangeFromDate} value={fromDate} maxDate={new Date()} />
        </View>
        <View style={[globalStyles.container, styles.marginRight16]}>
          <DatePicker label={'To date'} onChange={onChangeToDate} value={toDate} maxDate={new Date()} />
        </View>
      </View>
      <Table tab={tab} containerStyle={globalStyles.container} configGrid={configGrid} />
      <PurchaseRightModal />
    </View>
  );
};

export default memo(UtilitiesRightExercise);
