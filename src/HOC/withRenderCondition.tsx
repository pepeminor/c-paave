import { useAppSelector } from 'hooks/useAppSelector';
import React, { ComponentType, PropsWithChildren } from 'react';
import { IState } from 'reduxs/global-reducers';

/**
 * Injects props into a component
 *
 * @param Component to inject props into
 * @returns a function that takes in props to inject and returns a Injected Component
 */
export default function withRenderCondition<T>(
  Component: ComponentType<PropsWithChildren<T>>,
  conditionFunc: (state: IState) => boolean | undefined
) {
  return (props: PropsWithChildren<T>) => {
    const renderCondition = useAppSelector(conditionFunc);
    if (!renderCondition) return null;
    return <Component {...props} />;
  };
}
