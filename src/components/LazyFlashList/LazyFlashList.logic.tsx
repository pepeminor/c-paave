import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps } from './LazyFlashList.type';

const LIMIT = 10;

function getData(data: any[] = [], limit: number = LIMIT, lazy = true, offset = 0) {
  if (!lazy) return data;

  if (data && data?.length <= limit) return data;

  return offset === 0 ? data?.slice(0, limit) : data?.slice(0, offset + limit);
}

const useLazyFlashListLogic = (props: IProps) => {
  const { data, limit = LIMIT, lazy = true } = props;

  const [state, setState] = useMergingState({
    dataList: getData(data as any[], limit, lazy, 0),
    dataOriginal: data ?? [],
    dataOriginalLength: data?.length ?? 0,
  });

  useEffect(() => {
    setState({
      dataList: getData(data as any[], limit, lazy, state.dataList.length),
      dataOriginal: data ?? [],
      dataOriginalLength: data?.length ?? 0,
    });
  }, [data]);

  const propsRefJson = {
    ...props,
    ...state,
  };

  const propsRef = useRef(propsRefJson);
  propsRef.current = propsRefJson;

  const handlers = useHandlers({
    onLoadMore: () => {
      const { dataOriginalLength, dataOriginal, limit = LIMIT } = propsRef.current;
      const offset = propsRef.current.dataList.length;
      if (offset < dataOriginalLength) {
        const dataList = dataOriginal?.slice(offset, offset + limit);
        setState({
          dataList: [...propsRef.current.dataList, ...dataList],
        });
      }
    },
  });

  return {
    state,
    handlers,
  };
};

export { useLazyFlashListLogic };
