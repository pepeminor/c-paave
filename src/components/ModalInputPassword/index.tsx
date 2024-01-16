import React, { useCallback, useRef } from 'react';
import Modal from '../Modal';
import withMemo from 'HOC/withMemo';
import { TouchableOpacity, View } from 'react-native';
import { t } from 'i18next';
import useStyles from './styles';
import { query } from 'utils';
import globalStyles, { scaleSize } from 'styles';
import TextInputComponent from 'components/TextInput';
import { IConfirmUser, IConfirmUserResponse } from 'interfaces/user';
import APIList from 'config/api';
import { isNotEmpty } from 'ramda-adjunct';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import Icon from 'components/Icon';

export interface IProps {
  isVisible: boolean;
  onCloseModal: () => void;
  onConfirm: () => void;
}

const ModalInputPassword = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const password = useRef('');
  const [passwordErrorContent, setPasswordErrorContent] = React.useState('');
  const { isVisible, onCloseModal, onConfirm } = props;

  const submit = useCallback(async () => {
    try {
      const userConfirmResponse = await query<IConfirmUserResponse, IConfirmUser>(APIList.confirmUser, {
        password: password.current,
      });
      if (!userConfirmResponse.data.value) throw userConfirmResponse.data.message; // Wrong password

      onConfirm();
    } catch (error) {
      if (typeof error === 'string') {
        setPasswordErrorContent(error);
      }
    }
  }, []);

  const onChangePassword = useCallback((value: string) => {
    password.current = value;
  }, []);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onCloseModal}
      childrenContent={
        <View style={styles.modalWatchList}>
          <View style={styles.modalCreateWatchListContainer}>
            <View style={styles.modalTitleCreateWatchList}>
              <PaaveText style={styles.modalTitleText} type={TEXT_TYPE.BOLD_18}>
                {t('account.information.link.social.modal.title')}
              </PaaveText>
            </View>
            <TextInputComponent
              onChangeText={onChangePassword}
              wholeContainerStyle={styles.wholeContainerStyle}
              labelTextStyle={styles.wlNameText}
              labelText={'Password'}
              textInputContainerStyle={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                isNotEmpty(passwordErrorContent) ? styles.textInputContainerStyleError : styles.textInputContainerStyle,
              ]}
              placeholder={'Enter your Password'}
              placeholderTextColor={dynamicColors.DARKTextBigTitle}
              textInputStyle={styles.textInputStyle}
              autoFocus={true}
              icon={<Icon name={'lock'} style={styles.iconStyle} size={18} color={dynamicColors.BlueNewColor} />}
              secureTextEntry={true}
              eyeIconHeight={scaleSize(14)}
              eyeIconWidth={scaleSize(19)}
              eyeIconStyle={styles.eyeIconStyle}
              autoCapitalize={'none'}
              error={isNotEmpty(passwordErrorContent)}
              errorContent={passwordErrorContent}
              styleTextError={styles.styleTextError}
            />

            <View style={styles.modalContent}>
              <TouchableOpacity onPress={onCloseModal} style={styles.cancelExecuteFormButton}>
                <PaaveText type={TEXT_TYPE.BOLD_16} style={styles.cancelExecuteFormButtonText}>
                  {t('Cancel')}
                </PaaveText>
              </TouchableOpacity>
              <TouchableOpacity onPress={submit} style={styles.executeFormButton}>
                <PaaveText type={TEXT_TYPE.BOLD_16} style={styles.executeFormButtonText}>
                  {t('Confirm')}
                </PaaveText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default withMemo(ModalInputPassword);
