import { useAppSelector } from 'hooks';
import React, { memo, PropsWithChildren, useEffect } from 'react';
import { Modal, ModalProps } from 'react-native';

type ModalAnimationType = 'fade' | 'none' | 'slide' | undefined;
interface TPropsModalCustom extends ModalProps {
  visible: boolean;
  animationType?: ModalAnimationType;
  onRequestClose?: () => void;
  childrenContent?: React.ComponentType<any> | React.ReactElement | null;
}

const ModalCustom = ({
  visible,
  animationType,
  onRequestClose,
  childrenContent,
  children,
  ...props
}: TPropsModalCustom) => {
  const isShowModalDisconnectNetwork = useAppSelector(state => state.showModalDisconnectNetwork);

  useEffect(() => {
    isShowModalDisconnectNetwork && visible && onRequestClose?.();
  }, [isShowModalDisconnectNetwork]);

  if (!(visible && !isShowModalDisconnectNetwork)) return null;

  return (
    <Modal
      animationType={animationType ?? 'fade'}
      transparent={true}
      visible={visible && !isShowModalDisconnectNetwork}
      onRequestClose={onRequestClose}
      {...props}
    >
      {childrenContent}
      {children}
    </Modal>
  );
};

const ModalWrapper: React.FC<PropsWithChildren<TPropsModalCustom>> = memo(props => {
  if (!props.visible) return null;
  return <ModalCustom {...props} />;
});

export default memo(ModalWrapper);
