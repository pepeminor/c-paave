import React, { memo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles from 'styles';
import useStyles from './styles';
import Edit from 'assets/icon/EditUserIntro.svg';

export type EditModalProps = {
  initValue: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

type ButtonWithEditModalProps = {
  initValue: string;
  EditModal: React.FC<EditModalProps>;
};

const ButtonWithEditModal: React.FC<ButtonWithEditModalProps> = ({ EditModal, initValue }) => {
  const [visible, setVisible] = useState(false);

  const { styles } = useStyles();

  const onOpenModal = () => {
    setVisible(true);
  };

  return (
    <>
      <TouchableOpacity onPress={onOpenModal} style={[globalStyles.flexDirectionRow]}>
        <View style={[styles.textInfo]}>
          <Text allowFontScaling={false} style={[styles.valueAccount]}>
            {initValue}
          </Text>
        </View>
        <View style={[styles.editContainerAccount, globalStyles.justifyCenter]}>
          <Edit style={styles.editIcon} />
        </View>
      </TouchableOpacity>
      <EditModal initValue={initValue} visible={visible} setVisible={setVisible} />
    </>
  );
};

export default memo(ButtonWithEditModal);
