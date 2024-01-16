import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps } from './CommentList.type';

const initializeState = {
  dataList: [],
  dataOriginal: [],
  dataOriginalLength: 0,
  offsetDataList: 0,
};

const useCommentListLogic = (props: IProps) => {
  const [state, setState] = useMergingState({
    ...initializeState,
    dataList: props.commentChildList.slice(-1),
    dataOriginal: props.commentChildList ?? [],
    dataOriginalLength: props.commentChildList?.length ?? 0,
    offsetDataList: props.commentChildList.length > 0 ? 1 : 0,
  });

  const propsRef = useRef({
    ...props,
    ...state,
  });
  propsRef.current = { ...state, ...props };

  useEffect(() => {
    const data = props.commentChildList.slice(-(propsRef.current.offsetDataList + 1));
    setState({
      dataList: data,
      dataOriginal: props.commentChildList ?? [],
      dataOriginalLength: props.commentChildList?.length ?? 0,
      offsetDataList: data.length,
    });
  }, [props.commentChildList]);

  const handlers = useHandlers({
    onLoadMore: () => {
      const { dataOriginalLength, dataOriginal } = propsRef.current;
      const offset = propsRef.current.dataList.length;
      if (offset < dataOriginalLength) {
        const dataList = dataOriginal?.slice(-(offset + 5));

        setState({
          offsetDataList: dataList.length,
          dataList,
        });
      }
    },
  });

  return {
    state,
    handlers,
  };
};

export { useCommentListLogic };
