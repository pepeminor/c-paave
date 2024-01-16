import React, { memo, useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import QuestionIcon from 'assets/icon/WhiteQuestionIcon.svg';
import CopyTradeModal from './CopyTradeModal';
import { useAppSelector } from 'hooks';
import { useDispatch } from 'react-redux';
import { CopyTradeAction } from 'reduxs/CopyTrade';
import { FollowingType } from 'screens/CopyTradeScreen/CopyTradeScreen.type';
import ModalBottom from 'components/ModalBottom';

type Props = {
  followingType: FollowingType;
};

const CopyTradeHelper = ({ followingType }: Props) => {
  const dispatch = useDispatch();

  const modalFirstOpen = useAppSelector(state => state.copyTrade.modalFirstOpen);
  const [visible, setVisible] = useState(false);

  const handleModal = useCallback(() => {
    setVisible(pre => !pre);
  }, []);

  useEffect(() => {
    if (!modalFirstOpen) {
      handleModal();
      dispatch(CopyTradeAction.setModalFirstOpen());
    }
  }, []);

  return (
    <TouchableOpacity onPress={handleModal}>
      <QuestionIcon />
      <ModalBottom visible={visible} setVisible={setVisible}>
        <CopyTradeModal closeModal={handleModal} followingType={followingType} />
      </ModalBottom>
    </TouchableOpacity>
  );
};

export default memo(CopyTradeHelper);
