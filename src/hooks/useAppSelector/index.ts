import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { isEqual } from 'lodash';
import { CompareFieldSchema, compareSelectorField } from 'utils';

export interface CustomTypedUseSelectorHook<TState> {
  <TSelected>(
    selector: (state: TState) => TSelected,
    equalityFn?: ((left: TSelected, right: TSelected) => boolean) | CompareFieldSchema<TSelected>
  ): TSelected;
}

/**
 * UseSelector hook with predefined type
 *
 * @param selector the selector function
 * @param equalityChecker The function that will be used to determine equality, default will use lodash isEqual
 * @param equalityChecker If you want to compare only some fields of the state, you can pass a CompareFieldSchema object
 *
 * @returns the selected state
 *
 * @example const { user } = useAppSelector(state => state.auth);
 *
 * @example const { user } = useAppSelector(state => state.auth, (left, right) => left.user.id === right.user.id);
 *
 * @example
 * const symbolData = useAppSelector(state => state.symbolData, {
 *    symbolCode: true // only compare symbolCode field
 *    currentPrice: true // and currentPrice field
 * });
 */
export const useAppSelector: CustomTypedUseSelectorHook<IState> = (selector, equalityChecker) => {
  if (!equalityChecker) {
    return useSelector(selector, isEqual);
  }
  if (typeof equalityChecker === 'function') {
    return useSelector(selector, equalityChecker);
  }
  return useSelector(selector, compareSelectorField(equalityChecker));
};

export const useTypedSelector: TypedUseSelectorHook<IState> = useSelector;
