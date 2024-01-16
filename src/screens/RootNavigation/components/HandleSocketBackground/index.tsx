import { Global } from 'constants/main';
import useAppStateChange from 'hooks/useAppStateChange';
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { initMarket } from 'reduxs/SymbolData';

const HandleBackgroundSocket = () => {
  const dispatch = useDispatch();

  useAppStateChange(
    React.useCallback((currentAppState, nextAppState) => {
      if (nextAppState === 'background') {
        Object.values(Global.sockets).forEach(item => item?.disconnect());
      }
      if (currentAppState === 'background' && nextAppState === 'active') {
        dispatch(initMarket());
        Object.values(Global.sockets).forEach(item => item?.connect());
      }
    }, [])
  );

  return null;
};

export default memo(HandleBackgroundSocket);
