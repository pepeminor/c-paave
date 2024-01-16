import { NEWS_INIT } from 'reduxs/actions';
import { IAction } from 'interfaces/common';
import { INewsParams } from 'interfaces/news';

export function NewsInit(state: INewsParams[] = [], action: IAction<INewsParams>) {
  switch (action.type) {
    case NEWS_INIT:
      if (action.payload.fetchCount) {
        return action.payload.fetchCount;
      } else {
        return state;
      }
    default:
      return state;
  }
}
