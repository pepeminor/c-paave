import { TouchableOpacity } from 'react-native';
import React, { forwardRef, memo, useImperativeHandle } from 'react';
import { useStyles } from './styles';
import PaaveText from 'components/PaaveText';
import { useTranslation } from 'react-i18next';
import { TEXT_TYPE } from 'components/PaaveText/type';

export type PostBtn = {
  onChangeText: (text: string) => void;
};

type Props = {
  defaultValue?: string;
  onPress: () => void;
};

export const PostBtn = memo(
  forwardRef<PostBtn, Props>(({ onPress, defaultValue = '' }, ref) => {
    const { styles, dynamicColors } = useStyles();
    const { t } = useTranslation();
    const [value, onChangeText] = React.useState(defaultValue);
    const isDisable = value === defaultValue;

    useImperativeHandle(ref, () => ({
      onChangeText,
    }));

    return (
      <TouchableOpacity style={styles.actionBtn} onPress={onPress} disabled={isDisable}>
        <PaaveText
          type={isDisable ? TEXT_TYPE.REGULAR_14 : TEXT_TYPE.BOLD_14}
          color={isDisable ? dynamicColors.LIGHTTextDisable : dynamicColors.MainBlue}
        >
          {t('Post')}
        </PaaveText>
      </TouchableOpacity>
    );
  })
);
