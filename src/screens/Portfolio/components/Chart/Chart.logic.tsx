import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useMemo, useRef } from 'react';
import { IProps } from './Chart.type';
import { useIsFocused } from '@react-navigation/native';
import { ACCOUNT_TYPE } from 'global';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { useDispatch } from 'react-redux';
import { chartFilterData } from 'constants/profitloss';
import { DailyProfitLossActions } from 'reduxs/DailyProfitLoss';
import { formatDateToString } from 'utils';
import { subDays } from 'date-fns';
import { isNilOrEmpty } from 'ramda-adjunct';

export const initializeStateChart = {
  sample: chartFilterData[0].value,
  notRenderChart: true,
};

const useChartLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeStateChart,
  });
  propsRef.current = { ...propsRef.current, ...props };

  const [state, setState] = useMergingState(initializeStateChart, propsRef);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const dataChart = useMemo(() => props.dailyProfitLoss?.[state.sample] ?? [], [props.dailyProfitLoss?.[state.sample]]);
  const vnindexReturn = useMemo(
    () => props.vnindexReturn?.[state.sample]?.normalizedRate ?? [],
    [props.vnindexReturn?.[state.sample]]
  );

  useEffect(() => {
    if (props.notOnEnterScreen) {
      setState({
        notRenderChart: false,
      });
    }
  }, []);

  useUpdateEffect(() => {
    if (!isFocused) return;
    const { selectedAccountType, selectedSubAccount, subAccountNumber } = props;
    if (selectedAccountType === ACCOUNT_TYPE.DEMO) {
      dispatch(DailyProfitLossActions.getDailyProfitLossDemoRequest(state.sample));
      return;
    }

    if (isNilOrEmpty(dataChart)) {
      if (selectedAccountType === ACCOUNT_TYPE.VIRTUAL && subAccountNumber != null) {
        if (state.sample === 0) {
          dispatch(
            DailyProfitLossActions.getDailyProfitLossListRequest({
              days: state.sample.toString(),
              pageSize: 500,
              pageNumber: 0,
            })
          );
        } else {
          dispatch(
            DailyProfitLossActions.getDailyProfitLossListRequest({
              days: state.sample.toString(),
              fromDate: formatDateToString(subDays(new Date(), state.sample)) || '',
              toDate: formatDateToString(new Date()) || '',
              pageSize: 500,
              pageNumber: 0,
            })
          );
        }
      } else {
        if (selectedSubAccount?.accountNumber != null) {
          if (state.sample === 0) {
            dispatch(
              DailyProfitLossActions.getDailyProfitLossKISRequest({
                subAccount: selectedSubAccount?.accountNumber,
                days: state.sample.toString(),
                pageSize: 500,
                pageNumber: 0,
              })
            );
          } else {
            dispatch(
              DailyProfitLossActions.getDailyProfitLossKISRequest({
                subAccount: selectedSubAccount?.accountNumber,
                days: state.sample.toString(),
                pageSize: 500,
                pageNumber: 0,
                fromDate: formatDateToString(subDays(new Date(), state.sample)) || '',
                toDate: formatDateToString(new Date()) || '',
              })
            );
          }
        }
      }
    }
  }, [props.selectedSubAccount, props.selectedAccountType, isFocused]);

  useEffect(() => {
    if (!state.notRenderChart) return;

    if (isNilOrEmpty(dataChart)) {
      const { selectedAccountType, selectedSubAccount, subAccountNumber } = props;
      if (selectedAccountType === ACCOUNT_TYPE.DEMO) {
        dispatch(DailyProfitLossActions.getDailyProfitLossDemoRequest(state.sample));
      }

      if (selectedAccountType === ACCOUNT_TYPE.VIRTUAL && subAccountNumber != null) {
        if (state.sample === 0) {
          dispatch(
            DailyProfitLossActions.getDailyProfitLossListRequest({
              days: state.sample.toString(),
              pageSize: 500,
              pageNumber: 0,
            })
          );
        } else {
          dispatch(
            DailyProfitLossActions.getDailyProfitLossListRequest({
              days: state.sample.toString(),
              fromDate: formatDateToString(subDays(new Date(), state.sample)) || '',
              toDate: formatDateToString(new Date()) || '',
              pageSize: 500,
              pageNumber: 0,
            })
          );
        }
      } else {
        if (selectedSubAccount?.accountNumber != null) {
          if (state.sample === 0) {
            dispatch(
              DailyProfitLossActions.getDailyProfitLossKISRequest({
                subAccount: selectedSubAccount?.accountNumber,
                days: state.sample.toString(),
                pageSize: 500,
                pageNumber: 0,
              })
            );
          } else {
            dispatch(
              DailyProfitLossActions.getDailyProfitLossKISRequest({
                subAccount: selectedSubAccount?.accountNumber,
                days: state.sample.toString(),
                pageSize: 500,
                pageNumber: 0,
                fromDate: formatDateToString(subDays(new Date(), state.sample)) || '',
                toDate: formatDateToString(new Date()) || '',
              })
            );
          }
        }
      }
    }
    setState({
      notRenderChart: false,
    });
  }, [dataChart]);

  const handlers = useHandlers({
    changeSample: (sample: number) => {
      if (sample === propsRef.current.sample) return;
      setState({
        sample,
        notRenderChart: true,
      });
    },
  });

  return {
    state,
    handlers,
    chartFilterData,
    dataChart,
    vnindexReturn,
  };
};

export { useChartLogic };
