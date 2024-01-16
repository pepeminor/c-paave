import { Platform } from 'react-native';
import Share, { ShareOptions } from 'react-native-share';
import { imageLogo } from 'assets/logo/imageLogo';

const title = 'PAAVE';
const message = 'PAAVE - The first social investing platform with virtual and live stock trading features in Vietnam';
const url = 'https://paave.onelink.me/xDMU/c35mdrwa';
const iconLogo = imageLogo.imageLogo;

const ShareData = () => {
  const onShare = async () => {
    const shareOptions = Platform.select({
      ios: {
        failOnCancel: false,
        activityItemSources: [
          {
            placeholderItem: {
              type: 'url',
              content: iconLogo,
            },
            item: {
              default: {
                type: 'text',
                content: `${message} ${url}`,
              },
            },
            subject: {
              default: 'test',
            },
            linkMetadata: {
              title: `${message} ${url}`,
              icon: iconLogo,
              originalUrl: `${url}`,
            },
          },
        ],
      },
      default: {
        failOnCancel: false,
        title,
        subject: title,
        message: `${message} `,
        url: `${url} `,
      },
    });

    try {
      const ShareResponse = await Share.open(shareOptions as ShareOptions);
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return onShare();
};

export default ShareData;
