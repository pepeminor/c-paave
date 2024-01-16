import { IState } from './global-reducers';

const migrations: any = {
  2: (state: IState) => {
    return Promise.resolve(state);
  },
};

export { migrations };
