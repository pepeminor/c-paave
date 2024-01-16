import { IAction } from 'interfaces/common';

export function loader(state = { loading: false }, action: IAction<null>) {
  if (action.showLoading === true) {
    return {
      loading: false,
    };
  } else if (action.hideLoading === true) {
    return {
      loading: false,
    };
  } else {
    return state;
  }
}
