import { Image, Text, TouchableOpacity, View, ViewProps } from 'react-native';
import React, { memo } from 'react';
import { useAppSelector } from 'hooks';
import useStyles from './styles';
import { ACCOUNT_TYPE } from 'global';
import globalStyles from 'styles';
import { navigate } from 'utils';
import { useTranslation } from 'react-i18next';

interface LoginRequiredProps extends ViewProps {
  showCondition?: boolean;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  onPressButton?: () => void;
}

const LoginRequired = ({
  showCondition = true,
  top = 0,
  left = 0,
  right = 0,
  bottom = 0,
  style: moreStyles,
  onPressButton,
  ...viewProps
}: LoginRequiredProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);

  const goToSignIn = () => {
    onPressButton?.();
    navigate({ key: 'SignIn' });
  };

  const goToSignUp = () => {
    onPressButton?.();

    navigate({ key: 'SignIn' });
  };

  return selectedAccountType === ACCOUNT_TYPE.DEMO && showCondition ? (
    <View
      style={[
        {
          top,
          left,
          right,
          bottom,
        },
        styles.container,
        moreStyles,
      ]}
      {...viewProps}
    >
      <View style={[globalStyles.container, globalStyles.centered]}>
        <View style={globalStyles.centered}>
          <Image style={styles.paaveLogo} source={require('assets/logo-paave-with-shadow.png')} />
        </View>
        <Text allowFontScaling={false} style={styles.infoText}>
          {t('You must sign in to Paave to use this feature.')}
        </Text>
        <View style={[globalStyles.flexDirectionRow]}>
          <TouchableOpacity onPress={goToSignUp} style={[styles.avaAction, styles.avaActionRegister]}>
            <Text allowFontScaling={false} style={styles.avaActionRegisterText}>
              {t('Register')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToSignIn} style={[styles.avaAction, styles.avaActionLogin]}>
            <Text allowFontScaling={false} style={styles.avaActionLoginText}>
              {t('Sign in')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : null;
};

export default memo(LoginRequired);
