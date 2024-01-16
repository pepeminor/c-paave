import React, { MutableRefObject, useCallback, useState } from 'react';
import withMemo from 'HOC/withMemo';
import { IconName, IconWithBackground } from 'components/Icon';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import TouchableScale from 'components/TouchableScale';
import { getStylesHook } from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import { isNilOrEmpty } from 'ramda-adjunct';

interface IProps {
  item?: {
    event: string;
    name: string;
    icon: IconName;
  };
  listFunctionSelectedRef: MutableRefObject<string[]>;
}

const ItemFunction = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();

  const [selected, setSelected] = useState(false);
  const { t } = useTranslation();
  const { item } = props;

  const onPress = useCallback(() => {
    setSelected(prev => {
      if (!prev) {
        props.listFunctionSelectedRef.current.push(item?.event!);
      } else {
        props.listFunctionSelectedRef.current = props.listFunctionSelectedRef.current.filter(
          data => item?.event !== data
        );
      }

      return !prev;
    });
  }, [item?.event]);

  return (
    <TouchableScale
      style={styles.container}
      onPress={onPress}
      disabled={isNilOrEmpty(item)}
      isPreventDoubleClick={false}
    >
      {item?.icon && (
        <IconWithBackground
          size={24}
          name={item?.icon}
          containerStyle={styles.containerIcon}
          iconColor={selected ? dynamicColors.WHITE : dynamicColors.BlueNewColor}
          backgroundColor={selected ? dynamicColors.BlueNewColor : dynamicColors.LIGHTBGTab}
        />
      )}
      {item?.name && (
        <PaaveText type={TEXT_TYPE.BOLD_12} color={dynamicColors.BlueNewColor}>
          {t(item?.name)}
        </PaaveText>
      )}
    </TouchableScale>
  );
};

const useStyles = getStylesHook({
  container: {
    flex: 1,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerIcon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginBottom: 8,
  },
});

export default withMemo(ItemFunction);
