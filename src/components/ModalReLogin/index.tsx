import { useAppSelector } from 'hooks/useAppSelector';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { rnBiometrics } from 'screens/App';
import { loginBiometricAfterTimeOut } from 'reduxs/global-actions';
import { logOutAction } from 'screens/UserInfo/AlreadyLogin/actions';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { useTranslation } from 'react-i18next';

const ModalReLogin = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const triggerReLoginBiometricModal = useAppSelector(state => state.triggerReLoginBiometricModal);
  const currentUserSetting = useAppSelector(state => state.currentUserSetting);
  const sessionVersion = useAppSelector(state => state.authToken.version);

  const onCancelBiometric = () => {
    dispatch(
      logOutAction({
        userLogout: true,
        version: sessionVersion ?? 0,
      })
    );
  };

  useUpdateEffect(() => {
    if (!triggerReLoginBiometricModal.showModal) return;
    if (currentUserSetting == null) return;
    rnBiometrics
      .biometricKeysExist()
      .then(({ keysExist }) => {
        if (keysExist) {
          rnBiometrics
            .createSignature({
              promptMessage: t('Sign in'),
              cancelButtonText: t('Cancel'),
              payload: currentUserSetting.paaveUsername.toUpperCase(),
            })
            .then(({ success, signature }) => {
              if (success && signature != null) {
                dispatch(
                  loginBiometricAfterTimeOut({
                    payload: { signature: signature, username: currentUserSetting.paaveUsername },
                    callBack: {
                      handleFail: () => {
                        onCancelBiometric();
                      },
                    },
                  })
                );
              } else {
                onCancelBiometric();
              }
            })
            .catch(() => {
              onCancelBiometric();
            });
        }
      })
      .catch(() => {
        onCancelBiometric();
      });
  }, [triggerReLoginBiometricModal]);

  return null;
};

export default memo(ModalReLogin);
