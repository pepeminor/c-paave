import React from 'react';
import { View } from 'react-native';
import { useLinkSocialLogic } from './LinkSocial.logic';
import useStyles from './LinkSocial.style';
import { IProps } from './LinkSocial.type';
import withMemo from 'HOC/withMemo';
import { useTranslation } from 'react-i18next';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import ItemSocial from './components/ItemSocial';

const LinkSocial = (props: IProps) => {
  const { socialList } = useLinkSocialLogic(props);
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  return (
    <View style={styles.container}>
      <PaaveText type={TEXT_TYPE.BOLD_20} color={dynamicColors.LIGHTTextBigTitle}>
        {t('account.information.link.social.title')}
      </PaaveText>
      <PaaveText type={TEXT_TYPE.REGULAR_14}>{t('account.information.link.social.subTitle')}</PaaveText>

      <View style={styles.containerList}>
        {socialList.map((item, index) => {
          return <ItemSocial key={index} {...item} />;
        })}
      </View>
    </View>
  );
};

export default withMemo(LinkSocial);
