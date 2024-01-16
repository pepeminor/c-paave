export const originWhitelist = ['*'];

export const androidDefaultWebViewProps = {
  domStorageEnabled: true,
  allowFileAccess: true,
  allowUniversalAccessFromFileURLs: true,
  onShouldStartLoadWithRequest: () => false,
};
