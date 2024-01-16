import { storageKey } from 'constants/enum';
import { LANG } from 'global';
import { setKey } from 'utils';

export const setLocalLang = async (value: LANG) => {
  try {
    await setKey(storageKey.LOCAL_LANG, value);
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.error('set localLang', error);
  }
};
