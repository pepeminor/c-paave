import { IAction } from 'interfaces/common';
import { INews } from 'interfaces/news';
import { NEWS_INIT } from 'reduxs/actions';

export const getNews = (params: INews): IAction<INews> => {
  return {
    type: NEWS_INIT,
    payload: params,
  };
};
