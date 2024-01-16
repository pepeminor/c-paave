import React, { FunctionComponent, ReactElement, useCallback, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';
import withMemo from 'HOC/withMemo';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { getStylesHook } from 'hooks/useStyles';
import Icon, { IconWithBackground } from 'components/Icon';
import { lightColors, scaleSize } from 'styles';
import TouchableScale from 'components/TouchableScale';
import { SOCIAL_LINK } from 'constants/main';
import { useAppSelector } from 'hooks/useAppSelector';
import { AuthenticationActions, AuthenticationSelectors } from 'reduxs';
import { IProps as ModalUnlinkType } from 'components/ModalInputPassword';
import { useDispatch } from 'react-redux';

interface IProps {
  socialType: SOCIAL_LINK;
  name: string;
  icon: ReactElement;
  onLink: () => void;
  onUnlink: (socialType: SOCIAL_LINK) => void;
}

const LinkSocial = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();
  const dataSocialLink = useAppSelector(AuthenticationSelectors.selectedSocialLinkAccounts(props.socialType));
  const isAvailablePassword = useAppSelector(state => !!state.getUserAccountInfo.data?.isPasswordCreated);

  const [visibleModal, setVisibleModal] = React.useState(false);

  const ModalUnlink = useRef<FunctionComponent<ModalUnlinkType>>();

  const onUnLink = useCallback(() => {
    if (!isAvailablePassword) {
      dispatch(AuthenticationActions.showModalRequestPassword());

      return;
    }
    if (ModalUnlink) {
      ModalUnlink.current = require('components/ModalInputPassword/index.tsx').default;
    }
    setVisibleModal(true);
  }, [isAvailablePassword]);

  const onConfirmUnlink = useCallback(() => {
    props.onUnlink(props.socialType);
    setVisibleModal(false);
  }, []);

  const onCloseModal = useCallback(() => {
    setVisibleModal(false);
    ModalUnlink.current = undefined;
  }, []);

  return (
    <>
      <TouchableScale style={styles.container} onPress={dataSocialLink.isLinked ? onUnLink : props.onLink}>
        <View style={styles.nameContainer}>
          {props.icon}
          <PaaveText type={TEXT_TYPE.REGULAR_14} color={dynamicColors.LIGHTTextBigTitle} style={styles.name}>
            {props.name}
          </PaaveText>
        </View>
        {dataSocialLink.isLoading ? (
          <ActivityIndicator size={scaleSize(14)} color={dynamicColors.LIGHTTextDisable} />
        ) : dataSocialLink.isLinked ? (
          <IconWithBackground
            name={'check'}
            backgroundColor={dynamicColors.BlueNewColor}
            iconColor={dynamicColors.WHITE}
            size={20}
            containerStyle={styles.containerIcon}
          />
        ) : (
          <Icon name={'add'} size={20} color={dynamicColors.LIGHTTextDisable} />
        )}
      </TouchableScale>
      {ModalUnlink.current && (
        <ModalUnlink.current isVisible={visibleModal} onCloseModal={onCloseModal} onConfirm={onConfirmUnlink} />
      )}
    </>
  );
};

const useStyles = getStylesHook({
  container: {
    flex: 1,
    marginHorizontal: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: lightColors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: lightColors.WHITE,
    borderRadius: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  name: {
    marginLeft: 4,
  },
  containerIcon: {
    borderRadius: 8,
  },
});

export default withMemo(LinkSocial);
