import React from 'react';

import { StyleProp, ViewStyle } from 'react-native';

import useToggle from '../useToggle';
import ModalOrder from 'components/ModalOrder';
import { useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { ReducerStatus } from 'interfaces/reducer';

export interface TPropsModalOrder {
  title: string;
  confirmText: string;
  ListContentModal?: Element;
  isVisible?: boolean;
  disabledExecuteButton?: boolean;
  isDisableWholeForm?: boolean;
  notHideFormWhenConfirm?: boolean;

  backgroundStyle?: StyleProp<ViewStyle>;

  onValidate?: () => boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

const modalComponent = ({
  value,
  onConfirm,
  backgroundStyle,
  onCancel,
  title,
  confirmText,
  ListContentModal,
  disabledExecuteButton,
}: any) => (
  <ModalOrder
    isVisible={value}
    onConfirm={onConfirm}
    onCancel={onCancel}
    title={title}
    backgroundStyle={backgroundStyle}
    confirmText={confirmText}
    ListContentModal={ListContentModal}
    disabledExecuteButton={disabledExecuteButton}
    keyboardHeight={0}
  />
);

export default function useModalOrder({
  onConfirm,
  onCancel,
  onValidate = () => true,
  confirmText,
  title,
  backgroundStyle,
  ListContentModal,
  disabledExecuteButton,
  isDisableWholeForm,
  notHideFormWhenConfirm,
}: TPropsModalOrder): [
  ModalComponent: JSX.Element,
  onSetModalVisible: (isModalVisible?: boolean) => void,
  value: boolean
] {
  const generateKisCardFailedTrigger = useSelector((state: IState) => state.generateKisCardFailedTrigger);
  const onModalOTPKIS = useSelector((state: IState) => state.onModalOTPKIS);
  const kisCheckOTP = useSelector((state: IState) => state.kisCheckOTP);
  const [value, toggleValue] = useToggle(false);

  useUpdateEffect(() => {
    handleCancel();
  }, [generateKisCardFailedTrigger, onModalOTPKIS]);

  useUpdateEffect(() => {
    if (kisCheckOTP.status === ReducerStatus.SUCCESS) {
      onSetModalVisible(false);
    }
  }, [kisCheckOTP]);

  const onSetModalVisible = (isModalVisible?: boolean) => {
    const isBool = typeof isModalVisible === 'boolean' ? isModalVisible : !value;

    toggleValue(isBool);
  };

  const handleConfirm = () => {
    if (onValidate()) {
      onConfirm();
      if (notHideFormWhenConfirm !== true) {
        onSetModalVisible();
      }
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onSetModalVisible(false);
  };

  const ModalComponent = modalComponent({
    value,
    title,
    confirmText,
    backgroundStyle,
    ListContentModal,
    onCancel: handleCancel,
    onConfirm: handleConfirm,
    disabledExecuteButton,
    isDisableWholeForm,
  });

  return [ModalComponent, onSetModalVisible, value];
}
