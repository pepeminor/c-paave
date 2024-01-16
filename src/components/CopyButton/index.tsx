import React, { memo, useCallback } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Copy from 'assets/icon/Copy.svg';
import { alertMessage } from 'utils';
import Clipboard from '@react-native-community/clipboard';
import { useTranslation } from 'react-i18next';

export interface IProps extends TouchableOpacityProps {
  content: string;
}

const CopyButton = (props: IProps) => {
  const { content, ...rest } = props;
  const { t } = useTranslation();

  const onPress = useCallback(() => {
    alertMessage('success', t('Copy success'));
    Clipboard.setString(content);
  }, [content]);

  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <Copy />
    </TouchableOpacity>
  );
};

export default memo(CopyButton);
