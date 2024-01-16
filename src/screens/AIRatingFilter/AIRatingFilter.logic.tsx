import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef } from 'react';
import { IProps } from './AIRatingFilter.type';
import { useAppSelector } from 'hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { AIRatingActions } from 'reduxs';

const ModalMeta = [
  {
    title: 'What is AI Rating?',
    content: 'AIRATING_DEFINITION',
  },
  {
    title: 'What is Technical Score?',
    content: 'TECHSCORE_DEFINITION',
  },
  {
    title: 'What is Valuation Score?',
    content: 'VALUESCORE_DEFINITION',
  },
  {
    title: 'What is Quality Score?',
    content: 'QUALITYSCORE_DEFINITION',
  },
];

const useAiRatingFilterLogic = (props: IProps) => {
  const dispatch = useDispatch();
  const stockFilter = useAppSelector(state => state.AIRatingReducer.stockFilter);
  const initializeState = {
    modalVisible: false,
    modalInfo: ModalMeta[0],
    stockFilter,
  };
  const propsRef = useRef({
    ...props,
    ...initializeState,
    ...stockFilter,
  });
  propsRef.current = { ...propsRef.current, ...props, ...stockFilter };
  const [state, setState] = useMergingState(initializeState, propsRef);

  const handlers = useHandlers({
    vn30Pressed: () => {
      setState(pre => ({ ...pre, stockFilter: { ...pre.stockFilter, VN30: !pre.stockFilter.VN30 } }));
    },
    hnx30Pressed: () => {
      setState(pre => ({ ...pre, stockFilter: { ...pre.stockFilter, HNX30: !pre.stockFilter.HNX30 } }));
    },
    upcomPressed: () => {
      setState(pre => ({ ...pre, stockFilter: { ...pre.stockFilter, UPCOM: !pre.stockFilter.UPCOM } }));
    },
    handleModalVisible: (value: boolean) => {
      setState({ modalVisible: value });
    },
    openModalAIRating: () => {
      setState({ modalVisible: true, modalInfo: ModalMeta[0] });
    },
    openModalTechnicalScore: () => {
      setState({ modalVisible: true, modalInfo: ModalMeta[1] });
    },
    openModalValuationScore: () => {
      setState({ modalVisible: true, modalInfo: ModalMeta[2] });
    },
    openModalQualityScore: () => {
      setState({ modalVisible: true, modalInfo: ModalMeta[3] });
    },
    onAIRatingReleased: (value: number) => {
      setState(pre => ({ ...pre, stockFilter: { ...pre.stockFilter, rating: value } }));
    },
    onTechnicalScoreReleased: (value: number) => {
      setState(pre => ({ ...pre, stockFilter: { ...pre.stockFilter, technical: value } }));
    },
    onValuationScoreReleased: (value: number) => {
      setState(pre => ({ ...pre, stockFilter: { ...pre.stockFilter, valuation: value } }));
    },
    onQualityScoreReleased: (value: number) => {
      setState(pre => ({ ...pre, stockFilter: { ...pre.stockFilter, quality: value } }));
    },
    applyFilter: () => {
      dispatch(AIRatingActions.setFilterStock(propsRef.current.stockFilter));
      propsRef.current.navigation.goBack();
    },
    resetFilter: () => {
      dispatch(
        AIRatingActions.setFilterStock({
          rating: 0,
          technical: 0,
          valuation: 0,
          quality: 0,
          VN30: false,
          HNX30: false,
          UPCOM: false,
        })
      );
      propsRef.current.navigation.goBack();
    },
  });

  return {
    state,
    handlers,
  };
};

export { useAiRatingFilterLogic };
