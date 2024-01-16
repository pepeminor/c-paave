import config from 'config';
import { store } from 'screens/App';

type UploadImageResponse = {
  id: string;
};

export function uploadImage(name: string, uri: string, type: string) {
  const body = new FormData();
  body.append('file', {
    name,
    uri,
    type,
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + store.getState().authToken.accessToken,
    },
    body,
  };

  const uploadApi = config.apiUrl.domainSocialV2 + '/media';

  return fetch(uploadApi, requestOptions)
    .then(response => response.json() as Promise<UploadImageResponse>)
    .catch(_ => {
      // console.log('error', error);
      return null;
    });
}
