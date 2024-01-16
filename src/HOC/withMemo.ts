/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual } from 'lodash';
import { memo, ComponentProps, ComponentType, PropsWithChildren } from 'react';

interface IProps {
  [s: string]: any;
}

const defaultPropsAreEqual = <P extends IProps>(
  prevProps: Readonly<PropsWithChildren<P>>,
  nextProps: Readonly<PropsWithChildren<P>>
) => {
  const prevKeys = Object.keys(prevProps);

  if (prevKeys.length !== Object.keys(nextProps).length) {
    return false;
  }

  return !prevKeys.some(prevKey => {
    if (typeof prevProps[prevKey] === 'object') {
      return !isEqual(prevProps[prevKey], nextProps[prevKey]);
    }

    return prevProps[prevKey] !== nextProps[prevKey];
  });
};

const withMemo = <P extends ComponentType<any>>(
  Component: P,
  propsAreEqual?: (prevProps: Readonly<ComponentProps<P>>, nextProps: Readonly<ComponentProps<P>>) => boolean
): P => {
  return memo(Component, propsAreEqual ?? defaultPropsAreEqual) as any;
};

export default withMemo;
