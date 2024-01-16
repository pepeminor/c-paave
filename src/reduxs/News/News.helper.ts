import { mapV2 } from 'utils';
import { IGetNewsResponse, INews } from './News.type';
import { sortWith, descend, prop } from 'ramda';
import moment from 'moment';
import { isNotNilOrEmpty } from 'ramda-adjunct';
export const MAX_NEWS_PINNED = 3;

export const formatDataNews = (data: IGetNewsResponse, isMaxNewsPinned?: boolean) => {
  const listNewsPinned = [] as number[];
  const listNewsNotPinned = [] as number[];
  const listNews = [] as number[];
  let listNewsJson = {};

  if (isNotNilOrEmpty(data)) {
    const dataSort = sortWith([descend(prop('publishDate'))], data.latestNews); // sort by publishDate
    mapV2(dataSort, (item: INews) => {
      if (item.pinned && listNewsPinned.length < MAX_NEWS_PINNED && !isMaxNewsPinned) {
        listNewsPinned.push(item.newsId);
      } else {
        listNewsNotPinned.push(item.newsId);
      }
      listNews.push(item.newsId);
      listNewsJson = {
        ...listNewsJson,
        [item.newsId]: {
          ...item,
          publishDate: moment(item.publishDate).format('DD/MM/YYYY HH:mm'),
        },
      };
    });
  }

  return { listNewsJson, listNewsPinned, listNewsNotPinned, listNews };
};
