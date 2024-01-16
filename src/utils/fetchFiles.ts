import { StoredFile } from 'interfaces/File';
import { getKey, setKey } from './asyncStorage';

async function getStoredFile<T>(fileName: string) {
  return await getKey<StoredFile<T>>(`file_${fileName}`);
}

async function setStoredFile<T>(fileName: string, file: StoredFile<T>) {
  return await setKey(`file_${fileName}`, file);
}

export async function fetchFileAndStore<T>(
  fileName: string,
  url: string,
  options: RequestInit = {}
): Promise<T | null> {
  try {
    const storedFile = await getStoredFile<T>(fileName);
    if (storedFile != null) {
      options.headers = {
        ...options.headers,
        'If-None-Match': storedFile.ETag,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      };
    }
    const response = await fetch(url, options);

    if (response.headers.get('ETag') === storedFile?.ETag) {
      return storedFile?.data as T;
    }
    if (response.status >= 200 && response.status < 300) {
      const data: T = await response.json();
      setStoredFile<T>(fileName, { ETag: response.headers.get('ETag') ?? '', data });
      return data;
    }
    if (response.status === 304) {
      return storedFile?.data as T;
    }
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('fetchFileAndStore', error);
    return null;
  }
}
