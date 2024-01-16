import config from 'config';
import { I18nBotData } from 'interfaces/File';
import { call, put, takeLeading } from 'redux-saga/effects';
import { AdvisorActions } from 'reduxs/Advisor';
import { SUCCESS } from 'reduxs/action-type-utils';
import { GET_BOT_DATA } from 'reduxs/actions';
import { fetchFileAndStore } from 'utils';

const fileName = 'botData';

function* fetchBotData() {
  try {
    const botData: I18nBotData[] | null = yield call(
      fetchFileAndStore,
      fileName,
      `${config.s3ResourceUrl}/${fileName}.json`
    );
    const mappedBotData = (botData ?? []).reduce((prev, curr) => {
      const { en, vi, ko, zh, userId, username } = curr;
      const defaultData = en ?? vi ?? ko ?? zh;
      return {
        ...prev,
        [curr.userId]: {
          userId,
          username,
          fullname: defaultData?.fullname ?? '',
          bio: defaultData?.bio ?? '',
          en,
          vi,
          ko,
          zh,
        },
      };
    }, {});
    yield put({
      type: SUCCESS(GET_BOT_DATA),
      payload: mappedBotData,
    });

    yield put(
      AdvisorActions.updateAdvisorList(
        (botData ?? []).reduce((prev, curr) => {
          const { en, vi, ko, userId, username } = curr;
          const defaultData = en ?? vi ?? ko;
          return {
            ...prev,
            [curr.userId]: {
              en: {
                userId,
                username,
                ...(en ?? defaultData),
              },
              vi: {
                userId,
                username,
                ...(vi ?? defaultData),
              },
              ko: {
                userId,
                username,
                ...(ko ?? defaultData),
              },
            },
          };
        }, {})
      )
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('fetch botData error', err);
  }
}

export default function* watchFetchBotData() {
  yield takeLeading(GET_BOT_DATA, fetchBotData);
}
