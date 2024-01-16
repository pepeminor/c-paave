import { Lang } from 'constants/enum';
import { LANG } from 'global';

export interface ILanguageFileResponse {
  [s: string]: string;
}

export type ILocalLang = {
  [l in Lang]: {
    ETag: string;
    data: ILanguageFileResponse;
  };
};

export type I18nData<T> = {
  [s in LANG]?: T;
};
