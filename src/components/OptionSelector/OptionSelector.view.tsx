import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { useOptionSelectorLogic } from './OptionSelector.logic';
import useStyles from './OptionSelector.style';
import { IProps, SelectorData } from './OptionSelector.type';
import withMemo from 'HOC/withMemo';
import { useTranslation } from 'react-i18next';
import ArrowDown2 from 'assets/icon/ArrowDown2.svg';
import BottomModal from 'components/BottomModal';
import ModalContent from './ModalContent';

const OptionSelector = <T extends SelectorData>(props: IProps<T>) => {
  const { value, setValue, listValue, modalTitle, disabled, style: containerStyle, textStyles, ...viewProps } = props;
  // eslint-disable-next-line no-empty-pattern
  const {} = useOptionSelectorLogic(props);
  const { t } = useTranslation();
  const { styles } = useStyles();

  const [modal, openModal] = BottomModal({
    ModalContent: ModalContent,
    modalContentProps: {
      value: value,
      setValue: setValue,
      listValue: listValue,
      modalTitle: modalTitle,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={openModal} disabled={disabled}>
      <View style={[styles.container, containerStyle]} {...viewProps}>
        <Text allowFontScaling={false} style={[styles.shownText, textStyles]}>
          {t(listValue[value])}
        </Text>
        <ArrowDown2 />
        {modal}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default withMemo(OptionSelector);
